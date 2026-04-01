// MusicWorld Mobile - App Bootstrap
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
    'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&q=80'
  ];

  async function loadComponent(selector, url) {
    var el = document.querySelector(selector);
    if (!el) return;
    try {
      var res = await fetch(url);
      if (!res.ok) throw new Error('Failed: ' + url);
      el.innerHTML = await res.text();
    } catch (e) { console.warn('Component load failed:', url, e); }
  }

  function renderAlbumCard(album, idx) {
    var genre = album.genreIds && album.genreIds[0];
    var img = GENRE_IMGS[genre] || ALBUM_IMGS[idx % ALBUM_IMGS.length];
    var badge = album.isNewRelease ? '<span class="mw-badge mw-badge--new" style="position:absolute;top:6px;left:6px;z-index:2;font-size:0.65rem">New</span>'
              : album.isBestOfYear ? '<span class="mw-badge mw-badge--best" style="position:absolute;top:6px;left:6px;z-index:2;font-size:0.65rem">Best</span>' : '';
    return '<div class="swiper-slide">'
      + '<a href="pages/album.html?id=' + album.id + '" class="text-decoration-none">'
      + '<div class="mw-card" data-animate>'
      + '<div class="mw-card__img">' + badge
      + '<img src="' + img + '" alt="' + album.title + '" loading="lazy">'
      + '<div class="mw-card__overlay"><button class="btn-play" data-play="' + album.id + '" data-title="' + album.title + '" data-artist="" data-cover="' + img + '"><i class="fas fa-play"></i></button></div>'
      + '</div>'
      + '<div class="mw-card__body"><p class="mw-card__title">' + album.title + '</p>'
      + '<p class="mw-card__meta">' + (album.releaseDate ? album.releaseDate.slice(0,4) : '') + '</p></div>'
      + '</div></a></div>';
  }

  function renderArtistCard(artist, idx) {
    var genre = artist.genreIds && artist.genreIds[0];
    var img = GENRE_IMGS[genre] || ALBUM_IMGS[idx % ALBUM_IMGS.length];
    return '<div class="swiper-slide">'
      + '<a href="pages/artist.html?id=' + artist.id + '" class="text-decoration-none">'
      + '<div class="mw-card" data-animate>'
      + '<div class="mw-card__img">'
      + '<img src="' + img + '" alt="' + artist.name + '" loading="lazy">'
      + '<div class="mw-card__overlay"><button class="btn-play"><i class="fas fa-user"></i></button></div>'
      + '</div>'
      + '<div class="mw-card__body"><p class="mw-card__title">' + artist.name + '</p>'
      + '<p class="mw-card__meta">' + (artist.origin || '') + '</p></div>'
      + '</div></a></div>';
  }

  function populateHomeSliders() {
    if (!window.MusicData) return;
    var nrw = document.querySelector('#slider-new-releases .swiper-wrapper');
    var boy = document.querySelector('#slider-best-of-year .swiper-wrapper');
    var tc  = document.querySelector('#slider-top-composers .swiper-wrapper');
    if (nrw) nrw.innerHTML = MusicData.albums.filter(function(a){return a.isNewRelease;}).map(renderAlbumCard).join('');
    if (boy) boy.innerHTML = MusicData.albums.filter(function(a){return a.isBestOfYear;}).map(renderAlbumCard).join('');
    if (tc)  tc.innerHTML  = MusicData.artists.filter(function(a){return MusicData.albums.some(function(al){return al.artistId===a.id&&al.isFeatured;});}).map(renderArtistCard).join('');
  }

  document.addEventListener('DOMContentLoaded', async function () {
    await loadComponent('#navbar-placeholder', 'pages/navbar.html');
    await loadComponent('#footer-placeholder', 'pages/footer.html');
    Auth.updateNavbar();
    populateHomeSliders();
    if (window.MWSlider) MWSlider.initAll();
  });
})();
