// ── OCTEVENT SHARED (planner side) ──
// Loaded by every planner page, after supabase-js.

const SUPABASE_URL = 'https://esjmzvhxbwcpslutprel.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzam16dmh4YndjcHNsdXRwcmVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNzcxNjAsImV4cCI6MjA5Mzc1MzE2MH0.fsr1_P_ZB68SaiK00GPXvJLQUePM4eLght_CaAYOeF0';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const IMAGE_BUCKET = 'event-images';

const EVENT_TYPES = {
  retreat: 'Retreat',
  wedding: 'Wedding',
  group_holiday: 'Group holiday',
  corporate: 'Corporate offsite',
  other: 'Other'
};

// Dietary options guests can tick (keep in sync with DIETS in guest.html)
const DIETS = ['Vegetarian', 'Vegan', 'Pescatarian', 'Gluten-free', 'Dairy-free', 'Nut allergy', 'Halal', 'Kosher'];

// ── HELPERS ──
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function qs(name) { return new URLSearchParams(location.search).get(name); }

function fmtDate(d, withYear) {
  if (!d) return '';
  const [y, m, day] = d.split('-').map(Number);
  const opts = { day: 'numeric', month: 'short' };
  if (withYear !== false) opts.year = 'numeric';
  return new Date(y, m - 1, day).toLocaleDateString('en-GB', opts);
}
function fmtDateRange(start, end) {
  if (!start) return 'Dates not set';
  if (!end || end === start) return fmtDate(start);
  const sameYear = start.slice(0, 4) === end.slice(0, 4);
  return fmtDate(start, !sameYear) + ' – ' + fmtDate(end);
}
function fmtEuro(n) {
  const v = Number(n || 0);
  return '€' + v.toLocaleString('en-GB', { minimumFractionDigits: v % 1 ? 2 : 0, maximumFractionDigits: 2 });
}
function daysUntil(d) {
  if (!d) return null;
  const [y, m, day] = d.split('-').map(Number);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return Math.round((new Date(y, m - 1, day) - today) / 86400000);
}

let _toastTimer;
function toast(msg, isError) {
  let el = document.getElementById('toast');
  if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; document.body.appendChild(el); }
  el.textContent = msg;
  el.classList.toggle('error', !!isError);
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), isError ? 5000 : 2500);
}

// ── AUTH ──
// Returns the logged-in user, or sends them to /login.
async function requireUser() {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) { location.href = '/login'; return null; }
  return session.user;
}
function userName(user) {
  return (user.user_metadata && (user.user_metadata.full_name || user.user_metadata.name)) || user.email.split('@')[0];
}
async function signOut() {
  await sb.auth.signOut();
  location.href = '/login';
}

// ── IMAGES ──
// Shrinks a photo to max 1600px wide JPEG before upload (faster guest pages).
function resizeImage(file, maxSize) {
  maxSize = maxSize || 1600;
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/') || file.type === 'image/gif') return resolve(file);
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => resolve(blob || file), 'image/jpeg', 0.85);
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
    img.src = url;
  });
}
// Uploads to event-images/<userId>/<eventId>/<name>.jpg and returns the public URL.
async function uploadImage(file, userId, eventId) {
  if (file.size > 20 * 1024 * 1024) throw new Error('That image is too large (max 20 MB).');
  const blob = await resizeImage(file);
  const path = userId + '/' + eventId + '/' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.jpg';
  const { error } = await sb.storage.from(IMAGE_BUCKET).upload(path, blob, { contentType: 'image/jpeg', upsert: false });
  if (error) throw error;
  return sb.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}
// Best-effort delete of an image we uploaded (ignores errors).
async function deleteImage(publicUrl) {
  const marker = '/' + IMAGE_BUCKET + '/';
  const i = (publicUrl || '').indexOf(marker);
  if (i === -1) return;
  await sb.storage.from(IMAGE_BUCKET).remove([decodeURIComponent(publicUrl.slice(i + marker.length))]);
}

