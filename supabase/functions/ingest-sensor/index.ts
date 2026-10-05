import { corsHeaders, json, serviceHeaders } from '../_shared/http.ts';

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return json({ error: 'POST required.' }, 405);
  const ingestionKey = Deno.env.get('INGESTION_API_KEY');
  if (!ingestionKey || request.headers.get('x-ingest-key') !== ingestionKey) return json({ error: 'Invalid ingestion key.' }, 401);
  try {
    const body = await request.json();
    const plantId = String(body.plantId || '');
    const assetId = String(body.assetId || '').trim();
    const metric = String(body.metric || '').trim().toLowerCase();
    const value = Number(body.value);
    if (!plantId || !assetId || !metric || !Number.isFinite(value)) return json({ error: 'plantId, assetId, metric, and numeric value are required.' }, 400);
    const headers = serviceHeaders();
    const url = Deno.env.get('SUPABASE_URL')!;
    const filter = `plant_id=eq.${encodeURIComponent(plantId)}&id=eq.${encodeURIComponent(assetId)}`;
    const assetResponse = await fetch(`${url}/rest/v1/assets?select=id,name,type,location,thresholds&${filter}`, { headers });
    if (!assetResponse.ok) return json({ error: 'Unable to read asset register.' }, 502);
    const asset = (await assetResponse.json())[0];
    if (!asset) return json({ error: 'Asset not found for this plant.' }, 404);
    const observedAt = body.observedAt || new Date().toISOString();
    const reading = { plant_id: plantId, asset_id: assetId, metric, value, unit: String(body.unit || '').slice(0, 24), observed_at: observedAt, metadata: body.metadata || {} };
    const saveReading = await fetch(`${url}/rest/v1/sensor_readings`, { method: 'POST', headers: { ...headers, Prefer: 'return=representation' }, body: JSON.stringify(reading) });
    if (!saveReading.ok) return json({ error: await saveReading.text() }, 502);
    const limits = asset.thresholds || {};
    const normalized = metric.replace(/[^a-z]/g, '');
    const max = Number(limits[`${normalized}_max`]);
    const min = Number(limits[`${normalized}_min`]);
    const breached = body.anomaly === true || (Number.isFinite(max) && max > 0 && value > max) || (Number.isFinite(min) && value < min);
    const assetPatch: Record<string, string> = {};
    if (/^temperature|^temp/.test(normalized)) assetPatch.temp = `${value}${reading.unit}`;
    if (/vibration/.test(normalized)) assetPatch.vibration = `${value}${reading.unit}`;
    let incident = null;
    if (breached) assetPatch.tag = /guard|safety|temperature/.test(normalized) ? 'Critical' : 'Watch';
    if (Object.keys(assetPatch).length) await fetch(`${url}/rest/v1/assets?${filter}`, { method: 'PATCH', headers, body: JSON.stringify(assetPatch) });
    if (breached) {
      const duplicateResponse = await fetch(`${url}/rest/v1/incidents?select=id,priority&plant_id=eq.${encodeURIComponent(plantId)}&asset_id=eq.${encodeURIComponent(assetId)}&status=neq.Resolved&source=eq.Sensor%20anomaly`, { headers });
      const duplicates = duplicateResponse.ok ? await duplicateResponse.json() : [];
      if (duplicates.length) return json({ accepted: true, breached: true, duplicate: true, incident: duplicates[0] });
      const priority = /guard|safety|temperature/.test(normalized) ? 'Critical' : 'High';
      const id = `INC-${Date.now()}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
      incident = { plant_id: plantId, id, title: `${metric} anomaly on ${asset.name}`, asset: `${asset.name} · ${assetId}`, asset_id: assetId, location: asset.location, priority, status: 'Open', department: /pressure/.test(normalized) ? 'Hydraulics' : 'Mechanical', assignee: 'Unassigned', initials: '—', reporter: 'Sensor gateway', source: 'Sensor anomaly', description: `Sensor reported ${value}${reading.unit ? ` ${reading.unit}` : ''} for ${metric}${Number.isFinite(max) && max > 0 ? `; configured maximum is ${max}` : ''}.`, confidence: '90%', recommendation: 'Verify the sensor reading and inspect the asset against the plant maintenance procedure. Stop the asset if the reading indicates an unsafe condition.', evidence: `Sensor reading ${value} ${reading.unit} · threshold breach`, signals: ['Industrial sensor', 'Threshold rule'] };
      const savedIncident = await fetch(`${url}/rest/v1/incidents`, { method: 'POST', headers: { ...headers, Prefer: 'return=representation' }, body: JSON.stringify(incident) });
      if (!savedIncident.ok) return json({ error: 'Reading saved, but incident creation failed.', detail: await savedIncident.text() }, 502);
      incident = (await savedIncident.json())[0];
      await fetch(`${url}/rest/v1/notifications`, { method: 'POST', headers: { ...headers, Prefer: 'return=minimal' }, body: JSON.stringify({ plant_id: plantId, title: `${priority} sensor anomaly`, body: `${asset.name} (${assetId}): ${metric} = ${value} ${reading.unit}`, kind: priority.toLowerCase(), incident_id: id }) });
    }
    return json({ accepted: true, breached, incident });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Sensor ingestion failed.' }, 500);
  }
});
