// ── OCTEVENT HEADER v3 — Left sidebar layout ──
const OctHeader = {

  TABS: [
    {key:'overview',  label:'Overview',   icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>'},
    {key:'guests',    label:'Guests',     icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>'},
    {key:'rooms',     label:'Rooms',      icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'},
    {key:'budget',    label:'Budget',     icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>'},
    {key:'checklist', label:'Checklist',  icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>'},
    {key:'runsheet',  label:'Run sheet',  icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'},
    {key:'tableplan', label:'Table plan', icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="4" r="1.5"/><circle cx="19.5" cy="8" r="1.5"/><circle cx="19.5" cy="16" r="1.5"/><circle cx="12" cy="20" r="1.5"/><circle cx="4.5" cy="16" r="1.5"/><circle cx="4.5" cy="8" r="1.5"/></svg>'},
    {key:'settings',  label:'Settings',   icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>'},
  ],

  CSS: `
    *{margin:0;padding:0;box-sizing:border-box;}
    :root{
      --amber:#F5A800;--amber-light:#FFF8E6;--amber-dark:#C98A00;
      --ink:#18181A;--ink2:#555;--ink3:#9A9AA0;--cream:#FAFAF7;--rule:#ECEAE4;
      --green:#2d6a4f;--red:#c0392b;
      --sidebar-w:220px;
    }
    html,body{min-height:100%;background:var(--cream);font-family:'DM Sans',sans-serif;color:var(--ink);}

    /* ── LAYOUT ── */
    .oc-layout{display:flex;min-height:100vh;}

    /* ── SIDEBAR ── */
    .oc-sidebar{
      width:var(--sidebar-w);flex-shrink:0;
      background:#fff;border-right:1px solid var(--rule);
      display:flex;flex-direction:column;
      position:fixed;top:0;left:0;height:100vh;
      z-index:50;overflow-y:auto;
    }
    .oc-sidebar-logo{
      padding:1.25rem 1.25rem 0.75rem;
      border-bottom:1px solid var(--rule);
    }
    .oc-sidebar-logo a{display:block;}
    .oc-sidebar-logo img{height:30px;width:auto;}
    .oc-event-info{
      padding:0.85rem 1.25rem;
      border-bottom:1px solid var(--rule);
    }
    .oc-event-name{
      font-family:'Nunito',sans-serif;
      font-size:0.88rem;font-weight:800;
      color:var(--ink);line-height:1.3;
      margin-bottom:3px;
      white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
    }
    .oc-event-date{font-size:0.72rem;color:var(--ink3);}
    .oc-event-status{
      display:inline-block;font-size:0.6rem;font-weight:700;
      letter-spacing:0.06em;text-transform:uppercase;
      padding:2px 7px;border-radius:100px;margin-top:4px;
    }
    .oc-status-upcoming{background:var(--amber-light);color:var(--amber-dark);}
    .oc-status-live{background:#f0f7f4;color:var(--green);}
    .oc-status-past{background:var(--rule);color:var(--ink3);}

    /* Sidebar nav */
    .oc-sidebar-nav{flex:1;padding:0.5rem 0;}
    .oc-nav-item{
      display:flex;align-items:center;gap:10px;
      width:100%;padding:0.6rem 1.25rem;
      font-size:0.83rem;font-weight:500;color:var(--ink2);
      background:none;border:none;cursor:pointer;
      font-family:'DM Sans',sans-serif;text-align:left;
      border-radius:0;transition:all 0.15s;
      text-decoration:none;position:relative;
    }
    .oc-nav-item:hover{background:var(--cream);color:var(--ink);}
    .oc-nav-item.active{
      background:var(--amber-light);color:var(--ink);font-weight:600;
    }
    .oc-nav-item.active::before{
      content:'';position:absolute;left:0;top:0;bottom:0;
      width:3px;background:var(--amber);border-radius:0 2px 2px 0;
    }
    .oc-nav-item svg{opacity:0.6;flex-shrink:0;}
    .oc-nav-item.active svg{opacity:1;}
    .oc-nav-divider{height:1px;background:var(--rule);margin:0.5rem 1.25rem;}
    .oc-nav-dash{
      display:flex;align-items:center;gap:10px;
      padding:0.6rem 1.25rem;font-size:0.83rem;
      font-weight:500;color:var(--ink3);cursor:pointer;
      text-decoration:none;transition:color 0.15s;
    }
    .oc-nav-dash:hover{color:var(--ink);}
    .oc-nav-dash svg{opacity:0.5;}

    /* Sidebar footer */
    .oc-sidebar-footer{
      padding:0.75rem 1.25rem;border-top:1px solid var(--rule);
      display:flex;align-items:center;gap:9px;
    }
    .oc-avatar{
      width:28px;height:28px;border-radius:50%;
      background:var(--amber);display:flex;align-items:center;
      justify-content:center;font-size:0.72rem;font-weight:700;
      flex-shrink:0;cursor:default;
    }
    .oc-user-name{font-size:0.78rem;font-weight:500;color:var(--ink2);
      white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}

    /* ── MAIN CONTENT ── */
    .oc-main{
      margin-left:var(--sidebar-w);
      flex:1;display:flex;flex-direction:column;min-height:100vh;
    }

    /* Event header bar */
    .oc-event-header{
      background:#fff;border-bottom:1px solid var(--rule);
      padding:0 2rem;
      display:flex;align-items:stretch;
      position:sticky;top:0;z-index:40;
    }
    .oc-cover-thumb{
      width:80px;flex-shrink:0;overflow:hidden;display:none;
    }
    .oc-cover-thumb img{width:100%;height:100%;object-fit:cover;display:block;}
    .oc-cover-thumb.visible{display:block;}
    .oc-stats-strip{
      display:flex;flex:1;
    }
    .oc-stat{
      display:flex;flex-direction:column;align-items:center;
      justify-content:center;padding:0.85rem 1.5rem;
      border-right:1px solid var(--rule);min-width:120px;
    }
    .oc-stat:last-child{border-right:none;}
    .oc-stat-n{
      font-family:'Nunito',sans-serif;font-size:1.3rem;
      font-weight:800;line-height:1;
    }
    .oc-stat-l{
      font-size:0.58rem;color:var(--ink3);
      text-transform:uppercase;letter-spacing:0.07em;margin-top:3px;
    }
    .oc-header-actions{
      display:flex;align-items:center;padding-left:1rem;gap:8px;flex-shrink:0;
    }

    /* Page content */
    main{padding:2rem;max-width:1200px;}

    /* ── MOBILE TOP BAR ── */
    .oc-topbar{
      display:none;background:#fff;border-bottom:1px solid var(--rule);
      padding:0 1rem;height:56px;
      align-items:center;justify-content:space-between;
      position:sticky;top:0;z-index:50;
    }
    .oc-topbar-logo img{height:28px;width:auto;}
    .oc-burger{
      background:none;border:none;cursor:pointer;
      font-size:1.2rem;color:var(--ink);padding:6px;line-height:1;
    }

    /* ── MOBILE DRAWER ── */
    .oc-drawer-overlay{
      display:none;position:fixed;inset:0;
      background:rgba(0,0,0,0.4);z-index:200;
    }
    .oc-drawer-overlay.open{display:block;}
    .oc-drawer{
      position:fixed;top:0;left:-260px;width:260px;height:100%;
      background:#fff;z-index:201;
      transition:left 0.25s ease;
      display:flex;flex-direction:column;
      box-shadow:4px 0 24px rgba(0,0,0,0.1);
    }
    .oc-drawer.open{left:0;}
    .oc-drawer-head{
      padding:1rem 1.25rem;border-bottom:1px solid var(--rule);
      display:flex;align-items:center;justify-content:space-between;
    }
    .oc-drawer-head img{height:26px;width:auto;}
    .oc-drawer-close{
      background:none;border:none;cursor:pointer;
      font-size:1.1rem;color:var(--ink3);padding:4px;
    }
    .oc-drawer-event{
      padding:0.75rem 1.25rem;border-bottom:1px solid var(--rule);
      font-size:0.82rem;font-weight:600;color:var(--ink);
      white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
    }
    .oc-drawer-nav{flex:1;overflow-y:auto;padding:0.4rem 0;}
    .oc-drawer-item{
      display:flex;align-items:center;gap:10px;
      width:100%;padding:0.75rem 1.25rem;
      font-size:0.88rem;font-weight:500;color:var(--ink2);
      background:none;border:none;cursor:pointer;
      font-family:'DM Sans',sans-serif;text-align:left;
      transition:background 0.15s;border-left:3px solid transparent;
    }
    .oc-drawer-item:hover{background:var(--cream);color:var(--ink);}
    .oc-drawer-item.active{
      background:var(--amber-light);color:var(--ink);
      font-weight:600;border-left-color:var(--amber);
    }
    .oc-drawer-item svg{opacity:0.6;}
    .oc-drawer-item.active svg{opacity:1;}
    .oc-drawer-footer{
      border-top:1px solid var(--rule);padding:0.5rem 0;
    }

    /* ── SHARED COMPONENTS ── */
    .btn{display:inline-flex;align-items:center;gap:5px;padding:0.45rem 0.9rem;border-radius:100px;font-size:0.8rem;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.15s;border:1.5px solid var(--rule);background:#fff;color:var(--ink2);text-decoration:none;}
    .btn:hover{border-color:var(--ink);color:var(--ink);}
    .btn.amber{background:var(--amber);border-color:var(--amber);color:var(--ink);font-weight:600;}
    .btn.amber:hover{background:var(--amber-dark);border-color:var(--amber-dark);}
    .btn.danger{color:var(--red);border-color:#fdf0f0;}.btn.danger:hover{background:#fdf0f0;}
    .btn:disabled{opacity:0.5;cursor:not-allowed;}
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
    .empty-state h3{font-family:'Nunito',sans-serif;font-size:1rem;font-weight:800;margin-bottom:0.3rem;}
    .empty-state p{font-size:0.82rem;color:var(--ink3);margin-bottom:1rem;font-weight:300;}
    .spinner{width:26px;height:26px;border:3px solid var(--rule);border-top-color:var(--amber);border-radius:50%;animation:oc-spin 0.7s linear infinite;margin:2.5rem auto;display:block;}
    @keyframes oc-spin{to{transform:rotate(360deg);}}
    .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:300;display:none;align-items:center;justify-content:center;padding:1.5rem;}
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
    .progress-bar{height:5px;background:var(--rule);border-radius:100px;overflow:hidden;}
    .progress-fill{height:100%;background:var(--amber);border-radius:100px;transition:width 0.4s;}
    .summary-cards{display:grid;grid-template-columns:repeat(5,1fr);gap:9px;margin-bottom:1.1rem;}
    .s-card{background:#fff;border:1px solid var(--rule);border-radius:10px;padding:0.8rem 1rem;}
    .s-card-label{font-size:0.65rem;color:var(--ink3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:0.25rem;}
    .s-card-value{font-family:'Nunito',sans-serif;font-size:1.2rem;font-weight:800;}
    .s-card-value.green{color:var(--green);}.s-card-value.red{color:var(--red);}.s-card-value.amber{color:var(--amber-dark);}

    /* ── RESPONSIVE ── */
    @media(max-width:768px){
      .oc-sidebar{display:none;}
      .oc-topbar{display:flex;}
      .oc-main{margin-left:0;}
      .oc-event-header{position:relative;padding:0 1rem;overflow-x:auto;}
      .oc-stat{padding:0.75rem 1rem;min-width:90px;}
      .oc-stat-n{font-size:1.1rem;}
      main{padding:1rem;}
      .summary-cards{grid-template-columns:1fr 1fr;}
      .field-row{grid-template-columns:1fr;}
      .panel-header{flex-direction:column;align-items:flex-start;}
    }
  `,

  go(page) {
    location.href = '/' + page + '?id=' + (new URLSearchParams(location.search).get('id'));
  },

  openDrawer() {
    document.getElementById('oc-drawer').classList.add('open');
    document.getElementById('oc-drawer-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeDrawer() {
    document.getElementById('oc-drawer').classList.remove('open');
    document.getElementById('oc-drawer-overlay').classList.remove('open');
    document.body.style.overflow = '';
  },

  inject(activeTab) {
    // CSS + fonts
    const style = document.createElement('style');
    style.textContent = this.CSS;
    document.head.appendChild(style);
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;800;900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap';
    document.head.appendChild(link);

    const self = this;

    // Build sidebar nav items
    function buildNavItems(cls, clickFn) {
      return self.TABS.map(function(t) {
        var btn = document.createElement('button');
        btn.className = cls + (t.key === activeTab ? ' active' : '');
        btn.innerHTML = t.icon + '<span>' + t.label + '</span>';
        btn.addEventListener('click', function() { clickFn(); self.go('event-' + t.key); });
        return btn.outerHTML;
      }).join('');
    }

    // Inject full layout wrapper
    const appHeader = document.getElementById('app-header');
    if (!appHeader) return;

    appHeader.innerHTML = `
      <!-- MOBILE TOPBAR -->
      <div class="oc-topbar">
        <button class="oc-burger" onclick="OctHeader.openDrawer()">&#9776;</button>
        <a href="/dashboard"><img src="/octevent-logo.png" alt="Octevent" class="oc-topbar-logo" style="height:28px;width:auto;"></a>
        <div class="oc-avatar" id="oc-avatar-mobile">?</div>
      </div>

      <!-- MOBILE DRAWER OVERLAY -->
      <div class="oc-drawer-overlay" id="oc-drawer-overlay" onclick="OctHeader.closeDrawer()"></div>

      <!-- MOBILE DRAWER -->
      <div class="oc-drawer" id="oc-drawer">
        <div class="oc-drawer-head">
          <a href="/dashboard"><img src="/octevent-logo.png" alt="Octevent" style="height:26px;width:auto;"></a>
          <button class="oc-drawer-close" onclick="OctHeader.closeDrawer()">&#x2715;</button>
        </div>
        <div class="oc-drawer-event" id="oc-drawer-event-name">Loading...</div>
        <div class="oc-drawer-nav" id="oc-drawer-nav"></div>
        <div class="oc-drawer-footer">
          <div style="height:1px;background:var(--rule);margin:0 1.25rem 0.5rem;"></div>
          <a href="/dashboard" style="display:flex;align-items:center;gap:10px;font-size:0.85rem;font-weight:500;color:var(--ink2);text-decoration:none;padding:0.65rem 1.25rem;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Dashboard
          </a>
        </div>
      </div>

      <div class="oc-layout">
        <!-- SIDEBAR -->
        <aside class="oc-sidebar">
          <div class="oc-sidebar-logo">
            <a href="/dashboard"><img src="/octevent-logo.png" alt="Octevent"></a>
          </div>
          <div class="oc-event-info">
            <div class="oc-event-name" id="oc-event-name">Loading...</div>
            <div class="oc-event-date" id="oc-event-date"></div>
            <div class="oc-event-status oc-status-upcoming" id="oc-event-status">Upcoming</div>
          </div>
          <nav class="oc-sidebar-nav" id="oc-sidebar-nav"></nav>
          <div class="oc-nav-divider"></div>
          <a href="/dashboard" class="oc-nav-dash">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Dashboard
          </a>
          <div class="oc-sidebar-footer">
            <div class="oc-avatar" id="oc-avatar">?</div>
            <div class="oc-user-name" id="oc-user-name"></div>
          </div>
        </aside>

        <!-- MAIN -->
        <div class="oc-main">
          <!-- EVENT STATS HEADER -->
          <div class="oc-event-header">
            <div class="oc-cover-thumb" id="oc-cover-thumb">
              <img id="oc-cover-img" alt="">
            </div>
            <div class="oc-stats-strip">
              <div class="oc-stat">
                <div class="oc-stat-n" id="stat-guests">—</div>
                <div class="oc-stat-l">Confirmed</div>
              </div>
              <div class="oc-stat">
                <div class="oc-stat-n" id="stat-rooms">—</div>
                <div class="oc-stat-l">Rooms booked</div>
              </div>
              <div class="oc-stat">
                <div class="oc-stat-n" id="stat-budget">—</div>
                <div class="oc-stat-l">Total budget</div>
              </div>
              <div class="oc-stat">
                <div class="oc-stat-n" id="stat-days">—</div>
                <div class="oc-stat-l">Days to event</div>
              </div>
            </div>
            <div class="oc-header-actions">
              <button class="btn" onclick="OctHeader.go('event-settings')">Settings</button>
            </div>
          </div>
    `;

    // Close the layout divs after main content
    // We need to wrap main content — do this by finding the existing <main> tag
    // and wrapping it. We append the closing divs to app-header.
    const closingDiv = document.createElement('div');
    closingDiv.id = 'oc-main-wrapper';
    appHeader.appendChild(closingDiv);

    // Populate sidebar nav
    const sidebarNav = document.getElementById('oc-sidebar-nav');
    if (sidebarNav) {
      this.TABS.forEach(function(t) {
        var btn = document.createElement('button');
        btn.className = 'oc-nav-item' + (t.key === activeTab ? ' active' : '');
        btn.innerHTML = t.icon + '<span>' + t.label + '</span>';
        btn.addEventListener('click', function() { self.go('event-' + t.key); });
        sidebarNav.appendChild(btn);
      });
    }

    // Populate drawer nav
    const drawerNav = document.getElementById('oc-drawer-nav');
    if (drawerNav) {
      this.TABS.forEach(function(t) {
        var btn = document.createElement('button');
        btn.className = 'oc-drawer-item' + (t.key === activeTab ? ' active' : '');
        btn.innerHTML = t.icon + '<span>' + t.label + '</span>';
        btn.addEventListener('click', function() { OctHeader.closeDrawer(); self.go('event-' + t.key); });
        drawerNav.appendChild(btn);
      });
    }

    // Wrap the main element inside oc-main
    const mainEl = document.querySelector('main');
    if (mainEl) {
      const ocMain = document.querySelector('.oc-main');
      if (ocMain) {
        ocMain.appendChild(mainEl);
        // Close layout divs
        ocMain.insertAdjacentHTML('afterend', '</div></div>');
      }
    }
  },

  async load() {
    const eventId = new URLSearchParams(location.search).get('id');
    if (!eventId) { location.href = '/dashboard'; return null; }

    const {data: ev, error} = await sb.from('events').select('*').eq('id', eventId).single();
    if (error || !ev) { location.href = '/dashboard'; return null; }
    currentEvent = ev;
    document.title = ev.name + ' — Octevent';

    // Sidebar event info
    const nameEl = document.getElementById('oc-event-name');
    if (nameEl) nameEl.textContent = ev.name;

    const drawerName = document.getElementById('oc-drawer-event-name');
    if (drawerName) drawerName.textContent = ev.name;

    const dateEl = document.getElementById('oc-event-date');
    if (dateEl && ev.event_date) {
      const d2 = ev.end_date && ev.end_date !== ev.event_date ? ' — ' + fmtDate(ev.end_date) : '';
      dateEl.textContent = fmtDate(ev.event_date) + d2;
    }

    const now = new Date(); now.setHours(0,0,0,0);
    const ed = ev.event_date ? new Date(ev.event_date) : null;
    if (ed) ed.setHours(0,0,0,0);
    const diff = ed ? Math.round((ed - now) / 86400000) : null;
    const status = diff === null ? 'upcoming' : diff > 1 ? 'upcoming' : diff >= 0 ? 'live' : 'past';
    const statusEl = document.getElementById('oc-event-status');
    if (statusEl) {
      statusEl.textContent = status.charAt(0).toUpperCase() + status.slice(1);
      statusEl.className = 'oc-event-status oc-status-' + status;
    }

    // Days
    const daysEl = document.getElementById('stat-days');
    if (daysEl) {
      if (diff === null) daysEl.textContent = '—';
      else if (diff === 0) { daysEl.textContent = 'Today'; daysEl.style.color = 'var(--amber-dark)'; }
      else if (diff > 0) { daysEl.textContent = diff; if (diff <= 7) daysEl.style.color = 'var(--amber-dark)'; }
      else daysEl.textContent = 'Past';
    }

    // Cover image
    if (ev.cover_image) {
      const thumb = document.getElementById('oc-cover-thumb');
      const img = document.getElementById('oc-cover-img');
      if (thumb && img) { img.src = ev.cover_image; thumb.classList.add('visible'); }
    }

    // Live stats
    const [gRes, rRes, bRes] = await Promise.all([
      sb.from('guests').select('rsvp_status').eq('event_id', eventId),
      sb.from('rooms').select('status').eq('event_id', eventId),
      sb.from('budget_items').select('actual_amount').eq('event_id', eventId),
    ]);
    const guests = gRes.data || [];
    const rooms  = rRes.data || [];
    const budget = bRes.data || [];
    const confirmed   = guests.filter(function(g) { return g.rsvp_status === 'confirmed'; }).length;
    const bookedRooms = rooms.filter(function(r) { return r.status !== 'available'; }).length;
    const totalBudget = budget.reduce(function(s, i) { return s + parseFloat(i.actual_amount || 0); }, 0);

    const gEl = document.getElementById('stat-guests');
    if (gEl) gEl.textContent = confirmed + ' / ' + guests.length;
    const rEl = document.getElementById('stat-rooms');
    if (rEl) rEl.textContent = bookedRooms + ' / ' + rooms.length;
    const bEl = document.getElementById('stat-budget');
    if (bEl) bEl.textContent = totalBudget > 0 ? '€' + totalBudget.toLocaleString('en-GB', {minimumFractionDigits:2, maximumFractionDigits:2}) : '€0';

    return ev;
  },

  async init(activeTab) {
    this.inject(activeTab);
    const {data: {session}} = await sb.auth.getSession();
    if (!session) { location.href = '/login'; return null; }
    const name = session.user.user_metadata?.full_name || session.user.email.split('@')[0];
    const av = document.getElementById('oc-avatar');
    if (av) av.textContent = name.charAt(0).toUpperCase();
    const avM = document.getElementById('oc-avatar-mobile');
    if (avM) avM.textContent = name.charAt(0).toUpperCase();
    const un = document.getElementById('oc-user-name');
    if (un) un.textContent = name;
    return await this.load();
  }
};
