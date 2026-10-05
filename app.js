(() => {
  'use strict';

  const icons = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    alert: '<path d="M10.3 3.9 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/>',
    wrench: '<path d="M14.7 6.3a5.1 5.1 0 0 0-6.8 6.8L3 18l3 3 4.9-4.9a5.1 5.1 0 0 0 6.8-6.8L14 13l-3-3 3.7-3.7Z"/>',
    machine: '<path d="M3 21h18M5 21V8l6 3V8l6 3V4h3v17M8 15h1m4 0h1m4 0h1"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 5.5v16M8 7h8m-8 4h8"/>',
    chart: '<path d="M4 19V5m0 14h17M8 16v-5m5 5V7m5 9V9"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1a1.7 1.7 0 0 1-2.4 2.4l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a1.7 1.7 0 0 1-3.4 0v-.2a1.7 1.7 0 0 0-2.9-1.2l-.1.1a1.7 1.7 0 0 1-2.4-2.4l.1-.1a1.7 1.7 0 0 0-1.2-2.9H4a1.7 1.7 0 0 1 0-3.4h.2a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a1.7 1.7 0 0 1 2.4-2.4l.1.1a1.7 1.7 0 0 0 2.9-1.2V2a1.7 1.7 0 0 1 3.4 0v.2a1.7 1.7 0 0 0 2.9 1.2l.1-.1a1.7 1.7 0 0 1 2.4 2.4l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.2a1.7 1.7 0 0 1 0 3.4h-.2a1.7 1.7 0 0 0-1.2 2.9Z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 13h4"/>',
    plus: '<path d="M12 5v14m-7-7h14"/>',
    filter: '<path d="M4 7h16M7 12h10m-7 5h4"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    pulse: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    bolt: '<path d="m13 2-3 9h7l-6 11 2-9H6z"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5 5 5-5m-5 5V3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m12-7-5-5-5 5m5-5v12"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    spark: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm7 11 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6m-11 5h6m-6 4h6"/>',
    pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
  };
  const svg = (name, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.spark}</svg>`;
  const nav = [
    ['overview', 'Overview', 'grid'], ['incidents', 'Incidents', 'alert', '3'], ['workorders', 'Work orders', 'wrench'],
    ['assets', 'Assets', 'machine'], ['knowledge', 'Knowledge base', 'book'], ['analytics', 'Analytics', 'chart'],
    ['escalations', 'Escalations', 'clock'], ['settings', 'Settings', 'gear'],
  ];
  const seedIncidents = [
    { id: 'INC-2841', title: 'Grinding noise on spindle assembly', asset: 'CNC Mill · M-204', location: 'Line 2 · Cell B', priority: 'Critical', status: 'Open', department: 'Mechanical', assignee: 'Unassigned', initials: '—', sla: '00:18', time: '4 min ago', reporter: 'Arjun Mehta', source: 'Worker report', description: 'Machine M-204 is making a grinding noise and the spindle housing temperature has increased to 86°C. The vibration is getting worse during high-speed operation.', confidence: '94%', recommendation: 'Stop spindle operation and inspect the front bearing assembly. Compare vibration spectrum against the M-204 baseline before restart.', evidence: 'Temperature +21°C vs. normal · vibration RMS 8.4 mm/s', signals: ['Temperature', 'Vibration', 'Natural language'] },
    { id: 'INC-2839', title: 'Hydraulic pressure fluctuation', asset: 'Hydraulic Press · P-018', location: 'Press Shop · Bay 4', priority: 'High', status: 'In progress', department: 'Hydraulics', assignee: 'R. Singh', initials: 'RS', sla: '01:42', time: '22 min ago', reporter: 'Sensor alert', source: 'Sensor anomaly', description: 'Pressure has oscillated outside the normal 172–188 bar operating band in 6 of the last 10 cycles.', confidence: '89%', recommendation: 'Inspect accumulator pre-charge and valve block for internal leakage. Verify pressure transducer calibration.', evidence: 'Pressure variance 13.2 bar · 6 consecutive excursions', signals: ['Pressure sensor', 'Historical logs'] },
    { id: 'INC-2837', title: 'Conveyor belt tracking off-center', asset: 'Assembly Conveyor · C-07', location: 'Assembly · Line 1', priority: 'Medium', status: 'Open', department: 'Mechanical', assignee: 'S. Kumar', initials: 'SK', sla: '03:10', time: '48 min ago', reporter: 'Priya Nair', source: 'Worker report', description: 'The belt has shifted roughly 12 mm toward the north rail over the last hour. No product has fallen from the line.', confidence: '82%', recommendation: 'Check take-up tension on both sides and inspect the return idler alignment before the next shift.', evidence: 'Edge sensor offset 12 mm · trend increasing', signals: ['Edge sensor', 'Worker report'] },
    { id: 'INC-2835', title: 'Coolant concentration below limit', asset: 'CNC Lathe · L-112', location: 'Line 2 · Cell A', priority: 'Medium', status: 'In progress', department: 'Utilities', assignee: 'M. Patel', initials: 'MP', sla: '04:26', time: '1 hr ago', reporter: 'Sensor alert', source: 'Sensor anomaly', description: 'Refractometer reading dropped to 4.1%, below the 5.0% minimum for this process.', confidence: '91%', recommendation: 'Verify refractometer calibration, then top up the sump to 6.5% and check for tramp oil.', evidence: 'Concentration 4.1% · specification 5.0–8.0%', signals: ['Coolant sensor', 'Process specification'] },
    { id: 'INC-2832', title: 'Safety guard switch intermittent', asset: 'Packaging Robot · R-031', location: 'Packaging · Line 3', priority: 'High', status: 'Open', department: 'Electrical', assignee: 'Unassigned', initials: '—', sla: '00:52', time: '2 hr ago', reporter: 'L. Chen', source: 'Worker report', description: 'Guard interlock has opened twice during normal operation. Operator reports no visible obstruction or damage.', confidence: '88%', recommendation: 'Keep cell in safe stop. Inspect switch alignment and cable strain relief; do not bypass the interlock.', evidence: 'Two interlock events in 14 minutes', signals: ['Safety event log', 'Worker report'] },
    { id: 'INC-2828', title: 'Elevated bearing temperature', asset: 'Air Compressor · AC-02', location: 'Utilities · Compressor Room', priority: 'Low', status: 'Resolved', department: 'Mechanical', assignee: 'A. Das', initials: 'AD', sla: 'Met', time: '3 hr ago', reporter: 'Sensor alert', source: 'Sensor anomaly', description: 'Bearing temperature briefly exceeded its warning threshold during a load transition.', confidence: '77%', recommendation: 'Monitor the next two operating shifts. No immediate maintenance action is required.', evidence: 'Peak 74°C · returned to 63°C within 90 seconds', signals: ['Temperature sensor'] },
  ];
  const seedAssets = [
    { id: 'M-204', name: 'CNC Mill', type: 'Machining', location: 'Line 2 · Cell B', health: 62, temp: '86°C', vibration: '8.4 mm/s', runtime: '94.2%', tag: 'Critical', notes: 'Spindle bearing temperature and vibration above operating baseline.' },
    { id: 'P-018', name: 'Hydraulic Press', type: 'Forming', location: 'Press Shop · Bay 4', health: 78, temp: '68°C', vibration: '2.1 mm/s', runtime: '97.8%', tag: 'Watch', notes: 'Pressure oscillation requires accumulator inspection.' },
    { id: 'C-07', name: 'Assembly Conveyor', type: 'Material handling', location: 'Assembly · Line 1', health: 84, temp: '41°C', vibration: '1.8 mm/s', runtime: '99.1%', tag: 'Healthy', notes: 'Belt tracking offset trending upward.' },
    { id: 'L-112', name: 'CNC Lathe', type: 'Machining', location: 'Line 2 · Cell A', health: 88, temp: '59°C', vibration: '1.2 mm/s', runtime: '96.5%', tag: 'Healthy', notes: 'Coolant concentration below process specification.' },
    { id: 'R-031', name: 'Packaging Robot', type: 'Robotics', location: 'Packaging · Line 3', health: 73, temp: '52°C', vibration: '1.4 mm/s', runtime: '92.7%', tag: 'Watch', notes: 'Intermittent guard interlock event.' },
    { id: 'AC-02', name: 'Air Compressor', type: 'Utilities', location: 'Utilities · Room 1', health: 91, temp: '63°C', vibration: '0.8 mm/s', runtime: '99.7%', tag: 'Healthy', notes: 'Operating within expected range.' },
  ];
  let docs = [
    { id: 'KB-042', type: 'PDF', title: 'M-204 Spindle Assembly — Service Manual', detail: 'Bearing inspection, preload tolerances, lubrication intervals, and restart checklist for the M-series spindle assembly.', tags: ['M-204', 'Spindle', 'Mechanical'], updated: 'Updated 12 Aug 2026', pages: '84 pages' },
    { id: 'KB-038', type: 'SOP', title: 'CNC Machine Safe Stop & Lockout', detail: 'Approved shutdown and lockout sequence for CNC machining centers. Includes isolation points and restart authorization.', tags: ['Safety', 'CNC', 'Lockout'], updated: 'Updated 02 Sep 2026', pages: '12 steps' },
    { id: 'KB-031', type: 'LOG', title: 'M-204 Bearing Replacement — May 2026', detail: 'Maintenance record from the previous spindle bearing replacement, including wear measurements and vibration readings.', tags: ['M-204', 'Bearing', 'History'], updated: 'Updated 18 May 2026', pages: '6 entries' },
    { id: 'KB-027', type: 'PDF', title: 'Hydraulic Press P-018 — Troubleshooting Guide', detail: 'Diagnostic chart for pressure instability, valve block symptoms, and accumulator pre-charge checks.', tags: ['P-018', 'Hydraulics', 'Pressure'], updated: 'Updated 21 Jul 2026', pages: '32 pages' },
    { id: 'KB-019', type: 'SOP', title: 'Coolant Concentration Management', detail: 'Refractometer procedure, target concentrations by process, mixing guidance, and contamination response.', tags: ['Coolant', 'Machining', 'SOP'], updated: 'Updated 04 Jun 2026', pages: '9 steps' },
    { id: 'KB-014', type: 'LOG', title: 'Line 3 Safety Interlock Incident Review', detail: 'Root-cause analysis of intermittent interlock signals and corrective action history for the packaging cell.', tags: ['R-031', 'Safety', 'Electrical'], updated: 'Updated 27 Aug 2026', pages: '4 entries' },
  ];
  const defaults = {
    page: 'overview', query: '', incidentFilter: 'All', workFilter: 'All', assetArea: 'All areas', docType: 'All document types', settingsTab: 'General',
    incidents: seedIncidents,
    workorders: [
      { id: 'WO-1107', title: 'Replace spindle front bearing', incident: 'INC-2841', asset: 'M-204 · CNC Mill', priority: 'Critical', status: 'Awaiting assignment', department: 'Mechanical', assignee: 'Unassigned', initials: '—', due: 'Today, 14:30', progress: 0 },
      { id: 'WO-1106', title: 'Inspect accumulator pre-charge', incident: 'INC-2839', asset: 'P-018 · Hydraulic Press', priority: 'High', status: 'In progress', department: 'Hydraulics', assignee: 'R. Singh', initials: 'RS', due: 'Today, 16:00', progress: 56 },
      { id: 'WO-1105', title: 'Align conveyor return idler', incident: 'INC-2837', asset: 'C-07 · Assembly Conveyor', priority: 'Medium', status: 'Scheduled', department: 'Mechanical', assignee: 'S. Kumar', initials: 'SK', due: 'Today, 18:00', progress: 15 },
      { id: 'WO-1104', title: 'Top up coolant sump to 6.5%', incident: 'INC-2835', asset: 'L-112 · CNC Lathe', priority: 'Medium', status: 'In progress', department: 'Utilities', assignee: 'M. Patel', initials: 'MP', due: 'Today, 15:20', progress: 72 },
      { id: 'WO-1103', title: 'Inspect guard switch alignment', incident: 'INC-2832', asset: 'R-031 · Packaging Robot', priority: 'High', status: 'Awaiting assignment', department: 'Electrical', assignee: 'Unassigned', initials: '—', due: 'Today, 13:45', progress: 0 },
    ],
    assets: seedAssets,
    profile: { name: 'Alex Morgan', role: 'Plant manager' },
    toggles: { 'AI triage': true, 'Automatic escalation': true, 'Sensor anomaly alerts': true, 'Auto-create work orders': false, 'Include AI recommendations': true, 'Maintenance digest': true, 'Policy 0': true, 'Policy 1': true, 'Policy 2': true, 'Policy 3': true },
    toast: null,
  };
  const pristineDefaults = JSON.parse(JSON.stringify(defaults));
  const backend = window.IndustryOpsBackend;
  const backendMode = Boolean(backend?.configured);
  let plantMembers = [];
  let state;
  try {
    const stored = JSON.parse(localStorage.getItem('industryops-demo-state') || 'null');
    state = stored ? { ...pristineDefaults, ...stored, incidents: Array.isArray(stored.incidents) ? stored.incidents : JSON.parse(JSON.stringify(pristineDefaults.incidents)), workorders: Array.isArray(stored.workorders) ? stored.workorders : JSON.parse(JSON.stringify(pristineDefaults.workorders)) } : JSON.parse(JSON.stringify(pristineDefaults));
  } catch (_) { state = JSON.parse(JSON.stringify(pristineDefaults)); }
  let account = { name: state.profile?.name || 'Alex Morgan', email: 'Demo account', role: state.profile?.role || 'Plant manager' };
  let authSession = null;
  const root = document.getElementById('app');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const persist = () => { try { const { toast, ...saved } = state; if (backendMode) { delete saved.incidents; delete saved.workorders; delete saved.assets; } localStorage.setItem('industryops-demo-state', JSON.stringify(saved)); } catch (_) {} };
  const toast = message => {
    const region = document.querySelector('.toast-region');
    if (!region) return;
    const item = document.createElement('div'); item.className = 'toast'; item.innerHTML = `<span class="toast-mark">✓</span><span>${esc(message)}</span>`;
    region.append(item); window.setTimeout(() => item.remove(), 3100);
  };
  const statusClass = value => ({ Critical: 'status-critical', High: 'status-high', Watch: 'status-high', Medium: 'status-medium', Low: 'status-low', Healthy: 'status-low', Resolved: 'status-resolved', 'In progress': 'status-progress', Scheduled: 'status-open', 'Awaiting assignment': 'status-open', Open: 'status-open' }[value] || 'status-open');
  const pill = value => `<span class="status-pill ${statusClass(value)}">${esc(value)}</span>`;
  const initials = name => name === 'Unassigned' ? '—' : name.split(/[ .]/).filter(Boolean).map(x => x[0]).join('').slice(0, 2).toUpperCase();
  function setAccount(session, members = []) {
    authSession = session;
    const metadata=session?.user?.user_metadata||{};
    const member=members.find(row=>row.userId===session?.user?.id);
    const roleLabels={admin:'Plant admin',manager:'Plant manager',maintenance:'Maintenance',operator:'Operator',viewer:'Viewer'};
    const email=session?.user?.email||'';
    account={name:metadata.display_name||metadata.full_name||member?.displayName||email.split('@')[0]||'Plant user',email,role:roleLabels[member?.role]||'Plant member'};
  }
  const shortTime = () => new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());

  function shell() {
    const page = nav.find(item => item[0] === state.page) || nav[0];
    root.innerHTML = `<div class="app-shell">
      <aside class="sidebar" id="sidebar">
        <div class="brand"><div class="brand-mark">IO</div><div class="brand-copy"><div class="brand-name">IndustryOps AI</div><div class="brand-caption">Operations intelligence</div></div></div>
        <div class="workspace-chip"><div class="plant-icon">${svg('machine')}</div><div class="workspace-copy"><strong>Riverton Works</strong><span>Plant 01 · Production</span></div>${svg('chevron')}</div>
        <div class="nav-label">Workspace</div><nav class="nav-list" aria-label="Main navigation">${nav.slice(0, 6).map(item => navItem(item)).join('')}</nav>
        <div class="nav-spacer"></div><div class="nav-label">Administration</div><nav class="nav-list" aria-label="Administration">${nav.slice(6).map(item => navItem(item)).join('')}</nav>
        <div class="sidebar-bottom"><div class="system-status"><span>AI systems</span><span class="status-live"><i class="status-dot"></i> Operational</span></div><button class="user-profile" type="button" data-action="account-menu" aria-haspopup="true" aria-expanded="false" aria-controls="accountMenu"><span class="avatar">${esc(initials(account.name))}</span><span class="user-copy"><strong>${esc(account.name)}</strong><span>${esc(account.role)}</span></span>${svg('chevron')}</button><div class="account-menu" id="accountMenu" role="menu" hidden><div class="account-menu-heading"><strong>${esc(account.name)}</strong><span>${esc(account.email)}</span><i>${esc(account.role)}</i></div><button type="button" role="menuitem" data-action="edit-profile">Edit profile</button>${backendMode?'<button type="button" role="menuitem" data-action="change-password">Change password</button>':''}<button type="button" role="menuitem" data-page="settings">Workspace settings</button>${backendMode?'<button type="button" class="account-signout" role="menuitem" data-action="sign-out">Sign out</button>':''}</div></div>
      </aside>
      <main class="main-area">
        <header class="topbar">
          <button class="icon-button mobile-menu" type="button" aria-label="Open navigation" data-action="mobile-menu">${svg('menu')}</button>
          <div class="crumbs"><span>Riverton Works</span>${svg('chevron')}<strong id="breadcrumb">${esc(page[1])}</strong></div>
          <div class="top-actions"><label class="search-box">${svg('search')}<input id="globalSearch" type="search" aria-label="Search this page" placeholder="Search this page…" value="${esc(state.query)}" /><span class="keycap">/</span></label><button class="icon-button" type="button" aria-label="Notifications" data-action="notifications">${svg('bell')}<i class="notification-dot"></i></button></div>
        </header>
        <div class="page-wrap"><div class="demo-banner">${svg('spark')}<span><strong>${backendMode ? 'Connected to Supabase' : 'Interactive demo'}</strong> · ${backendMode ? 'Plant records are stored in your Supabase project.' : 'Sample plant data is stored only in this browser.'}</span>${backendMode ? '' : '<button class="text-link" data-action="reset-demo" style="margin-left:auto">Reset demo</button>'}</div><div id="pageContent">${pageMarkup()}</div></div>
      </main>
      <div class="toast-region" aria-live="polite"></div><div id="overlayRoot"></div>
    </div>`;
  }
  function loginView(message = '') {
    const setupMode=!backendMode;
    root.innerHTML = `<main class="auth-screen"><section class="card auth-card"><div class="brand-mark">IO</div><div class="eyebrow" style="margin-top:20px">${message ? 'Connection required' : setupMode ? 'Supabase setup' : 'Secure plant access'}</div><h1>Sign in to IndustryOps</h1><p>${setupMode?'Connect your plant workspace to enable secure sign-in and shared operational records.':'Use an account that has access to this Supabase plant.'}</p>${message ? `<div class="auth-error" role="alert">${esc(message)}</div>` : ''}<form data-form="login"><div class="field"><label for="auth-email">Email</label><input id="auth-email" name="email" type="email" autocomplete="username" required ${setupMode?'disabled':''} /></div><div class="field"><label for="auth-password">Password</label><input id="auth-password" name="password" type="password" autocomplete="current-password" required ${setupMode?'disabled':''} /></div><button class="btn btn-primary" type="submit" ${setupMode?'disabled':''}>Sign in</button></form>${setupMode?'<button class="btn btn-outline auth-demo-button" type="button" data-action="enter-demo">Continue with demo</button>':''}<div class="field-hint" style="margin-top:15px">${setupMode?'Add your Supabase URL, anon/public key, and plant ID in supabase-config.js to enable login. Do not use a service-role key here.':'A plant administrator must add your user to plant_members.'}</div></section></main>`;
  }
  function accountProfileModal() {
    modal('Your profile','Update the name shown in the operations workspace.',`<div class="account-readonly"><span>Signed in as</span><strong>${esc(account.email)}</strong><span>Plant role</span><strong>${esc(account.role)}</strong></div>${field('Display name','displayName','text',account.name,true)}`,'account-profile','Save profile');
  }
  function passwordModal() {
    modal('Change password','Choose a new password for your account.',`${field('New password','password','password','',true,'Use at least 8 characters.')}${field('Confirm new password','confirmPassword','password','',true)}`,'account-password','Update password');
  }
  function navItem(item) {
    return `<button type="button" class="nav-item ${state.page === item[0] ? 'active' : ''}" data-page="${item[0]}"><span class="nav-icon">${svg(item[2])}</span><span>${esc(item[1])}</span>${item[3] ? `<i class="nav-count">${item[3]}</i>` : ''}</button>`;
  }
  const header = (eyebrow, title, subtitle, actions = '') => `<div class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><div class="page-subtitle">${subtitle}</div></div><div class="heading-actions">${actions}</div></div>`;
  const kpiCard = (name, value, foot, trend, icon, kind = 'up') => `<article class="card kpi"><div class="kpi-top"><span>${name}</span><span class="kpi-icon">${svg(icon)}</span></div><div class="kpi-value">${value}</div><div class="kpi-foot"><span class="${kind === 'down' ? 'trend-down' : 'trend-up'}">${trend}</span><span>${foot}</span></div></article>`;
  const demoFilter = options => `<select class="select-control" aria-label="Time period" data-action="period">${options.map(o => `<option>${o}</option>`).join('')}</select>`;

  function trendChart() {
    const vals = [18, 26, 22, 33, 28, 43, 35, 47, 39, 55, 43, 61];
    const xs = vals.map((_, i) => 58 + i * 56);
    const points = vals.map((v, i) => `${xs[i]},${169 - v * 2.1}`).join(' ');
    const area = `58,169 ${points} ${xs[xs.length - 1]},169`;
    const grid = [40, 80, 120, 160].map((y, i) => `<line class="chart-grid-line" x1="40" y1="${y}" x2="690" y2="${y}"/><text x="8" y="${y + 3}">${[60, 40, 20, 0][i]}</text>`).join('');
    const bars = vals.map((v, i) => `<rect class="chart-bar ${i === vals.length - 1 ? 'active' : ''}" x="${xs[i] - 9}" y="${169 - v * 1.42}" width="18" height="${v * 1.42}"/>`).join('');
    const labels = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'].map((x, i) => `<text x="${52 + i * 125}" y="196">${x}</text>`).join('');
    return `<svg class="chart-svg" viewBox="0 0 710 205" role="img" aria-label="Incident volume and resolved incidents trend">${grid}<polygon class="chart-area" points="${area}"/><polyline class="chart-line" points="${points}"/>${bars}${labels}</svg>`;
  }
  function priorityDonut() {
    const counts = ['Critical','High','Medium','Low'].map(priority=>state.incidents.filter(i=>i.status!=='Resolved'&&i.priority===priority).length), total = counts.reduce((a, b) => a + b, 0), colors = ['#ba4d43', '#d98c39', '#cbd78a', '#8dc5ab'];
    const c = 2 * Math.PI * 45; let before = 0;
    const circles = counts.map((n, i) => { const dash = n / total * c; const circle = `<circle cx="65" cy="65" r="45" fill="none" stroke="${colors[i]}" stroke-width="11" stroke-dasharray="${dash} ${c - dash}" stroke-dashoffset="${-before}" transform="rotate(-90 65 65)"/>`; before += dash; return circle; }).join('');
    return `<svg class="donut" viewBox="0 0 130 130" role="img" aria-label="18 open incidents by priority">${circles}<circle class="donut-center" cx="65" cy="65" r="31"/><text class="donut-label" x="65" y="63">${total}</text><text class="donut-small" x="65" y="77">active</text></svg>`;
  }
  function incidentTableRows(list, compact = false) {
    if (!list.length) return `<tr><td colspan="7"><div class="empty-state">No incidents match those filters.</div></td></tr>`;
    return list.map(i => `<tr data-open-incident="${esc(i.id)}" tabindex="0" aria-label="Open ${esc(i.id)} details">
      <td><span class="table-primary mono">${esc(i.id)}</span><span class="table-secondary">${esc(i.time || 'Just now')}</span></td>
      <td><span class="table-primary">${esc(i.title)}</span><span class="table-secondary">${esc(i.asset)} · ${esc(i.location)}</span></td>
      <td>${pill(i.priority)}</td><td>${pill(i.status)}</td>
      <td><span class="assignee"><i class="mini-avatar">${esc(i.initials || initials(i.assignee))}</i>${esc(i.assignee)}</span></td>
      <td><span class="sla ${i.priority === 'Critical' || (i.sla || '').startsWith('00:') ? 'urgent' : ''}">${esc(i.sla || '—')}</span></td>
      ${compact ? '' : `<td><button class="text-link" data-action="incident-menu" data-id="${esc(i.id)}" aria-label="More actions">•••</button></td>`}
    </tr>`).join('');
  }
  function incidentTable(list, compact = false) {
    return `<div class="table-scroll"><table><thead><tr><th>Incident</th><th>Issue</th><th>Priority</th><th>Status</th><th>Owner</th><th>SLA left</th>${compact ? '' : '<th></th>'}</tr></thead><tbody>${incidentTableRows(list, compact)}</tbody></table></div>`;
  }
  function filteredIncidents() {
    let list = [...state.incidents];
    if (state.incidentFilter !== 'All') list = list.filter(i => state.incidentFilter === 'Active' ? i.status !== 'Resolved' : i.priority === state.incidentFilter);
    const q = state.query.trim().toLowerCase();
    if (q) list = list.filter(i => [i.id, i.title, i.asset, i.location, i.priority, i.status, i.department, i.assignee].join(' ').toLowerCase().includes(q));
    return list;
  }
  function overviewPage() {
    const active = state.incidents.filter(i => i.status !== 'Resolved');
    const availabilityValues=state.assets.map(a=>Number(String(a.runtime||'').replace('%',''))).filter(Number.isFinite);
    const availability=availabilityValues.length?`${(availabilityValues.reduce((a,b)=>a+b,0)/availabilityValues.length).toFixed(1)}%`:'—';
    const priorityCounts=['Critical','High','Medium','Low'].map(priority=>active.filter(i=>i.priority===priority).length);
    const q = state.query.trim().toLowerCase();
    let queue = state.incidentFilter === 'Active' || state.incidentFilter === 'All' ? active : active.filter(i => i.priority === state.incidentFilter);
    if (q) queue = queue.filter(i => [i.id, i.title, i.asset, i.location, i.priority, i.status, i.department, i.assignee].join(' ').toLowerCase().includes(q));
    return `${header('Monday, 05 October 2026', 'Good morning, Alex', 'Here’s what is happening across Riverton Works today.', `<button class="btn btn-outline" data-action="export">${svg('download')} Export</button><button class="btn btn-primary" data-action="new-incident">${svg('plus')} Report an issue</button>`)}
      <section class="grid kpi-grid">${kpiCard('Active incidents', active.length, 'Unresolved plant reports', 'Live', 'alert', 'up')}${kpiCard('Open work orders', state.workorders.filter(w => w.status !== 'Complete').length, `${state.workorders.filter(w=>w.status==='Awaiting assignment').length} need assignment`, 'Live', 'wrench', 'down')}${kpiCard('Fleet availability', availability, 'Average reported uptime', 'Live', 'machine')}${kpiCard('Mean time to resolve', '—', 'Needs resolution history', 'Live', 'clock')}</section>
      <section class="grid main-grid"><article class="card"><div class="card-header"><div><div class="card-title">Incident activity</div><div class="card-note">Created and resolved across this shift</div></div><div class="chart-legend"><span class="legend-item"><i class="legend-swatch"></i>Created</span><span class="legend-item"><i class="legend-swatch muted"></i>Resolved</span></div></div><div class="chart-wrap">${trendChart()}</div></article>
      <article class="card"><div class="card-header"><div><div class="card-title">Active incidents by priority</div><div class="card-note">Across all production areas</div></div><button class="text-link" data-page="incidents">View queue ${svg('arrow')}</button></div><div class="donut-layout">${priorityDonut()}<div class="priority-list">${[['Critical',priorityCounts[0],''],['High',priorityCounts[1],'high'],['Medium',priorityCounts[2],'medium'],['Low',priorityCounts[3],'low']].map(x=>`<div class="priority-row"><span class="priority-key"><i class="priority-dot ${x[2]}"></i>${x[0]}</span><strong>${x[1]}</strong></div>`).join('')}</div></div></article></section>
      <section class="card section-card"><div class="card-header"><div><div class="card-title">Priority queue</div><div class="card-note">Incidents that may need attention this shift</div></div><button class="text-link" data-page="incidents">All incidents ${svg('arrow')}</button></div><div class="table-toolbar"><div class="filter-chips">${['All','Critical','High','Active'].map(x=>`<button class="filter-chip ${state.incidentFilter===x?'active':''}" data-filter="${x}">${x==='Active'?'Unresolved':x}</button>`).join('')}</div><span class="card-note">Updated just now</span></div>${incidentTable(queue.slice(0, 4), true)}</section>
      <section class="grid bottom-grid" style="margin-top:14px"><article class="card"><div class="card-header"><div><div class="card-title">Recent activity</div><div class="card-note">Updates from across the plant</div></div><button class="text-link" data-action="activity">View activity</button></div><div class="activity-list"><div class="activity-row"><div class="activity-bullet">${svg('spark')}</div><div class="activity-text"><strong>AI triage flagged a critical spindle issue</strong> on CNC Mill M-204.<div class="activity-time">4 min ago · Incident INC-2841</div></div></div><div class="activity-row"><div class="activity-bullet">${svg('check')}</div><div class="activity-text"><strong>Work order WO-1106 moved to In progress</strong> by R. Singh.<div class="activity-time">18 min ago · Hydraulic Press P-018</div></div></div><div class="activity-row"><div class="activity-bullet">${svg('pulse')}</div><div class="activity-text"><strong>Pressure anomaly detected</strong> on Hydraulic Press P-018.<div class="activity-time">22 min ago · Sensor alert</div></div></div></div></article>
      <article class="card"><div class="card-header"><div><div class="card-title">System health</div><div class="card-note">Connected data sources</div></div><span class="status-live" style="font-size:9px;color:#3b7258"><i class="status-dot"></i>All systems normal</span></div><div class="health-list"><div class="health-row"><i class="health-status"></i><div class="health-copy"><strong>Sensor network</strong><span>124 of 126 devices reporting</span></div><span class="health-value">98.4%</span></div><div class="health-row"><i class="health-status"></i><div class="health-copy"><strong>AI inference · AMD ROCm</strong><span>GPU accelerator online</span></div><span class="health-value">42 ms</span></div><div class="health-row"><i class="health-status warn"></i><div class="health-copy"><strong>Knowledge index</strong><span>2 documents need review</span></div><span class="health-value">Review</span></div></div></article></section>`;
  }
  function incidentsPage() {
    const list = filteredIncidents();
    return `${header('Operations / Monitoring', 'Incident queue', 'Triage incoming reports, review AI findings, and route work to the right team.', `<button class="btn btn-outline" data-action="export">${svg('download')} Export</button><button class="btn btn-primary" data-action="new-incident">${svg('plus')} Report an issue</button>`)}
      <section class="card section-card"><div class="card-header"><div><div class="card-title">All incidents <span class="mono" style="color:#89958e;font-weight:500">${state.incidents.length}</span></div><div class="card-note">AI-assisted classification · Sample records</div></div><button class="btn btn-outline btn-small" data-action="toast-filter">${svg('filter')} Filters</button></div><div class="table-toolbar"><div class="filter-chips">${['All','Active','Critical','High','Medium','Low'].map(x=>`<button class="filter-chip ${state.incidentFilter===x?'active':''}" data-filter="${x}">${x==='Active'?'Unresolved':x}</button>`).join('')}</div><span class="card-note">${list.length} shown</span></div>${incidentTable(list)}</section>`;
  }
  function workorderRows(list) {
    const assignees=backendMode?['Unassigned','Maintenance team',...plantMembers]:['Unassigned','Maintenance team','R. Singh','S. Kumar','M. Patel','L. Chen','A. Das'];
    return list.length ? list.map(w=>`<tr><td><span class="table-primary mono">${esc(w.id)}</span><span class="table-secondary">From ${esc(w.incident)}</span></td><td><span class="table-primary">${esc(w.title)}</span><span class="table-secondary">${esc(w.asset)}</span></td><td>${pill(w.priority)}</td><td><select class="select-control" data-action="wo-status" data-id="${esc(w.id)}" aria-label="Change work order status">${['Awaiting assignment','Scheduled','In progress','Complete'].map(s=>`<option ${w.status===s?'selected':''}>${s}</option>`).join('')}</select></td><td>${esc(w.department)}</td><td><select class="select-control" data-action="wo-assignee" data-id="${esc(w.id)}" aria-label="Assign work order">${assignees.map(name=>`<option ${w.assignee===name?'selected':''}>${esc(name)}</option>`).join('')}</select></td><td><span class="sla">${esc(w.due)}</span></td><td><div style="display:flex;align-items:center;gap:6px"><div style="width:42px;height:4px;border-radius:4px;background:#edf0ec;overflow:hidden"><i style="display:block;width:${Number(w.progress)||0}%;height:100%;background:#6c9d6e"></i></div><span class="mono" style="font-size:8px">${Number(w.progress)||0}%</span></div></td></tr>`).join('') : `<tr><td colspan="8"><div class="empty-state">No work orders match your search.</div></td></tr>`;
  }
  function workordersPage() {
    let list = [...state.workorders]; const q=state.query.trim().toLowerCase();
    if(state.workFilter!=='All') list=list.filter(w=>w.status===state.workFilter);
    if(q) list=list.filter(w=>[w.id,w.title,w.asset,w.department,w.assignee,w.status].join(' ').toLowerCase().includes(q));
    const open=state.workorders.filter(w=>w.status!=='Complete').length;
    return `${header('Operations / Maintenance', 'Work orders', 'Coordinate maintenance work from assignment through verified completion.', `<button class="btn btn-outline" data-action="export">${svg('download')} Export</button><button class="btn btn-primary" data-action="new-workorder">${svg('plus')} Create work order</button>`)}<section class="grid kpi-grid">${kpiCard('Open work orders',open,'Across 4 departments','+2','wrench')}${kpiCard('Awaiting assignment',state.workorders.filter(w=>w.status==='Awaiting assignment').length,'Needs an owner today','Action','clock','down')}${kpiCard('Completed this week','28','vs. 24 last week','+17%','check')}${kpiCard('On-time completion','92%','Target is 90%','+3.4%','chart')}</section>
      <section class="card section-card"><div class="card-header"><div><div class="card-title">Maintenance work</div><div class="card-note">Linked incidents, owners, and due times</div></div><button class="btn btn-outline btn-small" data-action="toast-filter">${svg('filter')} Filters</button></div><div class="table-toolbar"><div class="filter-chips">${['All','Awaiting assignment','Scheduled','In progress','Complete'].map(s=>`<button class="filter-chip ${state.workFilter===s?'active':''}" data-work-filter="${esc(s)}">${s==='Awaiting assignment'?'Unassigned':s}</button>`).join('')}</div><span class="card-note">${list.length} work orders</span></div><div class="table-scroll"><table><thead><tr><th>Order</th><th>Work description</th><th>Priority</th><th>Status</th><th>Department</th><th>Assignee</th><th>Due</th><th>Progress</th></tr></thead><tbody>${workorderRows(list)}</tbody></table></div></section>`;
  }
  function assetsPage() {
    const q=state.query.trim().toLowerCase(); const list=state.assets.filter(a=>(state.assetArea==='All areas'||a.type===state.assetArea)&&(!q||[a.id,a.name,a.type,a.location,a.tag].join(' ').toLowerCase().includes(q)));
    return `${header('Operations / Equipment', 'Asset health', 'Monitor equipment condition and connect emerging signals to active incidents.', `<button class="btn btn-outline" data-action="export">${svg('download')} Export</button><button class="btn btn-primary" data-action="toast-add-asset">${svg('plus')} Add asset</button>`)}<section class="grid kpi-grid">${kpiCard('Tracked assets', state.assets.length, 'Assets in plant register','Live','machine')}${kpiCard('Healthy', state.assets.filter(a=>a.tag==='Healthy').length, 'Status: healthy','Live','check')}${kpiCard('On watch', state.assets.filter(a=>a.tag==='Watch').length, 'Status: watch','Live','pulse','down')}${kpiCard('Critical', state.assets.filter(a=>a.tag==='Critical').length, 'Immediate inspection needed','Live','alert','down')}</section>
      <div class="page-toolbar"><label class="inline-search">${svg('search')}<input id="pageSearch" type="search" placeholder="Search asset, ID, or area…" value="${esc(state.query)}" aria-label="Search assets" /></label><div class="toolbar-right"><select class="select-control" data-action="asset-area" aria-label="Filter assets by area">${['All areas','Machining','Forming','Material handling','Robotics','Utilities'].map(x=>`<option ${state.assetArea===x?'selected':''}>${x}</option>`).join('')}</select><button class="btn btn-outline btn-small" data-action="toast-filter">${svg('filter')} Filter</button></div></div><section class="grid asset-grid">${list.map(a=>`<article class="card asset-card" data-open-asset="${esc(a.id)}" tabindex="0"><div class="asset-top"><span class="asset-glyph">${svg('machine')}</span>${pill(a.tag)}</div><h3>${esc(a.name)} <span class="mono" style="color:#8c9891;font-weight:500">${esc(a.id)}</span></h3><div class="asset-meta">${esc(a.type)} · ${esc(a.location)}</div><div class="asset-metrics"><div class="asset-metric"><span>Health score</span><strong class="${a.health<70?'metric-bad':a.health<80?'metric-warn':'metric-good'}">${a.health}/100</strong></div><div class="asset-metric"><span>Temperature</span><strong class="${a.id==='M-204'?'metric-bad':''}">${esc(a.temp)}</strong></div><div class="asset-metric"><span>Uptime</span><strong>${esc(a.runtime)}</strong></div></div></article>`).join('') || '<div class="empty-state">No assets match that search.</div>'}</section>`;
  }
  function knowledgePage() {
    const q=state.query.trim().toLowerCase(); const docTypeMap={'All document types':null,Manuals:'PDF',Procedures:'SOP','Maintenance logs':'LOG'}; const list=docs.filter(d=>(!docTypeMap[state.docType]||d.type===docTypeMap[state.docType])&&(!q||[d.id,d.title,d.detail,...d.tags].join(' ').toLowerCase().includes(q)));
    return `${header('Operations / Knowledge', 'Knowledge base', 'Technical manuals, procedures, and maintenance history used by AI triage.', `<button class="btn btn-outline" data-action="upload-doc">${svg('upload')} Upload document</button><button class="btn btn-primary" data-action="toast-index">${svg('plus')} Add source</button>`)}<section class="grid kpi-grid">${kpiCard('Indexed documents','248','Across 7 collections','+12','book')}${kpiCard('Last sync','10:42','All sources up to date','Today','check')}${kpiCard('AI retrieval quality','93.8%','Relevant result in top 3','+2.1%','spark')}${kpiCard('Needs review','2','Parsing or metadata issue','Review','alert','down')}</section>
      <div class="page-toolbar"><label class="inline-search">${svg('search')}<input type="search" id="pageSearch" placeholder="Search manuals, asset IDs, or procedures…" value="${esc(state.query)}" aria-label="Search knowledge base" /></label><div class="toolbar-right"><select class="select-control" data-action="doc-type" aria-label="Filter document type">${['All document types','Manuals','Procedures','Maintenance logs'].map(x=>`<option ${state.docType===x?'selected':''}>${x}</option>`).join('')}</select></div></div><section class="grid doc-grid">${list.map(d=>`<article class="card doc-card"><div class="asset-top"><span class="doc-type">${esc(d.type)}</span><button class="text-link" data-action="doc-menu" data-id="${esc(d.id)}">•••</button></div><h3>${esc(d.title)}</h3><p>${esc(d.detail)}</p><div class="doc-tags">${d.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div><div class="doc-footer"><span>${esc(d.id)} · ${esc(d.pages)}</span><span>${esc(d.updated)}</span></div></article>`).join('') || '<div class="empty-state">No documents match that search.</div>'}</section>`;
  }
  function analyticsPage() {
    return `${header('Operations / Performance', 'Analytics', 'Understand incident patterns, reliability trends, and maintenance response.', `<select class="select-control" data-action="period"><option>Last 30 days</option><option>Last 7 days</option><option>Last 90 days</option></select><button class="btn btn-outline" data-action="export">${svg('download')} Export report</button>`)}<section class="grid kpi-grid">${kpiCard('Incidents this month','184','vs. 212 last month','−13.2%','alert')}${kpiCard('Mean time to resolve','2.8 hrs','Plant-wide average','−22%','clock')}${kpiCard('Repeat incidents','8.2%','Within 10% target','−1.4%','pulse')}${kpiCard('Downtime avoided','31 hrs','AI-assisted early action','+18%','bolt')}</section>
      <section class="grid analytics-grid"><article class="card"><div class="card-header"><div><div class="card-title">Incident trend</div><div class="card-note">Created incidents and completed work orders</div></div><div class="chart-legend"><span class="legend-item"><i class="legend-swatch"></i>Incidents</span><span class="legend-item"><i class="legend-swatch muted"></i>Resolved</span></div></div><div class="chart-wrap wide-chart">${trendChart()}</div></article><article class="card"><div class="card-header"><div><div class="card-title">By production area</div><div class="card-note">Incident volume this month</div></div></div><div class="bar-chart">${[22,36,29,53,42,68,50,82,58,70,61,45].map((h,i)=>`<div class="bar-group"><i class="bar-col" style="height:${h}%"></i><i class="bar-col ${i>8?'emphasis':''}" style="height:${Math.max(9,h*.62)}%"></i></div>`).join('')}</div><div class="bar-labels"><span>Machining</span><span>Press</span><span>Assembly</span><span>Packaging</span><span>Utilities</span></div></article></section>
      <section class="grid bottom-grid"><article class="card"><div class="card-header"><div><div class="card-title">Most affected assets</div><div class="card-note">Ranked by incident count · last 30 days</div></div><button class="text-link" data-page="assets">View assets ${svg('arrow')}</button></div><div class="table-scroll"><table><thead><tr><th>Asset</th><th>Area</th><th>Incidents</th><th>Repeat rate</th><th>Availability</th></tr></thead><tbody>${[['M-204','Machining',12,'25%','91.4%'],['P-018','Press Shop',8,'12.5%','96.2%'],['R-031','Packaging',7,'14.2%','92.7%'],['C-07','Assembly',5,'0%','99.1%']].map(r=>`<tr><td><span class="table-primary">${r[0]} <span class="table-secondary" style="display:inline">· Equipment</span></span></td><td>${r[1]}</td><td><span class="mono">${r[2]}</span></td><td>${r[3]}</td><td>${r[4]}</td></tr>`).join('')}</tbody></table></div></article><article class="card"><div class="card-header"><div><div class="card-title">AI triage quality</div><div class="card-note">Reviewed recommendations</div></div>${pill('Low')}</div><div class="health-list"><div class="health-row"><i class="health-status"></i><div class="health-copy"><strong>Classification accuracy</strong><span>Based on 138 reviewed incidents</span></div><span class="health-value">94.2%</span></div><div class="health-row"><i class="health-status"></i><div class="health-copy"><strong>Useful recommendation</strong><span>Accepted by maintenance lead</span></div><span class="health-value">88.6%</span></div><div class="health-row"><i class="health-status warn"></i><div class="health-copy"><strong>Escalations prevented</strong><span>Resolved before SLA threshold</span></div><span class="health-value">17</span></div></div></article></section>`;
  }
  function escalationsPage() {
    const rules=[['Critical · immediate','Notify supervisor and safety lead','Immediate · SMS + dashboard'],['High · 30 minutes','Notify department supervisor','After 30 min · dashboard'],['Medium · 4 hours','Notify maintenance coordinator','After 4 hrs · email'],['Low · 1 shift','Include in shift handoff','At shift end · digest']];
    return `${header('Operations / Response', 'Escalation policies', 'Define who is notified when an incident or work order approaches its SLA.', `${backendMode ? '<button class="btn btn-outline" data-action="run-escalations">Check SLAs now</button>' : ''}<button class="btn btn-outline" data-action="toast-policy">Policy history</button><button class="btn btn-primary" data-action="new-policy">${svg('plus')} Add policy</button>`)}<section class="grid kpi-grid">${kpiCard('Escalations today','3','1 still awaiting response','+1','bolt','down')}${kpiCard('SLA compliance','96.1%','Target is 95%','+2.3%','clock')}${kpiCard('Mean response','14 min','From alert to acknowledgement','−6 min','pulse')}${kpiCard('Active policies','4','Across all priorities','No change','gear')}</section>
      <section class="grid analytics-grid"><article class="card"><div class="card-header"><div><div class="card-title">Priority escalation rules</div><div class="card-note">Automatic notifications based on incident priority and elapsed time</div></div><span class="status-live" style="font-size:9px;color:#3b7258"><i class="status-dot"></i>Enabled</span></div><div class="policy-list">${rules.map((r,i)=>`<div class="policy-row"><div><div class="policy-name">${r[0]}</div><div class="policy-copy">${r[1]} · ${r[2]}</div></div><button class="toggle ${state.toggles[`Policy ${i}`] !== false?'on':''}" data-toggle="Policy ${i}" aria-label="Toggle ${esc(r[0])}"></button></div>`).join('')}</div></article><article class="card"><div class="card-header"><div><div class="card-title">Escalation contacts</div><div class="card-note">On-call routing for this plant</div></div><button class="text-link" data-action="manage-contacts">Manage</button></div><div class="health-list"><div class="health-row"><i class="mini-avatar">JT</i><div class="health-copy"><strong>Jordan Taylor</strong><span>Plant supervisor · On call</span></div><span class="health-value">Primary</span></div><div class="health-row"><i class="mini-avatar">RS</i><div class="health-copy"><strong>Ravi Singh</strong><span>Maintenance lead · Mechanical</span></div><span class="health-value">Backup</span></div><div class="health-row"><i class="mini-avatar">LC</i><div class="health-copy"><strong>Lin Chen</strong><span>Safety officer</span></div><span class="health-value">Safety</span></div></div></article></section>
      <section class="card section-card"><div class="card-header"><div><div class="card-title">Recent escalations</div><div class="card-note">Triggered when a response or resolution threshold was reached</div></div><button class="text-link" data-action="export">Export history</button></div><div class="table-scroll"><table><thead><tr><th>Incident</th><th>Priority</th><th>Escalated to</th><th>Reason</th><th>Time</th><th>Outcome</th></tr></thead><tbody><tr><td><span class="table-primary mono">INC-2806</span><span class="table-secondary">M-204 · spindle vibration</span></td><td>${pill('Critical')}</td><td>J. Taylor · Supervisor</td><td>SLA breached</td><td class="mono">09:12</td><td>${pill('In progress')}</td></tr><tr><td><span class="table-primary mono">INC-2799</span><span class="table-secondary">P-018 · pressure drop</span></td><td>${pill('High')}</td><td>R. Singh · Maintenance</td><td>30 min without owner</td><td class="mono">08:46</td><td>${pill('Resolved')}</td></tr><tr><td><span class="table-primary mono">INC-2788</span><span class="table-secondary">R-031 · interlock fault</span></td><td>${pill('High')}</td><td>L. Chen · Safety</td><td>Safety event</td><td class="mono">07:58</td><td>${pill('Resolved')}</td></tr></tbody></table></div></section>`;
  }
  function settingsPage() {
    const tabs=['General','AI & triage','Notifications','Integrations'];
    const settingsContent = state.settingsTab==='AI & triage' ? `<div class="settings-section"><h3>AI incident analysis</h3><p>Control how incoming reports and sensor events are analyzed before a person reviews the result.</p>${settingRow('AI triage','Classify issue, severity, and department automatically')}${settingRow('Auto-create work orders','Create a draft order when an incident is accepted')}${settingRow('Include AI recommendations','Attach source-backed next actions to incident records')}<div class="field" style="margin-top:15px;max-width:360px"><label>Minimum confidence for auto-routing</label><select><option>85% · Recommended</option><option>90%</option><option>95%</option><option>Manual review only</option></select></div></div><div class="settings-section"><h3>Inference environment</h3><p>Connected mode runs the current rules-based triage function in Supabase. No external model or plant GPU is configured.</p><div class="setting-row"><div><div class="setting-label">Compute</div><div class="setting-help">Supabase Edge Function · rules baseline</div></div><span class="status-pill status-open">Rules mode</span></div></div>`
      : state.settingsTab==='Notifications' ? `<div class="settings-section"><h3>Alerts and digests</h3><p>Choose which operational updates are delivered to your dashboard and shift handoff.</p>${settingRow('Automatic escalation','Notify the right supervisor when an SLA is at risk')}${settingRow('Sensor anomaly alerts','Create an incident when a sensor crosses its configured threshold')}${settingRow('Maintenance digest','Send a summary at the end of each shift')}</div><div class="settings-section"><h3>Shift schedule</h3><div class="form-grid"><div class="field"><label>Day shift starts</label><input value="06:00" type="time" /></div><div class="field"><label>Night shift starts</label><input value="18:00" type="time" /></div></div></div>`
      : state.settingsTab==='Integrations' ? `<div class="settings-section"><h3>Connected systems</h3><p>Connection status for data sources used by IndustryOps AI.</p>${[['Triage function',backendMode?'Supabase Edge Function · rules baseline':'Browser demo rules',backendMode?'Connected':'Demo'],['Sensor gateway','Edge Function endpoint · gateway key required','Not configured'],['Knowledge sources',`${backendMode?docs.length:6} documents · Supabase table`,backendMode?'Connected':'Demo'],['Maintenance system','External CMMS ticket sync · credentials required','Not configured'],['Plant GPU inference','AMD ROCm runtime · endpoint required','Not configured']].map(x=>`<div class="setting-row"><div><div class="setting-label">${x[0]}</div><div class="setting-help">${x[1]}</div></div><span class="status-pill ${x[2]==='Connected'?'status-low':'status-open'}">${x[2]}</span></div>`).join('')}</div>`
      : `<div class="settings-section"><h3>Plant profile</h3><p>Basic information used for incident routing, reporting, and shift handoffs.</p><div class="form-grid"><div class="field"><label>Workspace name</label><input value="Riverton Works" /></div><div class="field"><label>Plant identifier</label><input value="RVW-01" /></div><div class="field"><label>Timezone</label><select><option>Asia/Kolkata (UTC+05:30)</option><option>UTC</option><option>America/Chicago</option></select></div><div class="field"><label>Units</label><select><option>Metric (°C, mm/s, bar)</option><option>Imperial</option></select></div></div></div><div class="settings-section"><h3>Data and privacy</h3><p>${backendMode?'Operational records are stored in the connected Supabase project.':'This local demo stores its sample settings and edits in your browser only.'}</p><div class="setting-row"><div><div class="setting-label">${backendMode?'Supabase storage':'Browser storage'}</div><div class="setting-help">${backendMode?'Plant-scoped access is enforced by database policies.':'Sample content remains on this device.'}</div></div><span class="status-pill status-low">${backendMode?'Connected':'Active'}</span></div>${backendMode?'':'<button class="btn btn-outline btn-small" data-action="reset-demo">Reset sample data</button>'}</div>`;
    return `${header('Workspace / Configuration','Settings','Configure plant context, AI review behavior, alerting, and connected systems.')}<section class="grid settings-layout"><nav class="card settings-tabs" aria-label="Settings sections">${tabs.map(t=>`<button class="settings-tab ${state.settingsTab===t?'active':''}" data-settings-tab="${t}">${t}</button>`).join('')}</nav><article class="card">${settingsContent}<div class="settings-section" style="display:flex;justify-content:flex-end"><button class="btn btn-primary" data-action="save-settings">Save changes</button></div></article></section>`;
  }
  function settingRow(label, help) { return `<div class="setting-row"><div><div class="setting-label">${label}</div><div class="setting-help">${help}</div></div><button class="toggle ${state.toggles[label]?'on':''}" data-toggle="${esc(label)}" aria-label="Toggle ${esc(label)}"></button></div>`; }
  function pageMarkup() {
    switch (state.page) {
      case 'incidents': return incidentsPage();
      case 'workorders': return workordersPage();
      case 'assets': return assetsPage();
      case 'knowledge': return knowledgePage();
      case 'analytics': return analyticsPage();
      case 'escalations': return escalationsPage();
      case 'settings': return settingsPage();
      default: return overviewPage();
    }
  }
  function renderPage() {
    const page = document.getElementById('pageContent');
    if (page) page.innerHTML = pageMarkup();
    const label = nav.find(item=>item[0]===state.page)?.[1] || 'Overview';
    const crumb = document.getElementById('breadcrumb'); if (crumb) crumb.textContent = label;
    document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.page === state.page));
    persist();
  }
  function closeOverlays() { const mount=document.getElementById('overlayRoot'); if(mount) mount.innerHTML=''; document.body.style.overflow=''; }
  function modal(title, subtitle, body, form, submitLabel='Save') {
    const mount=document.getElementById('overlayRoot'); if(!mount) return;
    mount.innerHTML=`<div class="overlay" data-close-overlay><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle"><div class="modal-head"><div><h2 id="modalTitle">${title}</h2><p>${subtitle}</p></div><button class="close-button" type="button" data-action="close-modal" aria-label="Close">×</button></div><form data-form="${form}"><div class="modal-body">${body}</div><div class="modal-footer"><button class="btn btn-outline" type="button" data-action="close-modal">Cancel</button><button class="btn btn-primary" type="submit">${submitLabel}</button></div></form></section></div>`;
    document.body.style.overflow='hidden'; mount.querySelector('input,select,textarea')?.focus();
  }
  const field = (label, name, type='text', value='', required=false, hint='') => `<div class="field"><label for="f-${name}">${label}${required?' *':''}</label>${type==='textarea'?`<textarea id="f-${name}" name="${name}" ${required?'required':''} placeholder="${esc(value)}"></textarea>`:`<input id="f-${name}" name="${name}" type="${type}" value="${esc(value)}" ${required?'required':''} />`}${hint?`<span class="field-hint">${hint}</span>`:''}</div>`;
  function reportModal() {
    modal('Report an issue','Capture the symptom. Triage will help organize the report.',`<div class="demo-banner">${svg('spark')}<span>${backendMode ? 'The report will be analyzed and saved to Supabase.' : 'In this demo, submission creates a local sample incident.'}</span></div>${field('What is happening?','title','text','Describe the symptom in one line',true)}${field('Details','description','textarea','Include what you observed, when it started, and any safety concern',true)}<div class="form-grid">${field('Machine / asset ID','asset','text','e.g. M-204',true)}<div class="field"><label for="f-priority">Initial priority</label><select id="f-priority" name="priority"><option>AI assess</option><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></div><div class="field"><label for="f-department">Department</label><select id="f-department" name="department"><option>AI assign</option><option>Mechanical</option><option>Electrical</option><option>Hydraulics</option><option>Utilities</option><option>Safety</option></select></div>${field('Reported by','reporter','text','Worker name')}</div>`,'incident','Submit report');
  }
  function workorderModal() {
    modal('Create work order','Assign a maintenance action and set the expected completion time.',`${field('Work description','title','text','Describe the maintenance task',true)}<div class="form-grid">${field('Asset','asset','text','e.g. M-204',true)}<div class="field"><label for="f-priority">Priority</label><select id="f-priority" name="priority"><option>High</option><option>Critical</option><option>Medium</option><option>Low</option></select></div><div class="field"><label for="f-department">Department</label><select id="f-department" name="department"><option>Mechanical</option><option>Electrical</option><option>Hydraulics</option><option>Utilities</option><option>Safety</option></select></div>${field('Due date','due','date','',true)}</div>${field('Linked incident','incident','text','Optional incident ID')}`,'workorder','Create work order');
  }
  function openIncident(id) {
    const i=state.incidents.find(x=>x.id===id); if(!i) return;
    const mount=document.getElementById('overlayRoot'); if(!mount) return;
    const assignees=backendMode?['Unassigned','Maintenance team',...plantMembers]:['Unassigned','Maintenance team','R. Singh','S. Kumar','M. Patel','L. Chen','A. Das'];if(i.assignee&&!assignees.includes(i.assignee))assignees.push(i.assignee);
    mount.innerHTML=`<div class="drawer-wrap" data-close-overlay><aside class="drawer" role="dialog" aria-modal="true" aria-label="Incident details"><div class="drawer-head"><div><div class="eyebrow">${esc(i.id)} · ${esc(i.time)}</div><h2 style="margin:0 0 9px;font-size:16px">${esc(i.title)}</h2><div style="display:flex;gap:6px">${pill(i.priority)}${pill(i.status)}</div></div><button class="close-button" data-action="close-modal" aria-label="Close">×</button></div><div class="drawer-content"><div class="detail-block"><h3>AI assessment · confidence ${esc(i.confidence||'89%')}</h3><p>${esc(i.description)}</p></div><div class="detail-block"><h3>Recommended next action</h3><p>${esc(i.recommendation||'Review the issue and follow the plant procedure.')}</p></div><div class="detail-block"><h3>Evidence considered</h3><p>${esc(i.evidence||'Worker report and linked asset records.')}</p><div class="doc-tags">${(i.signals||['Worker report']).map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div><button class="text-link" data-page="knowledge">View cited source ${svg('arrow')}</button></div><div class="detail-block"><h3>Routing and SLA</h3><div class="detail-kv"><div><span>Asset</span><strong>${esc(i.asset)}</strong></div><div><span>Department</span><strong>${esc(i.department)}</strong></div><div><span>Assigned to</span><select class="select-control" data-action="incident-assignee" data-id="${esc(i.id)}" aria-label="Assign incident">${assignees.map(name=>`<option ${i.assignee===name?'selected':''}>${esc(name)}</option>`).join('')}</select></div><div><span>Response time left</span><strong class="${i.priority==='Critical'?'metric-bad':''}">${esc(i.sla)}</strong></div><div><span>Reported by</span><strong>${esc(i.reporter)}</strong></div><div><span>Source</span><strong>${esc(i.source||'Worker report')}</strong></div></div></div><div style="display:flex;gap:7px;flex-wrap:wrap"><button class="btn btn-primary" data-action="create-linked-wo" data-id="${esc(i.id)}">${svg('wrench')} Create work order</button>${i.status!=='Resolved'?`<button class="btn btn-outline" data-action="resolve-incident" data-id="${esc(i.id)}">${svg('check')} Mark resolved</button>`:''}</div></div></aside></div>`;
    document.body.style.overflow='hidden';
  }
  function openAsset(id) {
    const a=state.assets.find(x=>x.id===id); if(!a) return;
    const mount=document.getElementById('overlayRoot'); if(!mount) return;
    mount.innerHTML=`<div class="drawer-wrap" data-close-overlay><aside class="drawer" role="dialog" aria-modal="true" aria-label="Asset details"><div class="drawer-head"><div><div class="eyebrow">Equipment / ${esc(a.id)}</div><h2 style="margin:0 0 7px;font-size:16px">${esc(a.name)}</h2><div class="asset-meta">${esc(a.type)} · ${esc(a.location)}</div></div><button class="close-button" data-action="close-modal" aria-label="Close">×</button></div><div class="drawer-content"><div class="detail-block"><h3>Condition overview</h3><div class="detail-kv"><div><span>Asset health score</span><strong class="${a.health<70?'metric-bad':'metric-good'}">${a.health} / 100</strong></div><div><span>Availability</span><strong>${esc(a.runtime)}</strong></div><div><span>Temperature</span><strong>${esc(a.temp)}</strong></div><div><span>Vibration</span><strong>${esc(a.vibration)}</strong></div></div></div><div class="detail-block"><h3>Latest insight</h3><p>${esc(a.notes)}</p></div><div class="detail-block"><h3>Recent linked incidents</h3>${state.incidents.filter(i=>i.asset.includes(a.id)).map(i=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0f2ef"><div><strong style="font-size:9px">${esc(i.id)}</strong><div class="table-secondary">${esc(i.title)}</div></div>${pill(i.priority)}</div>`).join('') || '<p>No recent incidents linked.</p>'}</div><button class="btn btn-primary" data-action="new-incident">${svg('plus')} Report issue for this asset</button></div></aside></div>`;
    document.body.style.overflow='hidden';
  }
  function exportIncidents() {
    const rows=[['Incident','Title','Asset','Priority','Status','Department','Assignee'],...state.incidents.map(i=>[i.id,i.title,i.asset,i.priority,i.status,i.department,i.assignee])];
    const content=rows.map(r=>r.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(',')).join('\r\n');
    try { const blob=new Blob([content],{type:'text/csv;charset=utf-8'}); const url=URL.createObjectURL(blob); const a=document.createElement('a');a.href=url;a.download='industryops-incidents.csv';a.click();URL.revokeObjectURL(url);toast('Incident report exported.'); } catch (_) { toast('Export is unavailable in this browser.'); }
  }
  function newId(prefix, collection) {
    const nums=collection.map(x=>Number((x.id.match(/\d+/)||[])[0])).filter(Number.isFinite); return `${prefix}-${Math.max(0,...nums)+1}`;
  }
  async function submitIncident(form) {
    const data=new FormData(form); const id=backendMode?`INC-${Date.now()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`:newId('INC',state.incidents);
    const assetText=(data.get('asset')||'Unknown asset').trim(); const known=state.assets.find(a=>a.id.toLowerCase()===assetText.toLowerCase());
    const chosen=data.get('priority'); const priority=chosen==='AI assess'?(assetText.toLowerCase()==='m-204'?'Critical':'Medium'):chosen;
    const report={title:String(data.get('title')||'New issue').trim(),description:String(data.get('description')||'').trim(),assetId:assetText,reporter:String(data.get('reporter')||'Plant operator').trim(),requestedPriority:chosen,department:data.get('department')==='AI assign'?'':data.get('department'),source:'Worker report'};
    let triage={};
    if(backendMode){try{triage=await backend.triage(report);}catch(error){toast(`Triage service unavailable: ${error.message}`);return;}}
    const resolvedPriority=triage.priority||priority;
    const incident={id,title:report.title,asset:known?`${known.name} · ${known.id}`:`Equipment · ${assetText}`,assetId:known?.id||assetText,location:known?known.location:'Production floor',priority:resolvedPriority,status:'Open',department:triage.department||report.department||known?.department||'Mechanical',assignee:'Unassigned',initials:'—',sla:resolvedPriority==='Critical'?'00:30':resolvedPriority==='High'?'01:00':'04:00',time:'Just now',reporter:report.reporter,source:'Worker report',description:report.description,confidence:triage.confidence||'Pending',recommendation:triage.recommendation||'AI review is pending. Follow the approved safe-stop procedure if the equipment may be unsafe.',evidence:triage.evidence||'Worker-submitted report',signals:triage.signals||['Natural language','Worker report']};
    if(backendMode){try{const saved=await backend.insertIncident(incident);state.incidents.unshift({...incident,...saved});}catch(error){toast(`Could not save incident: ${error.message}`);return;}}
    else state.incidents.unshift(incident);
    closeOverlays(); renderPage(); toast(`${id} created and added to the triage queue.`);
  }
  async function submitWorkorder(form) {
    const d=new FormData(form), id=backendMode?`WO-${Date.now()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`:newId('WO',state.workorders); const asset=String(d.get('asset')||'').trim();
    const knownAsset=state.assets.find(a=>a.id.toLowerCase()===asset.toLowerCase()||a.name.toLowerCase()===asset.toLowerCase());
    const w={id,title:String(d.get('title')||'').trim(),incident:String(d.get('incident')||'Unlinked').trim()||'Unlinked',asset:knownAsset?`${knownAsset.id} · ${knownAsset.name}`:asset,assetId:knownAsset?.id,priority:d.get('priority'),status:'Awaiting assignment',department:d.get('department'),assignee:'Unassigned',initials:'—',due:d.get('due')?new Date(`${d.get('due')}T12:00:00`).toLocaleDateString('en',{month:'short',day:'numeric'}):'Unscheduled',progress:0};
    if(backendMode){try{const saved=await backend.insertWorkorder(w);state.workorders.unshift({...w,...saved});}catch(error){toast(`Could not create work order: ${error.message}`);return;}}
    else state.workorders.unshift(w);
    closeOverlays(); state.page='workorders';state.query=''; shell();persist();toast(`${id} created.`);
  }

  root.addEventListener('click', event => {
    const accountMenu=document.getElementById('accountMenu');
    if(accountMenu&&!event.target.closest('#accountMenu')&&!event.target.closest('[data-action="account-menu"]')){accountMenu.hidden=true;document.querySelector('[data-action="account-menu"]')?.setAttribute('aria-expanded','false');}
    const pageButton=event.target.closest('[data-page]');
    if(pageButton){ event.preventDefault(); state.page=pageButton.dataset.page;state.query='';state.incidentFilter='All';shell();persist();document.getElementById('sidebar')?.classList.remove('mobile-open');return; }
    const incidentRow=event.target.closest('[data-open-incident]'); if(incidentRow&&!event.target.closest('[data-action]')){openIncident(incidentRow.dataset.openIncident);return;}
    const assetCard=event.target.closest('[data-open-asset]'); if(assetCard){openAsset(assetCard.dataset.openAsset);return;}
    const filter=event.target.closest('[data-filter]'); if(filter){state.incidentFilter=filter.dataset.filter;renderPage();return;}
    const wf=event.target.closest('[data-work-filter]');if(wf){state.workFilter=wf.dataset.workFilter;renderPage();return;}
    const tab=event.target.closest('[data-settings-tab]');if(tab){state.settingsTab=tab.dataset.settingsTab;renderPage();return;}
    const toggle=event.target.closest('[data-toggle]');if(toggle){const name=toggle.dataset.toggle;const enabled=state.toggles[name]=!state.toggles[name];toggle.classList.toggle('on',enabled);persist();const policyIndex=Number(name.replace('Policy ',''));if(backendMode&&Number.isInteger(policyIndex)&&policyIndex>=0&&policyIndex<4){const policyId=['POL-CRITICAL','POL-HIGH','POL-MEDIUM','POL-LOW'][policyIndex];backend.updatePolicy(policyId,{enabled}).catch(error=>{state.toggles[name]=!enabled;renderPage();toast(`Could not update policy: ${error.message}`);});}return;}
    const action=event.target.closest('[data-action]');if(!action)return;
    switch(action.dataset.action){
      case 'new-incident': reportModal();break;
      case 'new-workorder': workorderModal();break;
      case 'close-modal': closeOverlays();break;
      case 'account-menu': {const menu=document.getElementById('accountMenu');if(menu){menu.hidden=!menu.hidden;action.setAttribute('aria-expanded',String(!menu.hidden));}break;}
      case 'edit-profile': closeOverlays();accountProfileModal();break;
      case 'change-password': closeOverlays();passwordModal();break;
      case 'sign-out': if(backendMode){backend.signOut().then(()=>{setAccount(null);loginView();}).catch(error=>loginView(error.message));}break;
      case 'enter-demo': shell();break;
      case 'run-escalations': if(backendMode){action.disabled=true;backend.processEscalations().then(result=>toast(result.escalated?.length?`Escalated ${result.escalated.length} incident(s).`:'No SLA escalations are due.')).catch(error=>toast(`Escalation check failed: ${error.message}`)).finally(()=>{if(action.isConnected)action.disabled=false;});}break;
      case 'mobile-menu': document.getElementById('sidebar')?.classList.toggle('mobile-open');break;
      case 'notifications':if(backendMode)backend.loadNotifications().then(items=>toast(items.length?items.map(item=>item.title).slice(0,3).join(' · '):'No new plant notifications.')).catch(error=>toast(`Could not load notifications: ${error.message}`));else toast('You are all caught up.');break;
      case 'export':exportIncidents();break;
      case 'reset-demo':try{localStorage.removeItem('industryops-demo-state');}catch(_){} state=JSON.parse(JSON.stringify(pristineDefaults));shell();toast('Demo data reset.');break;
      case 'toast-filter':toast('Use the priority and status chips to filter this list.');break;
      case 'toast-add-asset':toast('Asset registration will be available when the plant API is connected.');break;
      case 'upload-doc':toast('Document upload will be connected to the knowledge service.');break;
      case 'toast-index':toast('Source management will be available when connected to the knowledge service.');break;
      case 'toast-policy':toast('All policy changes are shown in the escalation history.');break;
      case 'new-policy':toast('A new escalation policy can be configured from the connected policy service.');break;
      case 'manage-contacts':toast('Contact management will be available when user accounts are connected.');break;
      case 'save-settings':persist();toast('Settings saved in this browser.');break;
      case 'activity':toast('Showing activity for the current shift.');break;
      case 'doc-menu':toast(`Document ${action.dataset.id} actions are ready to connect.`);break;
      case 'incident-menu':openIncident(action.dataset.id);break;
      case 'resolve-incident':{
        const i=state.incidents.find(x=>x.id===action.dataset.id);if(i){(async()=>{try{if(backendMode)await backend.updateIncident(i.id,{status:'Resolved',sla:'Met'});i.status='Resolved';i.sla='Met';closeOverlays();renderPage();toast(`${i.id} marked resolved.`);}catch(error){toast(`Could not update incident: ${error.message}`);}})();}break;
      }
      case 'create-linked-wo':{
        const i=state.incidents.find(x=>x.id===action.dataset.id);if(i){(async()=>{const id=backendMode?`WO-${Date.now()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`:newId('WO',state.workorders);const w={id,title:i.recommendation.split('.')[0],incident:i.id,asset:i.asset,assetId:i.assetId||i.asset.split(' · ').pop(),priority:i.priority,status:'Awaiting assignment',department:i.department,assignee:'Unassigned',initials:'—',due:'Today',progress:0};try{if(backendMode){const saved=await backend.insertWorkorder(w);state.workorders.unshift({...w,...saved});}else state.workorders.unshift(w);closeOverlays();state.page='workorders';state.query='';shell();toast(`${id} linked to ${i.id}.`);}catch(error){toast(`Could not create work order: ${error.message}`);}})();}break;
      }
    }
  });
  root.addEventListener('submit',event=>{
    const form=event.target.closest('form[data-form]');if(!form)return;event.preventDefault();
    if(!form.reportValidity())return;
    if(form.dataset.form==='login'){
      const data=new FormData(form);const button=form.querySelector('[type="submit"]');if(button){button.disabled=true;button.textContent='Signing in…';}
      (async()=>{try{const session=await backend.signIn(String(data.get('email')||''),String(data.get('password')||''));const operations=await backend.loadOperations();state.incidents=operations.incidents;state.workorders=operations.workorders;state.assets=operations.assets;docs=operations.docs;plantMembers=operations.members.filter(member=>member.role!=='viewer').map(member=>member.displayName).filter(Boolean);setAccount(session,operations.members);shell();toast('Connected to your Supabase plant.');}catch(error){loginView(error.message);}})();
    } else if(form.dataset.form==='account-profile'){
      const name=String(new FormData(form).get('displayName')||'').trim();if(!name)return;
      (async()=>{try{if(backendMode)await backend.updateAccount({data:{display_name:name}});account.name=name;state.profile.name=name;persist();closeOverlays();shell();toast('Profile updated.');}catch(error){toast(`Could not update profile: ${error.message}`);}})();
    } else if(form.dataset.form==='account-password'){
      const data=new FormData(form),password=String(data.get('password')||''),confirmation=String(data.get('confirmPassword')||'');
      if(password.length<8){toast('Choose a password with at least 8 characters.');return;}if(password!==confirmation){toast('The passwords do not match.');return;}
      (async()=>{try{await backend.updateAccount({password});closeOverlays();toast('Password updated.');}catch(error){toast(`Could not update password: ${error.message}`);}})();
    } else if(form.dataset.form==='incident')submitIncident(form);else if(form.dataset.form==='workorder')submitWorkorder(form);
  });
  root.addEventListener('input',event=>{
    if(event.target.id==='globalSearch'||event.target.id==='pageSearch'){state.query=event.target.value;renderPage();const current=event.target.id==='globalSearch'?document.getElementById('globalSearch'):document.getElementById('pageSearch');if(current){current.focus();current.setSelectionRange(current.value.length,current.value.length);} }
  });
  root.addEventListener('change',event=>{
    const target=event.target;
    if(target.dataset.action==='wo-status'){
      const w=state.workorders.find(x=>x.id===target.dataset.id);if(w){const old={status:w.status,progress:w.progress,assignee:w.assignee,initials:w.initials};w.status=target.value;w.progress=target.value==='Complete'?100:target.value==='In progress'?Math.max(35,w.progress):target.value==='Scheduled'?10:0;w.assignee=target.value==='Awaiting assignment'?'Unassigned':w.assignee==='Unassigned'?'Maintenance team':w.assignee;w.initials=initials(w.assignee);(async()=>{try{if(backendMode)await backend.updateWorkorder(w.id,{status:w.status,progress:w.progress,assignee:w.assignee,initials:w.initials});renderPage();toast(`${w.id} moved to ${w.status}.`);}catch(error){Object.assign(w,old);renderPage();toast(`Could not update work order: ${error.message}`);}})();}
    }
    if(target.dataset.action==='wo-assignee'){
      const w=state.workorders.find(x=>x.id===target.dataset.id);if(w){const previous=w.assignee;w.assignee=target.value;w.initials=initials(w.assignee);(async()=>{try{if(backendMode)await backend.updateWorkorder(w.id,{assignee:w.assignee,initials:w.initials});renderPage();toast(`${w.id} assigned to ${w.assignee}.`);}catch(error){w.assignee=previous;w.initials=initials(previous);renderPage();toast(`Could not assign work order: ${error.message}`);}})();}
    }
    if(target.dataset.action==='incident-assignee'){
      const i=state.incidents.find(x=>x.id===target.dataset.id);if(i){const previous=i.assignee;i.assignee=target.value;i.initials=initials(i.assignee);(async()=>{try{if(backendMode)await backend.updateIncident(i.id,{assignee:i.assignee,initials:i.initials});openIncident(i.id);toast(`${i.id} assigned to ${i.assignee}.`);}catch(error){i.assignee=previous;i.initials=initials(previous);openIncident(i.id);toast(`Could not assign incident: ${error.message}`);}})();}
    }
    if(target.dataset.action==='period')toast(`Showing ${target.value.toLowerCase()} of sample operational data.`);
    if(target.dataset.action==='asset-area'){state.assetArea=target.value;renderPage();}
    if(target.dataset.action==='doc-type'){state.docType=target.value;renderPage();}
  });
  root.addEventListener('click',event=>{ if(event.target.matches('[data-close-overlay]'))closeOverlays(); });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'){closeOverlays();const menu=document.getElementById('accountMenu');if(menu)menu.hidden=true;document.querySelector('[data-action="account-menu"]')?.setAttribute('aria-expanded','false');document.getElementById('sidebar')?.classList.remove('mobile-open');}
    if(event.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)){event.preventDefault();document.getElementById('globalSearch')?.focus();}
    if(event.key==='Enter'&&event.target.matches('[data-open-incident],[data-open-asset]'))event.target.click();
  });
  async function start() {
    if(!backendMode){loginView();return;}
    const session=await backend.getSession();
    if(!session){loginView();return;}
    try{const operations=await backend.loadOperations();state.incidents=operations.incidents;state.workorders=operations.workorders;state.assets=operations.assets;docs=operations.docs;plantMembers=operations.members.filter(member=>member.role!=='viewer').map(member=>member.displayName).filter(Boolean);setAccount(session,operations.members);shell();}
    catch(error){loginView(error.message);}
  }
  start().catch(error=>loginView(error.message));
})();
