/**
 * SujetsNiger — Base de données locale (localStorage)
 */
const DB = (() => {

  const KEYS = {
    USERS: 'sn_users',
    SUJETS: 'sn_sujets',
    SESSION: 'sn_session',
    DOWNLOADS: 'sn_downloads'
  };

  // ── Seed data ──
  const DEFAULT_SUJETS = [
    { id: 1, type: 'examen', niveau: 'BAC', matiere: 'Mathématiques', annee: 2023, serie: 'D', titre: 'BAC Mathématiques Série D 2023', description: 'Épreuve officielle du Baccalauréat, série D (Sciences)', sujet_url: '#', correction_url: '#', createdAt: '2024-01-10', downloads: 842 },
    { id: 2, type: 'examen', niveau: 'BAC', matiere: 'Physique-Chimie', annee: 2023, serie: 'D', titre: 'BAC Physique-Chimie Série D 2023', description: 'Épreuve officielle du Baccalauréat, série D', sujet_url: '#', correction_url: '#', createdAt: '2024-01-10', downloads: 731 },
    { id: 3, type: 'examen', niveau: 'BAC', matiere: 'Français', annee: 2023, serie: 'A', titre: 'BAC Français Série A 2023', description: 'Épreuve de Français, Baccalauréat série A', sujet_url: '#', correction_url: '#', createdAt: '2024-01-11', downloads: 618 },
    { id: 4, type: 'examen', niveau: 'BAC', matiere: 'Histoire-Géographie', annee: 2022, serie: 'A', titre: 'BAC Histoire-Géographie Série A 2022', description: 'Épreuve officielle session 2022', sujet_url: '#', correction_url: '#', createdAt: '2023-12-05', downloads: 504 },
    { id: 5, type: 'examen', niveau: 'BEPC', matiere: 'Mathématiques', annee: 2023, serie: '', titre: 'BEPC Mathématiques 2023', description: 'Brevet d\'Études du Premier Cycle, session 2023', sujet_url: '#', correction_url: '#', createdAt: '2024-01-12', downloads: 1240 },
    { id: 6, type: 'examen', niveau: 'BEPC', matiere: 'Français', annee: 2023, serie: '', titre: 'BEPC Français 2023', description: 'Épreuve de rédaction et de grammaire', sujet_url: '#', correction_url: '#', createdAt: '2024-01-12', downloads: 980 },
    { id: 7, type: 'examen', niveau: 'BEPC', matiere: 'Sciences de la Vie', annee: 2022, serie: '', titre: 'BEPC SVT 2022', description: 'Sciences de la Vie et de la Terre', sujet_url: '#', correction_url: '#', createdAt: '2023-11-20', downloads: 765 },
    { id: 8, type: 'concours', niveau: 'Fonction Publique', matiere: 'Culture Générale', annee: 2023, serie: 'ENA', titre: 'Concours ENA 2023 — Culture Générale', description: 'École Nationale d\'Administration, épreuve de culture générale', sujet_url: '#', correction_url: '#', createdAt: '2024-02-01', downloads: 2100 },
    { id: 9, type: 'concours', niveau: 'Fonction Publique', matiere: 'Droit Administratif', annee: 2022, serie: 'ENA', titre: 'Concours ENA 2022 — Droit Administratif', description: 'Épreuve de droit administratif', sujet_url: '#', correction_url: '#', createdAt: '2023-10-15', downloads: 1890 },
    { id: 10, type: 'concours', niveau: 'Fonction Publique', matiere: 'Culture Générale', annee: 2023, serie: 'Douanes', titre: 'Concours Douanes Niger 2023', description: 'Recrutement agents des Douanes', sujet_url: '#', correction_url: '#', createdAt: '2024-01-20', downloads: 3200 },
    { id: 11, type: 'concours', niveau: 'Fonction Publique', matiere: 'Mathématiques', annee: 2022, serie: 'Police', titre: 'Concours Police Nationale 2022', description: 'Épreuve de mathématiques, recrutement Police', sujet_url: '#', correction_url: '#', createdAt: '2023-09-10', downloads: 2800 },
    { id: 12, type: 'examen', niveau: 'BAC', matiere: 'Mathématiques', annee: 2022, serie: 'D', titre: 'BAC Mathématiques Série D 2022', description: 'Session 2022, épreuve officielle', sujet_url: '#', correction_url: '#', createdAt: '2023-08-15', downloads: 1100 },
    { id: 13, type: 'examen', niveau: 'BEP', matiere: 'Technologie', annee: 2023, serie: '', titre: 'BEP Technologie 2023', description: 'Brevet d\'Études Professionnelles, technologie', sujet_url: '#', correction_url: '#', createdAt: '2024-01-08', downloads: 430 },
    { id: 14, type: 'examen', niveau: 'CAP', matiere: 'Français', annee: 2023, serie: '', titre: 'CAP Français 2023', description: 'Certificat d\'Aptitude Professionnelle, épreuve de Français', sujet_url: '#', correction_url: '#', createdAt: '2024-01-08', downloads: 390 },
    { id: 15, type: 'concours', niveau: 'Université', matiere: 'Sciences', annee: 2023, serie: 'UAM', titre: 'Concours entrée UAM 2023', description: 'Université Abdou Moumouni de Niamey', sujet_url: '#', correction_url: '#', createdAt: '2024-02-10', downloads: 1560 },
    { id: 16, type: 'examen', niveau: 'BAC', matiere: 'Anglais', annee: 2023, serie: 'A', titre: 'BAC Anglais Série A 2023', description: 'Épreuve d\'Anglais — Séries littéraires', sujet_url: '#', correction_url: '#', createdAt: '2024-01-13', downloads: 720 },
    { id: 17, type: 'examen', niveau: 'BEPC', matiere: 'Anglais', annee: 2022, serie: '', titre: 'BEPC Anglais 2022', description: 'Épreuve d\'Anglais, BEPC session 2022', sujet_url: '#', correction_url: '#', createdAt: '2023-07-10', downloads: 680 },
    { id: 18, type: 'concours', niveau: 'Grandes Écoles', matiere: 'Mathématiques', annee: 2022, serie: 'ECPN', titre: 'Concours ECPN 2022 — Mathématiques', description: 'École de Formation de la Police Nationale', sujet_url: '#', correction_url: '#', createdAt: '2023-06-20', downloads: 1900 },
  ];

  const DEFAULT_ADMIN = {
    id: 'admin',
    nom: 'Administrateur',
    prenom: 'Super',
    email: 'admin@sujetsniger.ne',
    password: 'admin123',
    role: 'admin',
    createdAt: '2024-01-01'
  };

  // ── Init ──
  function init() {
    if (!localStorage.getItem(KEYS.SUJETS)) {
      localStorage.setItem(KEYS.SUJETS, JSON.stringify(DEFAULT_SUJETS));
    }
    if (!localStorage.getItem(KEYS.USERS)) {
      localStorage.setItem(KEYS.USERS, JSON.stringify([DEFAULT_ADMIN]));
    }
    if (!localStorage.getItem(KEYS.DOWNLOADS)) {
      localStorage.setItem(KEYS.DOWNLOADS, JSON.stringify([]));
    }
  }

  // ── Users ──
  function getUsers() {
    return JSON.parse(localStorage.getItem(KEYS.USERS) || '[]');
  }
  function saveUsers(users) {
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
  }
  function addUser(user) {
    const users = getUsers();
    user.id = 'u_' + Date.now();
    user.role = 'user';
    user.createdAt = new Date().toISOString().split('T')[0];
    users.push(user);
    saveUsers(users);
    return user;
  }
  function getUserByEmail(email) {
    return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
  }
  function getUserById(id) {
    return getUsers().find(u => u.id === id);
  }

  // ── Session ──
  function getSession() {
    const s = localStorage.getItem(KEYS.SESSION);
    return s ? JSON.parse(s) : null;
  }
  function setSession(user) {
    const session = { id: user.id, nom: user.nom, prenom: user.prenom, email: user.email, role: user.role };
    localStorage.setItem(KEYS.SESSION, JSON.stringify(session));
    return session;
  }
  function clearSession() {
    localStorage.removeItem(KEYS.SESSION);
  }

  // ── Sujets ──
  function getSujets() {
    return JSON.parse(localStorage.getItem(KEYS.SUJETS) || '[]');
  }
  function saveSujets(sujets) {
    localStorage.setItem(KEYS.SUJETS, JSON.stringify(sujets));
  }
  function addSujet(sujet) {
    const sujets = getSujets();
    const maxId = sujets.length > 0 ? Math.max(...sujets.map(s => s.id)) : 0;
    sujet.id = maxId + 1;
    sujet.createdAt = new Date().toISOString().split('T')[0];
    sujet.downloads = 0;
    sujets.unshift(sujet);
    saveSujets(sujets);
    return sujet;
  }
  function updateSujet(id, data) {
    const sujets = getSujets();
    const idx = sujets.findIndex(s => s.id === parseInt(id));
    if (idx !== -1) { sujets[idx] = { ...sujets[idx], ...data }; saveSujets(sujets); return sujets[idx]; }
    return null;
  }
  function deleteSujet(id) {
    const sujets = getSujets().filter(s => s.id !== parseInt(id));
    saveSujets(sujets);
  }
  function getSujetById(id) {
    return getSujets().find(s => s.id === parseInt(id));
  }

  function searchSujets(query = {}) {
    let sujets = getSujets();
    if (query.q) {
      const q = query.q.toLowerCase();
      sujets = sujets.filter(s =>
        s.titre.toLowerCase().includes(q) ||
        s.matiere.toLowerCase().includes(q) ||
        s.niveau.toLowerCase().includes(q) ||
        s.type.toLowerCase().includes(q) ||
        (s.serie && s.serie.toLowerCase().includes(q))
      );
    }
    if (query.type) sujets = sujets.filter(s => s.type === query.type);
    if (query.niveau) sujets = sujets.filter(s => s.niveau === query.niveau);
    if (query.matiere) sujets = sujets.filter(s => s.matiere === query.matiere);
    if (query.annee) sujets = sujets.filter(s => s.annee == query.annee);
    return sujets;
  }

  // ── Downloads ──
  function logDownload(userId, sujetId, fileType) {
    const logs = JSON.parse(localStorage.getItem(KEYS.DOWNLOADS) || '[]');
    logs.push({ userId, sujetId, fileType, date: new Date().toISOString() });
    localStorage.setItem(KEYS.DOWNLOADS, JSON.stringify(logs));
    // increment counter
    const sujets = getSujets();
    const s = sujets.find(x => x.id === parseInt(sujetId));
    if (s) { s.downloads = (s.downloads || 0) + 1; saveSujets(sujets); }
  }
  function getDownloads() {
    return JSON.parse(localStorage.getItem(KEYS.DOWNLOADS) || '[]');
  }

  // ── Stats ──
  function getStats() {
    const sujets = getSujets();
    const users = getUsers().filter(u => u.role === 'user');
    const matieres = [...new Set(sujets.map(s => s.matiere))];
    const totalDownloads = sujets.reduce((acc, s) => acc + (s.downloads || 0), 0);
    return { sujets: sujets.length, users: users.length, matieres: matieres.length, downloads: totalDownloads };
  }

  init();

  return {
    getUsers, addUser, getUserByEmail, getUserById, saveUsers,
    getSession, setSession, clearSession,
    getSujets, addSujet, updateSujet, deleteSujet, getSujetById, searchSujets,
    logDownload, getDownloads,
    getStats
  };
})();
