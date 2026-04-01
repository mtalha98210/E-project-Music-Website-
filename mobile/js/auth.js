// MusicWorld - Auth Module (localStorage simulation)
window.Auth = (function () {
  var USERS_KEY = 'mw_users';
  var SESSION_KEY = 'mw_session';
  var _memUsers = [];
  var _memSession = null;
  var useMemory = false;

  function getUsers() {
    if (useMemory) return _memUsers;
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    } catch (e) { useMemory = true; return _memUsers; }
  }

  function saveUsers(users) {
    if (useMemory) { _memUsers = users; return; }
    try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }
    catch (e) { useMemory = true; _memUsers = users; }
  }

  function getSession() {
    if (useMemory) return _memSession;
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
    catch (e) { useMemory = true; return _memSession; }
  }

  function saveSession(session) {
    if (useMemory) { _memSession = session; return; }
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); }
    catch (e) { useMemory = true; _memSession = session; }
  }

  function hashPassword(pw) {
    return btoa(unescape(encodeURIComponent(pw)));
  }

  function generateId() {
    return 'u-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
  }

  function updateNavbar() {
    var session = getSession();
    var loginBtn = document.getElementById('nav-login-btn');
    var userInfo = document.getElementById('nav-user-info');
    var userName = document.getElementById('nav-username');
    if (session) {
      if (loginBtn) loginBtn.classList.add('d-none');
      if (userInfo) userInfo.classList.remove('d-none');
      if (userName) userName.textContent = session.username;
    } else {
      if (loginBtn) loginBtn.classList.remove('d-none');
      if (userInfo) userInfo.classList.add('d-none');
    }
  }

  return {
    register: function (username, email, password) {
      if (!username || !email || !password) return { ok: false, error: 'All fields are required.' };
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Invalid email address.' };
      var users = getUsers();
      if (users.find(function (u) { return u.email === email; })) {
        return { ok: false, error: 'Email already registered.' };
      }
      var user = { id: generateId(), username: username, email: email, passwordHash: hashPassword(password), createdAt: new Date().toISOString() };
      users.push(user);
      saveUsers(users);
      var session = { userId: user.id, username: user.username, email: user.email, loggedInAt: new Date().toISOString() };
      saveSession(session);
      updateNavbar();
      return { ok: true };
    },

    login: function (email, password) {
      if (!email || !password) return { ok: false, error: 'All fields are required.' };
      var users = getUsers();
      var user = users.find(function (u) { return u.email === email; });
      if (!user || user.passwordHash !== hashPassword(password)) {
        return { ok: false, error: 'Invalid email or password.' };
      }
      var session = { userId: user.id, username: user.username, email: user.email, loggedInAt: new Date().toISOString() };
      saveSession(session);
      updateNavbar();
      return { ok: true };
    },

    logout: function () {
      if (useMemory) { _memSession = null; }
      else { try { localStorage.removeItem(SESSION_KEY); } catch (e) { _memSession = null; } }
      updateNavbar();
    },

    currentUser: function () { return getSession(); },
    isLoggedIn: function () { return !!getSession(); },
    updateNavbar: updateNavbar
  };
})();

document.addEventListener('DOMContentLoaded', function () {
  Auth.updateNavbar();

  // Wire auth modal forms
  var loginForm = document.getElementById('login-form');
  var registerForm = document.getElementById('register-form');

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('login-email').value.trim();
      var password = document.getElementById('login-password').value;
      var result = Auth.login(email, password);
      var errEl = document.getElementById('login-error');
      if (!result.ok) {
        if (errEl) { errEl.textContent = result.error; errEl.classList.remove('d-none'); }
      } else {
        if (errEl) errEl.classList.add('d-none');
        var modal = bootstrap.Modal.getInstance(document.getElementById('auth-modal'));
        if (modal) modal.hide();
        loginForm.reset();
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var username = document.getElementById('reg-username').value.trim();
      var email = document.getElementById('reg-email').value.trim();
      var password = document.getElementById('reg-password').value;
      var confirm = document.getElementById('reg-confirm').value;
      var errEl = document.getElementById('register-error');
      if (password !== confirm) {
        if (errEl) { errEl.textContent = 'Passwords do not match.'; errEl.classList.remove('d-none'); }
        return;
      }
      var result = Auth.register(username, email, password);
      if (!result.ok) {
        if (errEl) { errEl.textContent = result.error; errEl.classList.remove('d-none'); }
      } else {
        if (errEl) errEl.classList.add('d-none');
        var modal = bootstrap.Modal.getInstance(document.getElementById('auth-modal'));
        if (modal) modal.hide();
        registerForm.reset();
      }
    });
  }
});
