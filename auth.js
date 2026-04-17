/**
 * SujetsNiger — Authentification
 */
const Auth = (() => {
  function isLoggedIn() { return !!DB.getSession(); }
  function isAdmin() { const s = DB.getSession(); return s && s.role === 'admin'; }
  function currentUser() { return DB.getSession(); }

  function login(email, password) {
    const user = DB.getUserByEmail(email);
    if (!user) return { ok: false, msg: 'Aucun compte trouvé avec cet email.' };
    if (user.password !== password) return { ok: false, msg: 'Mot de passe incorrect.' };
    DB.setSession(user);
    return { ok: true, user };
  }

  function register(data) {
    if (DB.getUserByEmail(data.email)) return { ok: false, msg: 'Un compte existe déjà avec cet email.' };
    if (data.password.length < 6) return { ok: false, msg: 'Le mot de passe doit contenir au moins 6 caractères.' };
    const user = DB.addUser(data);
    DB.setSession(user);
    return { ok: true, user };
  }

  function logout() {
    DB.clearSession();
    window.location.href = getRootPath() + 'index.html';
  }

  function requireAuth() {
    if (!isLoggedIn()) {
      window.location.href = getRootPath() + 'pages/login.html?redirect=' + encodeURIComponent(window.location.href);
      return false;
    }
    return true;
  }

  function requireAdmin() {
    if (!isAdmin()) {
      window.location.href = getRootPath() + 'index.html';
      return false;
    }
    return true;
  }

  function getRootPath() {
    const path = window.location.pathname;
    return path.includes('/pages/') || path.includes('/admin/') ? '../' : './';
  }

  return { isLoggedIn, isAdmin, currentUser, login, register, logout, requireAuth, requireAdmin, getRootPath };
})();
