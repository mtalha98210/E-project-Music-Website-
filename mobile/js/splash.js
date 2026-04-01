// MusicWorld - Splash Screen
(function () {
  const MIN_DISPLAY = 1000;
  const MAX_DISPLAY = 3000;

  function hideSplash() {
    const splash = document.getElementById('splash-screen');
    if (!splash) return;
    splash.classList.add('splash--fade-out');
    splash.addEventListener('transitionend', () => splash.remove(), { once: true });
  }

  const start = Date.now();
  let hidden = false;

  function tryHide() {
    if (hidden) return;
    hidden = true;
    hideSplash();
  }

  // Hard cap at MAX_DISPLAY
  setTimeout(tryHide, MAX_DISPLAY);

  window.addEventListener('load', function () {
    const elapsed = Date.now() - start;
    const delay = Math.max(0, MIN_DISPLAY - elapsed);
    setTimeout(tryHide, delay);
  });
})();
