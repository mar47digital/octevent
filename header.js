// ── OCTEVENT HEADER ──
// Injects nav, event header and tabs into #app-header on every page.
// Each page calls: OctHeader.init('overview') — passing the active tab key.

const OctHeader = {

  TABS: [
    {key:'overview',  label:'Overview'},
    {key:'checklist', label:'Checklist'},
    {key:'budget',    label:'Budget'},
    {key:'guests',    label:'Guests'},
    {key:'rooms',     label:'Rooms'},
    {key:'runsheet',  label:'Run sheet'},
    {key:'tableplan', label:'Table plan'},
    {key:'settings',  label:'Settings'},
  ],

  CSS: `
    *{margin:0;padding:0;box-sizing:border-box;}
    :root{
      --amber:#F5A800;--amber-light:#FFF8E6;--amber-dark:#C98A00;
      --ink:#18181A;--ink2:#555;--ink3:#999;--cream:#FAFAF7;--rule:#ECEAE4;
      --green:#2d6a4f;--red:#c0392b;
    }
    html,body{min-height:100%;background:var(--cream);font-family:'DM Sans',sans-serif;color:var(--ink);}
    /* NAV */
    .oc-nav{background:#fff;border-bottom:1px solid var(--rule);padding:0 2rem;height:60px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;}
    .oc-nav-logo img{height:34px;width:auto;}
    .oc-breadcrumb{display:flex;align-items:center;gap:8px;font-size:0.82rem;color:var(--ink3);}
    .oc-breadcrumb a{color:var(--ink3);text-decoration:none;transition:color 0.15s;}
    .oc-breadcrumb a:hover{color:var(--ink);}
    .oc-breadcrumb span{color:var(--ink);font-weight:500;}
    .oc-nav-right{display:flex;align-items:center;gap:8px;}
    .oc-avatar{width:32px;height:32px;border-radius:50%;background:var(--amber);display:flex;align-items:center;justify-content:center;font-size:0.78rem;font-weight:700;}
    /* EVENT HEADER */
    .oc-event-header{background:#fff;border-bottom:1px solid var(--rule);padding:1.25rem 2rem;}
    .oc-event-top{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;margin-bottom:0.75rem;}
    .oc-event-title{font-family:'Nunito',sans-serif;font-size:1.6rem;font-weight:800;line-height:1.1;}
    .oc-status{font-size:0.65rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:3px 10px;border-radius:100px;}
    .oc-status-upcoming{background:var(--amber-light);color:var(--amber-dark);}
    .oc-status-live{background:#f0f7f4;color:var(--green);}
    .oc-status-past{background:var(--rule);color:var(--ink3);}
    .oc-event-meta{display:flex;gap:14px;flex-wrap:wrap;font-size:0.8rem;color:var(--ink3);}
    .oc-stats-row{display:grid;gap:1px;background:var(--rule);border:1px solid var(--rule);border-radius:10px;overflow:hidden;margin-top:0.75rem;grid-template-columns:1fr 1fr 1fr 1fr;}
    .oc-stats-row.has-cover{grid-template-columns:1fr 1fr 1fr 1fr 1fr;}
    .oc-cover{display:none;overflow:hidden;}
    .oc-cover img{width:100%;height:100%;object-fit:cover;display:block;}
    .oc-stat{background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0.6rem;min-height:60px;}
    .oc-stat-n{font-family:'Nunito',sans-serif;font-size:1.1rem;font-weight:800;}
    .oc-stat-l{font-size:0.58rem;color:var(--ink3);text-transform:uppercase;letter-spacing:0.06em;margin-top:2px;}
    /* TABS */
    .oc-tabs{background:#fff;border-bottom:1px solid var(--rule);padding:0 2rem;display:flex;overflow-x:auto;}
    .oc-tab{padding:0.85rem 1rem;font-size:0.82rem;font-weight:500;color:var(--ink3);cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;white-space:nowrap;background:none;border-top:none;border-left:none;border-right:none;font-family:'DM Sans',sans-serif;transition:color 0.15s;}
    .oc-tab:hover{color:var(--ink);}
    .oc-tab.active{color:var(--ink);border-bottom-color:var(--amber);}
    /* SHARED COMPONENTS */
    .btn{display:inline-flex;align-items:center;gap:5px;padding:0.45rem 0.9rem;border-radius:100px;font-size:0.8rem;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.15s;border:1.5px solid var(--rule);background:#fff;color:var(--ink2);text-decoration:none;}
    .btn:hover{border-color:var(--ink);color:var(--ink);}
    .btn.amber{background:var(--amber);border-color:var(--amber);color:var(--ink);font-weight:600;}
    .btn.amber:hover{background:var(--amber-dark);border-color:var(--amber-dark);}
    .btn.danger{color:var(--red);border-color:#fdf0f0;}.btn.danger:hover{background:#fdf0f0;}
    .btn:disabled{opacity:0.5;cursor:not-allowed;}
    main{max-width:100%;padding:1.5rem 2rem;}
    .panel-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;flex-wrap:wrap;gap:8px;}
    .panel-header-left{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
    .panel-title{font-family:'Nunito',sans-serif;font-size:1.2rem;font-weight:800;}
    .table-wrap{background:#fff;border:1px solid var(--rule);border-radius:12px;overflow:hidden;}
    .table-scroll{overflow-x:auto;}
    table{width:100%;border-collapse:collapse;}
    thead{background:var(--cream);}
    th{padding:0.6rem 0.8rem;text-align:left;font-size:0.67rem;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:var(--ink3);border-bottom:1px solid var(--rule);white-space:nowrap;}
    th.num,td.num{text-align:right;}
    td{padding:0.7rem 0.8rem;font-size:0.81rem;border-bottom:1px solid var(--rule);vertical-align:middle;}
    tr:last-child td{border-bottom:none;}
    tr:hover td{background:var(--amber-light);}
    .add-row td{cursor:pointer;color:var(--ink3);border-top:2px solid var(--rule);}
    .add-row:hover td{background:var(--amber-light);color:var(--ink);}
    td.editing{padding:2px!important;background:#fff!important;}
    .inline-input{width:100%;padding:4px 7px;border:2px solid var(--amber);border-radius:5px;font-family:'DM Sans',sans-serif;font-size:0.81rem;color:var(--ink);outline:none;background:#fff;}
    .inline-select{width:100%;padding:4px 5px;border:2px solid var(--amber);border-radius:5px;font-family:'DM Sans',sans-serif;font-size:0.77rem;color:var(--ink);outline:none;background:#fff;cursor:pointer;}
    .green{color:var(--green)!important;}.red{color:var(--red)!important;}
    .badge{display:inline-block;font-size:0.63rem;font-weight:700;padding:2px 8px;border-radius:20px;text-transform:uppercase;letter-spacing:0.05em;white-space:nowrap;}
    .row-del{font-size:0.7rem;padding:2px 7px;border-radius:5px;border:1px solid var(--rule);background:#fff;cursor:pointer;font-family:'DM Sans',sans-serif;color:var(--ink2);opacity:0;transition:opacity 0.12s;}
    tr:hover .row-del{opacity:1;}
    .row-del:hover{border-color:var(--red);color:var(--red);}
    .empty-state{text-align:center;padding:3rem 2rem;background:#fff;border:1px solid var(--rule);border-radius:12px;}
    .empty-state .icon{font-size:2rem;margin-bottom:0.6rem;opacity:0.4;}
    .empty-state h3{font-family:'Nunito',sans-serif;font-size:1rem;font-weight:800;margin-bottom:0.3rem;}
    .empty-state p{font-size:0.82rem;color:var(--ink3);margin-bottom:1rem;font-weight:300;}
    .spinner{width:26px;height:26px;border:3px solid var(--rule);border-top-color:var(--amber);border-radius:50%;animation:oc-spin 0.7s linear infinite;margin:2.5rem auto;display:block;}
    @keyframes oc-spin{to{transform:rotate(360deg);}}
    .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:200;display:none;align-items:center;justify-content:center;padding:1.5rem;}
    .modal-overlay.open{display:flex;}
    .modal{background:#fff;border-radius:16px;width:100%;max-width:480px;padding:1.5rem;}
    .modal-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.2rem;}
    .modal-title{font-family:'Nunito',sans-serif;font-size:1.1rem;font-weight:800;}
    .modal-close{width:28px;height:28px;border-radius:50%;background:var(--cream);border:none;cursor:pointer;font-size:0.9rem;}
    .modal-close:hover{background:var(--rule);}
    .modal-footer{display:flex;gap:8px;justify-content:flex-end;margin-top:1.2rem;}
    .field{margin-bottom:0.85rem;}
    .field label{display:block;font-size:0.76rem;font-weight:500;color:var(--ink2);margin-bottom:0.3rem;}
    .field input,.field select,.field textarea{width:100%;padding:0.65rem 0.9rem;border:1.5px solid var(--rule);border-radius:8px;font-family:'DM Sans',sans-serif;font-size:0.85rem;color:var(--ink);background:#fff;outline:none;transition:border-color 0.2s;}
    .field input:focus,.field select:focus,.field textarea:focus{border-color:var(--amber);}
    .field textarea{resize:vertical;min-height:70px;}
    .field-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
    .btn-primary{padding:0.6rem 1.25rem;border-radius:100px;background:var(--amber);color:var(--ink);border:none;font-family:'DM Sans',sans-serif;font-size:0.82rem;font-weight:600;cursor:pointer;}
    .btn-primary:hover{background:var(--amber-dark);color:#fff;}
    .btn-cancel{padding:0.6rem 1.1rem;border-radius:100px;border:1.5px solid var(--rule);background:#fff;color:var(--ink2);font-family:'DM Sans',sans-serif;font-size:0.82rem;cursor:pointer;}
    .progress-wrap{background:#fff;border:1px solid var(--rule);border-radius:10px;padding:0.85rem 1rem;margin-bottom:1rem;}
    .progress-label{display:flex;justify-content:space-between;font-size:0.78rem;color:var(--ink2);margin-bottom:0.35rem;}
    .progress-bar{height:6px;background:var(--rule);border-radius:100px;overflow:hidden;}
    .progress-fill{height:100%;background:var(--amber);border-radius:100px;transition:width 0.4s;}
    .summary-cards{display:grid;grid-template-columns:repeat(5,1fr);gap:9px;margin-bottom:1.1rem;}
    .s-card{background:#fff;border:1px solid var(--rule);border-radius:10px;padding:0.8rem 1rem;}
    .s-card-label{font-size:0.65rem;color:var(--ink3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:0.25rem;}
    .s-card-value{font-family:'Nunito',sans-serif;font-size:1.2rem;font-weight:800;}
    .s-card-value.green{color:var(--green);}.s-card-value.red{color:var(--red);}.s-card-value.amber{color:var(--amber-dark);}
    @media(max-width:768px){
      .oc-nav{padding:0 1rem;}.oc-breadcrumb{display:none;}
      .oc-event-header{padding:1rem;}
      .oc-event-title{font-size:1.3rem;}
      .oc-stats-row,.oc-stats-row.has-cover{grid-template-columns:1fr 1fr!important;}
      .oc-cover{display:none!important;}
      .oc-tabs{padding:0 0.5rem;}.oc-tab{font-size:0.72rem;padding:0.75rem 0.5rem;}
      main{padding:1rem 0.85rem;}
      .summary-cards{grid-template-columns:1fr 1fr;}
      .field-row{grid-template-columns:1fr;}
      .panel-header{flex-direction:column;align-items:flex-start;}
    }
    @media(max-width:480px){
      .oc-tab{font-size:0.68rem;padding:0.65rem 0.4rem;}
    }
  `,

  go(page) {
    location.href = '/' + page + '?id=' + (new URLSearchParams(location.search).get('id'));
  },

  inject(activeTab) {
    // Inject CSS
    const style = document.createElement('style');
    style.textContent = this.CSS;
    document.head.appendChild(style);

    // Inject Google Fonts
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;800&family=DM+Sans:wght@300;400;500&display=swap';
    document.head.appendChild(link);

    // Build tabs HTML
    const tabsHtml = this.TABS.map(t =>
      `<button class="oc-tab${t.key===activeTab?' active':''}" onclick="OctHeader.go('event-${t.key}')">${t.label}</button>`
    ).join('');

    // Inject header HTML
    const el = document.getElementById('app-header');
    if (!el) return;
    el.innerHTML = `
      <nav class="oc-nav">
        <div style="display:flex;align-items:center;gap:0.9rem;">
          <a href="/dashboard" class="oc-nav-logo"><img src="/octevent-logo.png" alt="Octevent"></a>
          <div class="oc-breadcrumb">
            <a href="/dashboard">My Events</a>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            <span id="oc-event-name">Loading...</span>
          </div>
        </div>
        <div class="oc-nav-right">
          <div class="oc-avatar" id="oc-avatar">?</div>
          <a href="/dashboard" class="btn">← All events</a>
        </div>
      </nav>
      <div class="oc-event-header">
        <div class="oc-event-top">
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
              <div class="oc-event-title" id="oc-event-title">Loading...</div>
              <span class="oc-status oc-status-upcoming" id="oc-event-status">Upcoming</span>
            </div>
            <div class="oc-event-meta" id="oc-event-meta"></div>
          </div>
          <button class="btn" onclick="OctHeader.go('event-settings')">Settings</button>
        </div>
        <div class="oc-stats-row" id="oc-stats-row">
          <div class="oc-cover" id="oc-cover"><img id="oc-cover-img" alt=""></div>
          <div class="oc-stat"><div class="oc-stat-n" id="stat-guests">0</div><div class="oc-stat-l">Guests confirmed</div></div>
          <div class="oc-stat"><div class="oc-stat-n" id="stat-rooms">0</div><div class="oc-stat-l">Rooms booked</div></div>
          <div class="oc-stat"><div class="oc-stat-n" id="stat-budget">€0</div><div class="oc-stat-l">Total budget</div></div>
          <div class="oc-stat"><div class="oc-stat-n" id="stat-days">—</div><div class="oc-stat-l">Days to event</div></div>
        </div>
      </div>
      <div class="oc-tabs">${tabsHtml}</div>`;
  },

  async load() {
    const params = new URLSearchParams(location.search);
    const eventId = params.get('id');
    if (!eventId) { location.href='/dashboard'; return null; }

    const {data:ev, error} = await sb.from('events').select('*').eq('id',eventId).single();
    if (error||!ev) { location.href='/dashboard'; return null; }
    currentEvent = ev;

    document.title = ev.name + ' — Octevent';

    const nameEl = document.getElementById('oc-event-name');
    const titleEl = document.getElementById('oc-event-title');
    if (nameEl) nameEl.textContent = ev.name;
    if (titleEl) titleEl.textContent = ev.name;

    const now = new Date(); now.setHours(0,0,0,0);
    const ed = ev.event_date ? new Date(ev.event_date) : null;
    if (ed) ed.setHours(0,0,0,0);
    const diff = ed ? Math.round((ed-now)/86400000) : null;
    const status = diff === null ? 'upcoming' : diff > 1 ? 'upcoming' : diff >= 0 ? 'live' : 'past';
    const statusEl = document.getElementById('oc-event-status');
    if (statusEl) {
      statusEl.textContent = status.charAt(0).toUpperCase()+status.slice(1);
      statusEl.className = 'oc-status oc-status-'+status;
    }

    const meta = [];
    if (ev.event_date) {
      const d2 = ev.end_date && ev.end_date!==ev.event_date ? ' — '+fmtDate(ev.end_date) : '';
      meta.push('<span>'+fmtDate(ev.event_date)+d2+'</span>');
    }
    const loc = [ev.venue,ev.city,ev.country].filter(Boolean).join(', ');
    if (loc) meta.push('<span>'+loc+'</span>');
    if (ev.event_type) meta.push('<span>'+ev.event_type.charAt(0).toUpperCase()+ev.event_type.slice(1)+'</span>');
    const metaEl = document.getElementById('oc-event-meta');
    if (metaEl) metaEl.innerHTML = meta.join('<span style="color:var(--rule);margin:0 4px;">·</span>');

    const statsRow = document.getElementById('oc-stats-row');
    const cover = document.getElementById('oc-cover');
    const coverImg = document.getElementById('oc-cover-img');
    if (ev.cover_image && cover && coverImg && statsRow) {
      coverImg.src = ev.cover_image;
      cover.style.display = 'block'; cover.style.minHeight = '60px';
      statsRow.classList.add('has-cover');
    }

    const daysEl = document.getElementById('stat-days');
    if (daysEl) {
      if (diff === null) { daysEl.textContent = '—'; }
      else if (diff === 0) { daysEl.textContent = 'Today'; daysEl.style.color='var(--amber-dark)'; }
      else if (diff > 0) {
        daysEl.textContent = diff;
        if (diff <= 7) daysEl.style.color = 'var(--amber-dark)';
      }
      else { daysEl.textContent = 'Past'; daysEl.style.color='var(--ink3)'; }
    }

    // Load live stats from actual tables
    const [gRes, rRes, bRes] = await Promise.all([
      sb.from('guests').select('rsvp_status').eq('event_id', eventId),
      sb.from('rooms').select('status').eq('event_id', eventId),
      sb.from('budget_items').select('actual_amount').eq('event_id', eventId),
    ]);

    const guests = gRes.data || [];
    const rooms  = rRes.data || [];
    const budget = bRes.data || [];

    const confirmed = guests.filter(g => g.rsvp_status === 'confirmed').length;
    const bookedRooms = rooms.filter(r => r.status !== 'available').length;
    const totalBudget = budget.reduce((s,i) => s + parseFloat(i.actual_amount||0), 0);

    const guestEl = document.getElementById('stat-guests');
    if (guestEl) guestEl.textContent = confirmed + ' / ' + guests.length;

    const roomsEl = document.getElementById('stat-rooms');
    if (roomsEl) roomsEl.textContent = bookedRooms + ' / ' + rooms.length;

    const budgetEl = document.getElementById('stat-budget');
    if (budgetEl) budgetEl.textContent = totalBudget > 0 ? '€'+totalBudget.toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2}) : '€0';

    return ev;
  },

  async init(activeTab) {
    this.inject(activeTab);

    const {data:{session}} = await sb.auth.getSession();
    if (!session) { location.href='/login'; return; }

    const name = session.user.user_metadata?.full_name || session.user.email.split('@')[0];
    const av = document.getElementById('oc-avatar');
    if (av) av.textContent = name.charAt(0).toUpperCase();

    return await this.load();
  }
};
