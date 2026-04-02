// MusicWorld - Scroll Animations (Intersection Observer)
(function () {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all animated elements immediately
    document.querySelectorAll('[data-animate]').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  function observeAll() {
    document.querySelectorAll('[data-animate]:not(.is-visible)').forEach(function (el) {
      observer.observe(el);
    });
  }

  // Initial observe
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeAll);
  } else {
    observeAll();
  }

  // Re-observe after dynamic content is added (small delay)
  window.MWAnimations = {
    refresh: function () {
      setTimeout(observeAll, 50);
    }
  };
})();
