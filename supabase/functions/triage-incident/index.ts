import { authenticatedUser, corsHeaders, isMember, json, serviceHeaders } from '../_shared/http.ts';

const validPriority = new Set(['Critical', 'High', 'Medium', 'Low']);

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return json({ error: 'POST required.' }, 405);
  try {
    const user = await authenticatedUser(request);
    if (!user?.id) return json({ error: 'Sign in is required.' }, 401);
    const body = await request.json();
    const title = String(body.title || '').trim().slice(0, 180);
    const description = String(body.description || '').trim().slice(0, 5000);
    const assetId = String(body.assetId || '').trim().slice(0, 100);
    const plantId = String(body.plantId || '');
    if (!title || !description || !assetId || !plantId) return json({ error: 'title, description, assetId, and plantId are required.' }, 400);
    if (!await isMember(user.id, plantId)) return json({ error: 'You do not have access to this plant.' }, 403);

    const assetResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/rest/v1/assets?select=id,name,type,location,thresholds&plant_id=eq.${encodeURIComponent(plantId)}&id=eq.${encodeURIComponent(assetId)}`, { headers: serviceHeaders() });
    const assets = assetResponse.ok ? await assetResponse.json() : [];
    const asset = assets[0] || null;
    const text = `${title} ${description}`.toLowerCase();
    const safety = /guard|interlock|smoke|fire|injur|unsafe|emergency|overheat|overheated/.test(text);
    const severe = /grinding|bearing|spindle|trip|failure|leak|leaking|stopped|shutdown/.test(text);
    const requested = validPriority.has(body.requestedPriority) ? body.requestedPriority : null;
    const priority = safety ? 'Critical' : requested || (severe ? 'High' : 'Medium');
    const department = String(body.department || '').trim() || (safety ? 'Safety' : /pressure|hydraulic|valve/.test(text) ? 'Hydraulics' : /wire|motor|electrical|switch/.test(text) ? 'Electrical' : /coolant|fluid|utility/.test(text) ? 'Utilities' : asset?.type === 'Machining' ? 'Mechanical' : 'Mechanical');
    const recommendation = safety
      ? 'Keep the equipment in a safe state. Do not bypass safety devices; notify the supervisor and inspect the interlock before restart.'
      : /temperature|hot|overheat/.test(text)
        ? 'Reduce load or stop the equipment if the temperature continues to rise. Inspect lubrication, cooling flow, and the related bearing before restart.'
        : /vibration|grinding|bearing|noise/.test(text)
          ? 'Inspect the bearing and mounting, compare vibration with the normal baseline, and verify the machine is safe before returning it to service.'
          : /pressure|hydraulic|leak/.test(text)
            ? 'Check pressure readings, accumulator charge, and the valve block for leakage. Isolate the equipment before maintenance.'
            : 'Inspect the affected equipment and follow the approved plant procedure. Confirm the operating condition before returning it to service.';
    const evidence = `Worker report analyzed with plant triage rules${asset ? ` · linked asset ${asset.name} (${asset.id})` : ` · asset ${assetId} not found in the asset register`}`;
    return json({ priority, department, confidence: safety || severe ? '86%' : '72%', recommendation, evidence, signals: ['Natural language', 'Worker report', ...(asset ? ['Asset register'] : [])], triageMode: 'rules' });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Triage failed.' }, 500);
  }
});
