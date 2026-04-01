// MusicWorld - UI Music Player
window.MWPlayer = (function () {
  var state = {
    currentTrack: null,
    isPlaying: false,
    volume: 0.8,
    queue: []
  };

  function canPlay() { return true; }

  function updateDOM() {
    var titleEl = document.getElementById('player-title');
    var artistEl = document.getElementById('player-artist');
    var playBtn = document.getElementById('player-play-btn');
    var artEl = document.getElementById('player-art');

    if (state.currentTrack) {
      if (titleEl) titleEl.textContent = state.currentTrack.title || 'Unknown Track';
      if (artistEl) artistEl.textContent = state.currentTrack.artist || 'Unknown Artist';
      if (artEl && state.currentTrack.cover) artEl.src = state.currentTrack.cover;
    }
    if (playBtn) {
      playBtn.innerHTML = state.isPlaying
        ? '<i class="fas fa-pause"></i>'
        : '<i class="fas fa-play"></i>';
    }
    var bar = document.getElementById('music-player');
    if (bar) bar.classList.toggle('player--active', !!state.currentTrack);
  }

  function play(track) {
    if (track) state.currentTrack = track;
    state.isPlaying = true;
    updateDOM();
  }

  function pause() {
    state.isPlaying = false;
    updateDOM();
  }

  function toggle() {
    if (state.isPlaying) pause(); else play();
  }

  function skip(direction) {
    if (!state.queue.length) return;
    var idx = state.queue.findIndex(function (t) {
      return state.currentTrack && t.id === state.currentTrack.id;
    });
    var next = direction === 'next'
      ? (idx + 1) % state.queue.length
      : (idx - 1 + state.queue.length) % state.queue.length;
    play(state.queue[next]);
  }

  function setVolume(val) {
    state.volume = Math.min(1, Math.max(0, parseFloat(val)));
    var volSlider = document.getElementById('player-volume');
    if (volSlider) volSlider.value = state.volume;
  }

  function setQueue(tracks) { state.queue = tracks || []; }

  document.addEventListener('DOMContentLoaded', function () {
    var playBtn = document.getElementById('player-play-btn');
    var prevBtn = document.getElementById('player-prev-btn');
    var nextBtn = document.getElementById('player-next-btn');
    var volSlider = document.getElementById('player-volume');

    if (playBtn) playBtn.addEventListener('click', toggle);
    if (prevBtn) prevBtn.addEventListener('click', function () { skip('prev'); });
    if (nextBtn) nextBtn.addEventListener('click', function () { skip('next'); });
    if (volSlider) volSlider.addEventListener('input', function () { setVolume(this.value); });

    // Wire all play buttons on the page
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-play]');
      if (!btn) return;
      var trackData = {
        id: btn.dataset.play,
        title: btn.dataset.title || 'Unknown Track',
        artist: btn.dataset.artist || 'Unknown Artist',
        cover: btn.dataset.cover || ''
      };
      play(trackData);
    });

    // Wire download buttons
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-download]');
      if (!btn) return;
      if (!Auth.isLoggedIn()) {
        var modal = new bootstrap.Modal(document.getElementById('auth-modal'));
        // Switch to register tab
        var regTab = document.getElementById('register-tab');
        if (regTab) regTab.click();
        modal.show();
        var msg = document.getElementById('auth-prompt-msg');
        if (msg) { msg.textContent = 'Please register or log in to download albums.'; msg.classList.remove('d-none'); }
      } else {
        var toast = document.getElementById('download-toast');
        if (toast) {
          var bsToast = new bootstrap.Toast(toast);
          bsToast.show();
        }
      }
    });
  });

  return { play: play, pause: pause, toggle: toggle, skip: skip, setVolume: setVolume, setQueue: setQueue, canPlay: canPlay, getState: function () { return state; } };
})();
