(() => {
  'use strict';

  const config = window.INDUSTRYOPS_SUPABASE || {};
  const storageKey = 'industryops-supabase-session';
  const configured = Boolean(config.url && config.anonKey && !/YOUR_PROJECT|YOUR_SUPABASE/.test(`${config.url} ${config.anonKey}`));
  const baseUrl = String(config.url || '').replace(/\/$/, '');
  let session = null;
  try { session = JSON.parse(localStorage.getItem(storageKey) || 'null'); } catch (_) {}

  const camel = value => value.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
  const snake = value => value.replace(/[A-Z]/g, c => `_${c.toLowerCase()}`);
  const convert = (value, keyFn) => Array.isArray(value) ? value.map(item => convert(item, keyFn)) : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([key, item]) => [keyFn(key), convert(item, keyFn)])) : value;
  const toCamel = value => convert(value, camel);
  const toSnake = value => convert(value, snake);
  const saveSession = value => { session = value; try { if (value) localStorage.setItem(storageKey, JSON.stringify(value)); else localStorage.removeItem(storageKey); } catch (_) {} };

  async function raw(path, options = {}, bearer = session?.access_token) {
    const headers = { apikey: config.anonKey, 'Content-Type': 'application/json', ...(options.headers || {}) };
    if (bearer) headers.Authorization = `Bearer ${bearer}`;
    const response = await fetch(`${baseUrl}${path}`, { ...options, headers });
    const body = await response.text();
    let data = null;
    try { data = body ? JSON.parse(body) : null; } catch (_) { data = body; }
    if (!response.ok) throw new Error(data?.message || data?.msg || data?.error_description || data?.error || `Supabase request failed (${response.status}).`);
    return data;
  }

  async function refreshSession() {
    if (!session?.refresh_token) return null;
    try {
      const next = await raw('/auth/v1/token?grant_type=refresh_token', { method: 'POST', body: JSON.stringify({ refresh_token: session.refresh_token }) }, null);
      saveSession(next); return next;
    } catch (_) { saveSession(null); return null; }
  }

  async function getSession() {
    if (session?.expires_at && session.expires_at < Math.floor(Date.now() / 1000) + 60) await refreshSession();
    return session;
  }

  async function auth(path, payload) {
    const result = await raw(path, { method: 'POST', body: JSON.stringify(payload) }, null);
    if (result?.access_token) {
      result.expires_at = Math.floor(Date.now() / 1000) + Number(result.expires_in || 3600);
      saveSession(result);
    }
    return result;
  }

  async function table(name, query = 'select=*') {
    await getSession();
    return toCamel(await raw(`/rest/v1/${name}?${query}&plant_id=eq.${encodeURIComponent(config.plantId)}`));
  }

  async function insert(name, row) {
    await getSession();
    const { time, ...persistable } = row;
    const rows = await raw(`/rest/v1/${name}`, { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify(toSnake({ ...persistable, plantId: config.plantId })) });
    return toCamel(Array.isArray(rows) ? rows[0] : rows);
  }

  async function update(name, id, patch) {
    await getSession();
    const rows = await raw(`/rest/v1/${name}?id=eq.${encodeURIComponent(id)}&plant_id=eq.${encodeURIComponent(config.plantId)}`, { method: 'PATCH', headers: { Prefer: 'return=representation' }, body: JSON.stringify(toSnake(patch)) });
    if (!Array.isArray(rows) || !rows.length) throw new Error('No writable record was found. Check your plant membership and role.');
    return toCamel(rows[0]);
  }

  async function invoke(name, payload) {
    await getSession();
    return raw(`/functions/v1/${name}`, { method: 'POST', body: JSON.stringify({ ...payload, plantId: payload.plantId || config.plantId }) });
  }

  async function loadOperations() {
    const [incidents, workorders, assets, docs, members] = await Promise.all([
      table('incidents', 'select=*&order=created_at.desc'),
      table('work_orders', 'select=*&order=created_at.desc'),
      table('assets', 'select=*&order=created_at.asc'),
      table('knowledge_documents', 'select=*&order=updated_at.desc'),
      table('plant_members', 'select=user_id,display_name,role&order=display_name.asc'),
    ]);
    return {
      incidents: incidents.map(row => ({ ...row, time: row.createdAt ? new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(-Math.max(0, Math.round((Date.now() - new Date(row.createdAt).getTime()) / 60000)), 'minute') : row.time || 'Just now' })),
      workorders: workorders.map(row => ({ ...row, initials: row.initials || (row.assignee && row.assignee !== 'Unassigned' ? row.assignee.split(/[ .]/).filter(Boolean).map(x => x[0]).join('').slice(0, 2).toUpperCase() : '—') })),
      assets,
      docs: docs.map(row => ({ ...row, updated: row.updatedLabel || '', pages: row.pages || '—' })),
      members,
    };
  }

  window.IndustryOpsBackend = {
    configured,
    get plantId() { return config.plantId; },
    getSession,
    signIn: (email, password) => auth('/auth/v1/token?grant_type=password', { email, password }),
    signOut: async () => { try { if (session?.access_token) await raw('/auth/v1/logout', { method: 'POST' }); } finally { saveSession(null); } },
    updateAccount: async changes => { await getSession(); return raw('/auth/v1/user', { method: 'PUT', body: JSON.stringify(changes) }); },
    loadOperations,
    triage: report => invoke('triage-incident', report),
    insertIncident: row => insert('incidents', row),
    insertWorkorder: row => insert('work_orders', row),
    updateIncident: (id, patch) => update('incidents', id, patch),
    updateWorkorder: (id, patch) => update('work_orders', id, patch),
    updatePolicy: (id, patch) => update('escalation_policies', id, patch),
    processEscalations: () => invoke('process-escalations', {}),
    loadNotifications: () => table('notifications', 'select=*&order=created_at.desc&limit=5'),
    request: raw,
  };
})();
