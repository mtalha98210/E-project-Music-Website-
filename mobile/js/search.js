// MusicWorld - Search Module
window.MWSearch = (function() {
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

  function getImg(item, idx) {
    var genre = (item.genreIds||[])[0];
    return GENRE_IMGS[genre] || ALBUM_IMGS[(idx||0) % ALBUM_IMGS.length];
  }

  return {
    search: function(query) {
      if (!query || !query.trim()) return [];
      var q = query.trim().toLowerCase();
      var results = [];
      if (!window.MusicData) return results;
      (MusicData.artists||[]).forEach(function(artist) {
        if (artist.name.toLowerCase().includes(q)) results.push({ type: 'artist', item: artist });
      });
      (MusicData.albums||[]).forEach(function(album) {
        if (album.title.toLowerCase().includes(q) || (album.releaseDate && album.releaseDate.includes(q)))
          results.push({ type: 'album', item: album });
      });
      return results;
    },

    renderResults: function(results, container) {
      if (!container) return;
      container.innerHTML = '';
      if (!results.length) {
        container.innerHTML = '<div class="search-no-results"><i class="fas fa-search"></i><p>No results found. Try a different search term.</p></div>';
        return;
      }
      var artists = results.filter(function(r){return r.type==='artist';});
      var albums  = results.filter(function(r){return r.type==='album';});

      if (artists.length) {
        var g = '<h3 class="search-group-title">Artists</h3><div class="row g-3 mb-4">';
        artists.forEach(function(r, i){
          var a = r.item;
          var img = getImg(a, i);
          g += '<div class="col-6 col-md-3"><a href="artist.html?id='+a.id+'" class="text-decoration-none"><div class="mw-card"><div class="mw-card__img"><img src="'+img+'" alt="'+a.name+'" loading="lazy"><div class="mw-card__overlay"><button class="btn-play"><i class="fas fa-user"></i></button></div></div><div class="mw-card__body"><p class="mw-card__title">'+a.name+'</p><p class="mw-card__meta">'+(a.origin||'')+'</p></div></div></a></div>';
        });
        container.innerHTML += g + '</div>';
      }

      if (albums.length) {
        var g2 = '<h3 class="search-group-title">Albums</h3><div class="row g-3">';
        albums.forEach(function(r, i){
          var al = r.item;
          var artist = (MusicData.artists||[]).find(function(a){return a.id===al.artistId;});
          var img = getImg(al, i);
          g2 += '<div class="col-6 col-md-3"><a href="album.html?id='+al.id+'" class="text-decoration-none"><div class="mw-card"><div class="mw-card__img"><img src="'+img+'" alt="'+al.title+'" loading="lazy"><div class="mw-card__overlay"><button class="btn-play"><i class="fas fa-play"></i></button></div></div><div class="mw-card__body"><p class="mw-card__title">'+al.title+'</p><p class="mw-card__meta">'+(artist?artist.name:'')+' &middot; '+(al.releaseDate?al.releaseDate.slice(0,4):'')+'</p></div></div></a></div>';
        });
        container.innerHTML += g2 + '</div>';
      }
    }
  };
})();
