// ── OCTEVENT SHARED ──
const SUPABASE_URL = 'https://esjmzvhxbwcpslutprel.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzam16dmh4YndjcHNsdXRwcmVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNzcxNjAsImV4cCI6MjA5Mzc1MzE2MH0.fsr1_P_ZB68SaiK00GPXvJLQUePM4eLght_CaAYOeF0';
const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);
const params = new URLSearchParams(location.search);
const eventId = params.get('id');
let currentEvent = null;

function fmtDate(d) {
  if (!d) return '—';
  const [y,m,dy] = d.split('-');
  return new Date(y,m-1,dy).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
}
function fmtTime(t) {
  if (!t) return '—';
  const [h,m] = t.split(':');
  const hr = parseInt(h);
  return (hr%12||12)+':'+m+' '+(hr<12?'am':'pm');
}
function fmtEuro(n) {
  const v = parseFloat(n||0);
  return v === 0 ? '—' : '€'+v.toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2});
}
function fmtSum(n) {
  return '€'+parseFloat(n||0).toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2});
}
function calcHours(s,f) {
  if (!s||!f) return '—';
  const [sh,sm]=s.split(':').map(Number),[fh,fm]=f.split(':').map(Number);
  const d=(fh*60+fm)-(sh*60+sm);
  if (d<=0) return '—';
  const h=Math.floor(d/60),mi=d%60;
  return h>0?(mi>0?h+'h '+mi+'m':h+'h'):mi+'m';
}

async function initAuth(callback) {
  const {data:{session}} = await sb.auth.getSession();
  if (!session) { location.href='/login'; return; }
  if (!eventId) { location.href='/dashboard'; return; }
  if (typeof callback === 'function') await callback(session);
}
