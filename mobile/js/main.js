// MusicWorld - App Bootstrap (no fetch, works on file://)
(function () {

  var GENRE_IMGS = {
    rock:      'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&q=80',
    jazz:      'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&q=80',
    pop:       'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80',
    rap:       'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
    classical: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&q=80'
  };

  var ALBUM_IMGS = [
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80',
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
    'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&q=80',
    'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&q=80'
  ];

  function getAlbumImg(album, idx) {
    var genre = (album.genreIds || [])[0];
    return GENRE_IMGS[genre] || ALBUM_IMGS[idx % ALBUM_IMGS.length];
  }

  function getArtistImg(artist, idx) {
    var genre = (artist.genreIds || [])[0];
    return GENRE_IMGS[genre] || ALBUM_IMGS[idx % ALBUM_IMGS.length];
  }

  function renderAlbumCard(album, idx, basePath) {
    basePath = basePath || 'pages/';
    var img = getAlbumImg(album, idx);
    var badge = album.isNewRelease
      ? '<span class="mw-badge mw-badge--new" style="position:absolute;top:8px;left:8px;z-index:2">New</span>'
      : album.isBestOfYear
      ? '<span class="mw-badge mw-badge--best" style="position:absolute;top:8px;left:8px;z-index:2">Best</span>'
      : '';
    return '<div class="swiper-slide">'
      + '<a href="' + basePath + 'album.html?id=' + album.id + '" class="text-decoration-none">'
      + '<div class="mw-card">'
      + '<div class="mw-card__img">' + badge
      + '<img src="' + img + '" alt="' + album.title + '" loading="lazy">'
      + '<div class="mw-card__overlay"><button class="btn-play" data-play="' + album.id + '" data-title="' + album.title + '" data-cover="' + img + '"><i class="fas fa-play"></i></button></div>'
      + '</div>'
      + '<div class="mw-card__body"><p class="mw-card__title">' + album.title + '</p>'
      + '<p class="mw-card__meta">' + (album.releaseDate ? album.releaseDate.slice(0, 4) : '') + '</p></div>'
      + '</div></a></div>';
  }

  function renderArtistCard(artist, idx, basePath) {
    basePath = basePath || 'pages/';
    var img = getArtistImg(artist, idx);
    return '<div class="swiper-slide">'
      + '<a href="' + basePath + 'artist.html?id=' + artist.id + '" class="text-decoration-none">'
      + '<div class="mw-card">'
      + '<div class="mw-card__img">'
      + '<img src="' + img + '" alt="' + artist.name + '" loading="lazy">'
      + '<div class="mw-card__overlay"><button class="btn-play"><i class="fas fa-user"></i></button></div>'
      + '</div>'
      + '<div class="mw-card__body"><p class="mw-card__title">' + artist.name + '</p>'
      + '<p class="mw-card__meta">' + (artist.origin || '') + '</p></div>'
      + '</div></a></div>';
  }

  function populateHomeSliders(basePath) {
    if (!window.MusicData) return;

    var nrw = document.querySelector('#slider-new-releases .swiper-wrapper');
    var boy = document.querySelector('#slider-best-of-year .swiper-wrapper');
    var tc  = document.querySelector('#slider-top-composers .swiper-wrapper');

    if (nrw) {
      var nr = MusicData.albums.filter(function(a) { return a.isNewRelease; });
      nrw.innerHTML = nr.map(function(a, i) { return renderAlbumCard(a, i, basePath); }).join('');
    }
    if (boy) {
      var by = MusicData.albums.filter(function(a) { return a.isBestOfYear; });
      boy.innerHTML = by.map(function(a, i) { return renderAlbumCard(a, i, basePath); }).join('');
    }
    if (tc) {
      var featured = MusicData.artists.filter(function(a) {
        return MusicData.albums.some(function(al) { return al.artistId === a.id && al.isFeatured; });
      });
      tc.innerHTML = featured.map(function(a, i) { return renderArtistCard(a, i, basePath); }).join('');
    }
  }

  function initNavbarSearch(basePath) {
    var form = document.getElementById('navbar-search-form');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var q = document.getElementById('navbar-search-input');
        if (q && q.value.trim()) {
          window.location.href = basePath + 'search.html?q=' + encodeURIComponent(q.value.trim());
        }
      });
    }
  }

  function updateNavbarAuth() {
    if (window.Auth) {
      Auth.updateNavbar();
      // Hide register link when logged in
      var regLink = document.getElementById('nav-register-link');
      if (regLink) regLink.style.display = Auth.isLoggedIn() ? 'none' : '';
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Determine base path (are we in desktop/ root or desktop/pages/)
    var path = window.location.pathname;
    var inPages = path.indexOf('/pages/') !== -1;
    var basePath = inPages ? '' : 'pages/';

    updateNavbarAuth();
    initNavbarSearch(basePath);
    populateHomeSliders(basePath);

    if (window.MWSlider) MWSlider.initAll();
  });

  // Expose for page scripts
  window.MWMain = {
    getAlbumImg: getAlbumImg,
    getArtistImg: getArtistImg,
    GENRE_IMGS: GENRE_IMGS,
    ALBUM_IMGS: ALBUM_IMGS
  };

})();
