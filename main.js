/**
 * SujetsNiger — Utilitaires globaux
 */

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ── Burger menu ──
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ── Update nav based on session ──
function updateNav() {
  const session = DB.getSession();
  const links = document.getElementById('navLinks');
  if (!links) return;

  const root = Auth.getRootPath();

  if (session) {
    const loginLink = links.querySelector('a[href*="login"]');
    const registerLink = links.querySelector('a[href*="register"]');
    if (loginLink) loginLink.remove();
    if (registerLink) {
      registerLink.textContent = session.prenom || session.nom;
      registerLink.href = root + (session.role === 'admin' ? 'dashboard.html' : 'dashboard.html');
    }
    // Add logout
    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'btn-outline';
    logoutBtn.style.cssText = 'cursor:pointer;font-family:inherit;font-size:.95rem;';
    logoutBtn.textContent = 'Déconnexion';
    logoutBtn.onclick = Auth.logout;
    links.appendChild(logoutBtn);
  }
}
updateNav();

// ── Toast notifications ──
function showToast(msg, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  toast.innerHTML = `<span>${icons[type]||'ℹ️'}</span> ${msg}`;
  toast.style.cssText = `
    position:fixed;bottom:24px;right:24px;z-index:9999;
    background:${type==='error'?'#fee2e2':type==='success'?'#d1fae5':'#dbeafe'};
    color:${type==='error'?'#991b1b':type==='success'?'#065f46':'#1e40af'};
    border:1.5px solid ${type==='error'?'#fca5a5':type==='success'?'#6ee7b7':'#93c5fd'};
    padding:14px 20px;border-radius:12px;font-weight:600;font-size:.9rem;
    display:flex;align-items:center;gap:10px;box-shadow:0 8px 32px rgba(0,0,0,.15);
    animation:slideUp .3s ease;max-width:360px;
  `;
  const style = document.createElement('style');
  style.textContent = '@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}';
  document.head.appendChild(style);
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity='0'; toast.style.transition='opacity .3s'; setTimeout(()=>toast.remove(),300); }, 3500);
}

// ── Render sujet card ──
function renderSujetCard(sujet) {
  const session = DB.getSession();
  const root = Auth.getRootPath();
  const typeColor = sujet.type === 'examen' ? 'badge-blue' : 'badge-red';
  const typeLabel = sujet.type === 'examen' ? '📄 Examen' : '🏆 Concours';

  let downloadBtns = '';
  if (session) {
    downloadBtns = `
      <button class="btn-download" onclick="downloadFile(${sujet.id},'sujet')">⬇ Sujet</button>
      ${sujet.correction_url !== '#' || true ? `<button class="btn-download correction" onclick="downloadFile(${sujet.id},'correction')">✅ Correction</button>` : ''}
    `;
  } else {
    downloadBtns = `<a href="${root}login.html" class="btn-download">🔒 Connexion</a>`;
  }

  return `
    <div class="sujet-card">
      <div class="sujet-card-header">
        <div class="sujet-card-title">${sujet.titre}</div>
      </div>
      <div class="sujet-card-meta">
        <span class="badge ${typeColor}">${typeLabel}</span>
        <span class="badge badge-green">${sujet.niveau}</span>
        <span class="badge badge-yellow">${sujet.matiere}</span>
        ${sujet.serie ? `<span class="badge badge-purple">${sujet.serie}</span>` : ''}
      </div>
      <p style="font-size:.875rem;color:var(--text2)">${sujet.description}</p>
      <div class="sujet-card-footer">
        <span class="sujet-card-year">📅 ${sujet.annee} &nbsp;·&nbsp; ⬇ ${sujet.downloads || 0}</span>
        <div style="display:flex;gap:8px;flex-wrap:wrap">${downloadBtns}</div>
      </div>
    </div>
  `;
}

// ── Download handler ──
function downloadFile(sujetId, fileType) {
  const session = DB.getSession();
  if (!session) { showToast('Veuillez vous connecter pour télécharger', 'error'); return; }

  const sujet = DB.getSujetById(sujetId);
  if (!sujet) { showToast('Sujet introuvable', 'error'); return; }

  DB.logDownload(session.id, sujetId, fileType);
  showToast(`Téléchargement de "${sujet.titre}" (${fileType}) en cours...`, 'success');

  // Simulate download of a PDF
  const content = generateFakePDF(sujet, fileType);
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${sujet.titre.replace(/\s+/g,'-')}_${fileType}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function generateFakePDF(sujet, type) {
  const lines = [
    '='.repeat(60),
    `SUJETSNIGER — ${type.toUpperCase()}`,
    '='.repeat(60),
    '',
    `Titre     : ${sujet.titre}`,
    `Type      : ${sujet.type}`,
    `Niveau    : ${sujet.niveau}`,
    `Matière   : ${sujet.matiere}`,
    `Année     : ${sujet.annee}`,
    sujet.serie ? `Série     : ${sujet.serie}` : '',
    '',
    '-'.repeat(60),
    type === 'sujet'
      ? `\n[SUJET D'EXAMEN]\n\nCe fichier représente le sujet officiel de ${sujet.matiere}.\nEn production, un vrai PDF serait téléchargé ici.\n\nExercice 1 : ...\nExercice 2 : ...\nExercice 3 : ...`
      : `\n[CORRECTION OFFICIELLE]\n\nCe fichier représente la correction officielle de ${sujet.matiere}.\nEn production, un vrai PDF de correction serait téléchargé ici.\n\nSolution Exercice 1 : ...\nSolution Exercice 2 : ...\nSolution Exercice 3 : ...`,
    '',
    '-'.repeat(60),
    `© SujetsNiger — ${new Date().getFullYear()}`,
  ];
  return lines.join('\n');
}

// ── Countdown animation ──
function animateCount(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.round(start).toLocaleString('fr-FR');
    if (start >= target) clearInterval(timer);
  }, 16);
}
