export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-ingest-key, x-cron-secret',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}

export async function authenticatedUser(request: Request) {
  const authorization = request.headers.get('Authorization');
  const url = Deno.env.get('SUPABASE_URL');
  const anon = Deno.env.get('SUPABASE_ANON_KEY');
  if (!authorization || !url || !anon) return null;
  const response = await fetch(`${url}/auth/v1/user`, { headers: { apikey: anon, Authorization: authorization } });
  if (!response.ok) return null;
  return await response.json();
}

export function serviceHeaders() {
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!serviceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured.');
  return { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, 'Content-Type': 'application/json' };
}

export async function isMember(userId: string, plantId: string) {
  const url = Deno.env.get('SUPABASE_URL');
  const response = await fetch(`${url}/rest/v1/plant_members?select=user_id&user_id=eq.${encodeURIComponent(userId)}&plant_id=eq.${encodeURIComponent(plantId)}`, { headers: serviceHeaders() });
  return response.ok && (await response.json()).length > 0;
}