// ── ICONS (stroke SVGs, inherit colour) ──
const ICON = {
  details: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  rooms: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><line x1="2" y1="17" x2="22" y2="17"/><path d="M8 10V8h8v2"/></svg>',
  guests: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  bookings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>',
  site: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  events: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
  up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>',
  down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>',
  bed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><line x1="2" y1="17" x2="22" y2="17"/></svg>',
  person: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  burger: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>'
};

// ── LAYOUT ──
// Builds the sidebar + mobile top bar around the page's <main class="main">.
// active: 'events' | 'details' | 'rooms' | 'site' ; event: the current event row (or null)
const Layout = {
  render(active, user, event) {
    const name = userName(user);
    const eid = event ? event.id : null;
    const link = (key, href, label, soon) => soon
      ? '<span class="sb-link soon">' + ICON[key] + label + '<small>Soon</small></span>'
      : '<a class="sb-link' + (active === key ? ' active' : '') + '" href="' + href + '">' + ICON[key] + label + '</a>';

    let nav;
    if (event) {
      nav =
        link('details', '/event-details?id=' + eid, 'Event details') +
        link('rooms', '/event-rooms?id=' + eid, 'Rooms') +
        link('site', '/event-site?id=' + eid, 'Guest site') +
        link('guests', '/event-guests?id=' + eid, 'Guests') +
        link('bookings', '#', 'Bookings', true) +
        '<div class="sb-divider"></div>' +
        '<a class="sb-link" href="/dashboard">' + ICON.back + 'All events</a>';
    } else {
      nav = link('events', '/dashboard', 'My events');
    }

    const sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';
    sidebar.id = 'sidebar';
    sidebar.innerHTML =
      '<div class="sb-logo"><a href="/dashboard"><img src="/octevent-logo.png" alt="Octevent"></a></div>' +
      (event ? '<div class="sb-event"><div class="sb-event-name" id="sb-event-name">' + esc(event.name) + '</div>' +
               '<div class="sb-event-date" id="sb-event-date">' + esc(fmtDateRange(event.start_date, event.end_date)) + '</div></div>' : '') +
      '<nav class="sb-nav">' + nav + '</nav>' +
      '<div class="sb-foot"><div class="avatar">' + esc(name.charAt(0).toUpperCase()) + '</div>' +
      '<div class="sb-user"><div class="sb-user-name">' + esc(name) + '</div>' +
      '<button class="sb-signout" onclick="signOut()">Sign out</button></div></div>';

    const topbar = document.createElement('div');
    topbar.className = 'topbar';
    topbar.innerHTML = '<button class="burger" aria-label="Menu" onclick="Layout.toggle(true)">' + ICON.burger + '</button>' +
      '<a href="/dashboard"><img src="/octevent-logo.png" alt="Octevent"></a><span style="width:22px"></span>';

    const backdrop = document.createElement('div');
    backdrop.className = 'backdrop';
    backdrop.id = 'backdrop';
    backdrop.onclick = () => Layout.toggle(false);

    const app = document.createElement('div');
    app.className = 'app';
    const main = document.querySelector('main.main');
    main.parentNode.insertBefore(app, main);
    app.appendChild(sidebar);
    app.appendChild(backdrop);
    main.insertBefore(topbar, main.firstChild);
    app.appendChild(main);
  },
  toggle(open) {
    document.getElementById('sidebar').classList.toggle('open', open);
    document.getElementById('backdrop').classList.toggle('open', open);
  },
  updateEvent(event) {
    const n = document.getElementById('sb-event-name');
    const d = document.getElementById('sb-event-date');
    if (n) n.textContent = event.name;
    if (d) d.textContent = fmtDateRange(event.start_date, event.end_date);
  }
};

// Loads the event from ?id=, or returns to the dashboard if it can't.
async function loadEventOrLeave() {
  const id = qs('id');
  if (!id) { location.href = '/dashboard'; return null; }
  const { data, error } = await sb.from('events').select('*').eq('id', id).maybeSingle();
  if (error || !data) { location.href = '/dashboard'; return null; }
  return data;
}
