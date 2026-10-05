import { authenticatedUser, corsHeaders, isMember, json, serviceHeaders } from '../_shared/http.ts';

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return json({ error: 'POST required.' }, 405);
  try {
    const cronSecret = Deno.env.get('CRON_SECRET');
    const scheduledCall = Boolean(cronSecret && request.headers.get('x-cron-secret') === cronSecret);
    const user = scheduledCall ? null : await authenticatedUser(request);
    if (!scheduledCall && !user?.id) return json({ error: 'Sign in or a valid scheduler secret is required.' }, 401);
    const { plantId } = await request.json();
    if (!plantId || (!scheduledCall && !await isMember(user!.id, plantId))) return json({ error: 'You do not have access to this plant.' }, 403);
    const headers = serviceHeaders();
    const url = Deno.env.get('SUPABASE_URL')!;
    const [policyResponse, incidentResponse] = await Promise.all([
      fetch(`${url}/rest/v1/escalation_policies?select=*&plant_id=eq.${encodeURIComponent(plantId)}&enabled=eq.true`, { headers }),
      fetch(`${url}/rest/v1/incidents?select=*&plant_id=eq.${encodeURIComponent(plantId)}&status=neq.Resolved`, { headers }),
    ]);
    if (!policyResponse.ok || !incidentResponse.ok) return json({ error: 'Unable to read escalation policies or incidents.' }, 502);
    const policies = await policyResponse.json();
    const incidents = await incidentResponse.json();
    const escalated = [];
    for (const incident of incidents) {
      const policy = policies.find((item: any) => item.priority === incident.priority);
      if (!policy || (Date.now() - new Date(incident.created_at).getTime()) / 60000 < policy.after_minutes) continue;
      const event = { plant_id: plantId, incident_id: incident.id, policy_id: policy.id, priority: incident.priority, notified_role: policy.notify_role, channel: policy.channel };
      const response = await fetch(`${url}/rest/v1/escalation_events`, { method: 'POST', headers: { ...headers, Prefer: 'return=representation,resolution=ignore-duplicates' }, body: JSON.stringify(event) });
      if (response.status === 409) continue;
      if (!response.ok) continue;
      const created = await response.json();
      if (!created.length) continue;
      await fetch(`${url}/rest/v1/notifications`, { method: 'POST', headers: { ...headers, Prefer: 'return=minimal' }, body: JSON.stringify({ plant_id: plantId, title: `${incident.priority} incident escalated`, body: `${incident.id} · ${incident.title} · notify ${policy.notify_role}`, kind: 'escalation', incident_id: incident.id }) });
      escalated.push(incident.id);
    }
    return json({ processed: incidents.length, escalated });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Escalation processing failed.' }, 500);
  }
});
