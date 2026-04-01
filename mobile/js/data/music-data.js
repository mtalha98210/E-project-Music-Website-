// MusicWorld - Music Data
// All music content: genres, subcategories, artists, albums, songs, reviews

window.MusicData = {

  // ─── GENRES ────────────────────────────────────────────────────────────────
  genres: [
    {
      id: "rock",
      name: "Rock",
      description: "Rock music is a broad genre of popular music that originated as rock and roll in the United States in the late 1940s and early 1950s, developing into a range of different styles in the mid-1960s and later.",
      heroImage: "assets/images/rock-hero.jpg"
    },
    {
      id: "jazz",
      name: "Jazz",
      description: "Jazz is a music genre that originated in the African-American communities of New Orleans, Louisiana in the late 19th and early 20th centuries, with its roots in blues and ragtime.",
      heroImage: "assets/images/jazz-hero.jpg"
    },
    {
      id: "pop",
      name: "Pop",
      description: "Pop music is a genre of popular music that originated in its modern form during the mid-1950s in the United States and the United Kingdom. The terms popular music and pop music are often used interchangeably.",
      heroImage: "assets/images/pop-hero.jpg"
    },
    {
      id: "rap",
      name: "Rap",
      description: "Rap music, also known as hip-hop, is a genre of popular music developed in the United States by inner-city African Americans and Latino Americans in the Bronx borough of New York City in the 1970s.",
      heroImage: "assets/images/rap-hero.jpg"
    },
    {
      id: "classical",
      name: "Classical",
      description: "Classical music generally refers to the art music of the Western world, considered to be distinct from Western folk music or popular music traditions. It is sometimes distinguished as Western classical music.",
      heroImage: "assets/images/classical-hero.jpg"
    }
  ],

  // ─── SUBCATEGORIES ─────────────────────────────────────────────────────────
  subcategories: [
    // Rock
    { id: "classic-rock",    name: "Classic Rock",    genreId: "rock",      description: "The foundational rock sound of the 1960s–70s, defined by electric guitars, powerful vocals, and anthemic songwriting." },
    { id: "hard-rock",       name: "Hard Rock",       genreId: "rock",      description: "A heavier, louder offshoot of rock featuring distorted guitars, aggressive rhythms, and high-energy performances." },
    { id: "alternative-rock",name: "Alternative Rock",genreId: "rock",      description: "A diverse style emerging in the 1980s–90s that pushed against mainstream conventions with experimental sounds." },
    // Jazz
    { id: "bebop",           name: "Bebop",           genreId: "jazz",      description: "A complex, fast-paced jazz style developed in the 1940s emphasizing improvisation and virtuosic technique." },
    { id: "smooth-jazz",     name: "Smooth Jazz",     genreId: "jazz",      description: "A commercially oriented jazz style blending jazz with R&B and pop for a relaxed, melodic sound." },
    { id: "fusion-jazz",     name: "Fusion Jazz",     genreId: "jazz",      description: "A genre blending jazz improvisation with rock, funk, and electronic music elements." },
    // Pop
    { id: "synth-pop",       name: "Synth-Pop",       genreId: "pop",       description: "A pop subgenre dominated by synthesizers and electronic production, prominent in the 1980s and beyond." },
    { id: "dance-pop",       name: "Dance-Pop",       genreId: "pop",       description: "Upbeat, rhythm-driven pop music designed for dancing, blending pop melodies with electronic beats." },
    { id: "indie-pop",       name: "Indie Pop",       genreId: "pop",       description: "A lighter, melodic offshoot of indie rock with catchy hooks and a DIY aesthetic." },
    // Rap
    { id: "east-coast-rap",  name: "East Coast Rap",  genreId: "rap",       description: "A hip-hop style originating in New York City known for lyrical complexity, jazz samples, and storytelling." },
    { id: "west-coast-rap",  name: "West Coast Rap",  genreId: "rap",       description: "A hip-hop style from California characterized by laid-back G-funk beats and vivid street narratives." },
    { id: "trap",            name: "Trap",            genreId: "rap",       description: "A Southern hip-hop subgenre featuring heavy 808 bass, hi-hat rolls, and dark, atmospheric production." },
    // Classical
    { id: "baroque",         name: "Baroque",         genreId: "classical", description: "A highly ornate and elaborate musical style from roughly 1600–1750, featuring counterpoint and figured bass." },
    { id: "romantic",        name: "Romantic",        genreId: "classical", description: "A 19th-century style emphasizing emotional expression, large orchestras, and programmatic storytelling." },
    { id: "contemporary-classical", name: "Contemporary Classical", genreId: "classical", description: "Post-1945 art music exploring atonality, minimalism, and experimental forms." }
  ],

  // ─── ARTISTS ───────────────────────────────────────────────────────────────
  artists: [
    // ── Rock ──
    {
      id: "led-zeppelin",
      name: "Led Zeppelin",
      genreIds: ["rock"],
      subcategoryIds: ["classic-rock", "hard-rock"],
      image: "assets/images/led-zeppelin.jpg",
      bio: "Led Zeppelin was an English rock band formed in London in 1968. The group consisted of guitarist Jimmy Page, singer Robert Plant, bassist and keyboardist John Paul Jones, and drummer John Bonham. With a heavy, guitar-driven sound, they are cited as one of the progenitors of hard rock and heavy metal.",
      achievements: [
        "Inducted into the Rock and Roll Hall of Fame in 1995",
        "Sold over 300 million albums worldwide",
        "Ranked #1 on VH1's Greatest Artists of Hard Rock",
        "Grammy Lifetime Achievement Award (2005)"
      ],
      albums: ["led-zeppelin-iv", "physical-graffiti"],
      formedYear: 1968,
      origin: "London, UK"
    },
    {
      id: "nirvana",
      name: "Nirvana",
      genreIds: ["rock"],
      subcategoryIds: ["alternative-rock"],
      image: "assets/images/nirvana.jpg",
      bio: "Nirvana was an American rock band formed in Aberdeen, Washington in 1987. Founded by lead singer and guitarist Kurt Cobain and bassist Krist Novoselic, the band went through a succession of drummers before recruiting Dave Grohl in 1990. Nirvana's success popularized alternative rock and is often credited with ending the dominance of hair metal.",
      achievements: [
        "Inducted into the Rock and Roll Hall of Fame in 2014",
        "Nevermind certified 30× Platinum in the US",
        "Named one of the 100 Greatest Artists by Rolling Stone",
        "MTV Video Music Award for Best Alternative Video (1992)"
      ],
      albums: ["nevermind", "in-utero"],
      formedYear: 1987,
      origin: "Aberdeen, Washington, USA"
    },
    // ── Jazz ──
    {
      id: "miles-davis",
      name: "Miles Davis",
      genreIds: ["jazz"],
      subcategoryIds: ["bebop", "fusion-jazz"],
      image: "assets/images/miles-davis.jpg",
      bio: "Miles Dewey Davis III (May 26, 1926 – September 28, 1991) was an American trumpeter, bandleader, and composer. Widely considered one of the most influential musicians of the 20th century, Davis was at the forefront of several major developments in jazz music, including bebop, cool jazz, hard bop, modal jazz, and jazz fusion.",
      achievements: [
        "8 Grammy Awards including Grammy Lifetime Achievement Award",
        "Kind of Blue is the best-selling jazz album of all time",
        "Inducted into the Rock and Roll Hall of Fame in 2006",
        "Ranked #12 on Rolling Stone's 100 Greatest Artists"
      ],
      albums: ["kind-of-blue", "bitches-brew"],
      formedYear: 1944,
      origin: "Alton, Illinois, USA"
    },
    {
      id: "john-coltrane",
      name: "John Coltrane",
      genreIds: ["jazz"],
      subcategoryIds: ["bebop", "fusion-jazz"],
      image: "assets/images/john-coltrane.jpg",
      bio: "John William Coltrane (September 23, 1926 – July 17, 1967) was an American jazz saxophonist, bandleader, and composer. He is among the most influential and acclaimed figures in the history of jazz and 20th-century music. His pioneering use of sheets of sound and modal jazz redefined the possibilities of the saxophone.",
      achievements: [
        "Grammy Lifetime Achievement Award (1997, posthumous)",
        "A Love Supreme named one of the greatest albums of all time",
        "Inducted into the Grammy Hall of Fame multiple times",
        "Pulitzer Prize Special Citation (2007, posthumous)"
      ],
      albums: ["a-love-supreme", "giant-steps"],
      formedYear: 1955,
      origin: "Hamlet, North Carolina, USA"
    },
    // ── Pop ──
    {
      id: "michael-jackson",
      name: "Michael Jackson",
      genreIds: ["pop"],
      subcategoryIds: ["dance-pop"],
      image: "assets/images/michael-jackson.jpg",
      bio: "Michael Joseph Jackson (August 29, 1958 – June 25, 2009) was an American singer, songwriter, and dancer. Dubbed the 'King of Pop', he is regarded as one of the most significant cultural figures of the 20th century. His contributions to music, dance, and fashion, along with his publicized personal life, made him a global figure in popular culture.",
      achievements: [
        "Best-selling music artist of all time with over 400 million records sold",
        "13 Grammy Awards including Grammy Legend Award",
        "Thriller is the best-selling album of all time",
        "Inducted into the Rock and Roll Hall of Fame twice"
      ],
      albums: ["thriller", "bad"],
      formedYear: 1964,
      origin: "Gary, Indiana, USA"
    },
    {
      id: "taylor-swift",
      name: "Taylor Swift",
      genreIds: ["pop"],
      subcategoryIds: ["indie-pop", "synth-pop"],
      image: "assets/images/taylor-swift.jpg",
      bio: "Taylor Alison Swift (born December 13, 1989) is an American singer-songwriter. Her narrative songwriting, which often centers around her personal life, has received widespread critical praise and media coverage. She is one of the best-selling music artists of all time, with over 200 million records sold worldwide.",
      achievements: [
        "14 Grammy Awards including 4 Album of the Year awards",
        "First artist to win Album of the Year four times",
        "Time Person of the Year 2023",
        "Billboard's Greatest of All Time Artist"
      ],
      albums: ["1989", "midnights"],
      formedYear: 2004,
      origin: "West Reading, Pennsylvania, USA"
    },
    // ── Rap ──
    {
      id: "eminem",
      name: "Eminem",
      genreIds: ["rap"],
      subcategoryIds: ["east-coast-rap"],
      image: "assets/images/eminem.jpg",
      bio: "Marshall Bruce Mathers III (born October 17, 1972), known professionally as Eminem, is an American rapper, songwriter, and record producer. Eminem is among the best-selling music artists of all time, with estimated sales of over 220 million records worldwide. He has been cited as one of the greatest rappers of all time.",
      achievements: [
        "15 Grammy Awards",
        "Best-selling rap artist of all time",
        "The Marshall Mathers LP is the fastest-selling rap album in history",
        "Inducted into the Rock and Roll Hall of Fame in 2022"
      ],
      albums: ["the-slim-shady-lp", "the-marshall-mathers-lp"],
      formedYear: 1988,
      origin: "St. Joseph, Missouri, USA"
    },
    {
      id: "kendrick-lamar",
      name: "Kendrick Lamar",
      genreIds: ["rap"],
      subcategoryIds: ["west-coast-rap", "trap"],
      image: "assets/images/kendrick-lamar.jpg",
      bio: "Kendrick Lamar Duckworth (born June 17, 1987) is an American rapper, songwriter, and record producer. He is widely regarded as one of the most influential hip-hop artists of his generation. His works are known for their complex storytelling, social commentary, and exploration of African-American culture.",
      achievements: [
        "17 Grammy Awards",
        "Pulitzer Prize for Music (2018) — first non-classical, non-jazz artist",
        "DAMN. certified 7× Platinum",
        "Time 100 Most Influential People (2016)"
      ],
      albums: ["good-kid-maad-city", "to-pimp-a-butterfly"],
      formedYear: 2003,
      origin: "Compton, California, USA"
    },
    // ── Classical ──
    {
      id: "beethoven",
      name: "Ludwig van Beethoven",
      genreIds: ["classical"],
      subcategoryIds: ["romantic", "baroque"],
      image: "assets/images/beethoven.jpg",
      bio: "Ludwig van Beethoven (baptised 17 December 1770 – 26 March 1827) was a German composer and pianist. He is one of the most admired composers in the history of Western music; his works rank among the most performed of the classical music repertoire. His middle period works, including his Third through Eighth Symphonies, are considered masterpieces of the classical and early romantic eras.",
      achievements: [
        "Composed 9 symphonies, 32 piano sonatas, and 16 string quartets",
        "Symphony No. 9 composed while completely deaf",
        "Inducted into the Grammy Hall of Fame multiple times",
        "Considered the bridge between Classical and Romantic eras"
      ],
      albums: ["symphony-no-9", "moonlight-sonata-album"],
      formedYear: 1787,
      origin: "Bonn, Holy Roman Empire (modern Germany)"
    },
    {
      id: "mozart",
      name: "Wolfgang Amadeus Mozart",
      genreIds: ["classical"],
      subcategoryIds: ["baroque", "romantic"],
      image: "assets/images/mozart.jpg",
      bio: "Wolfgang Amadeus Mozart (27 January 1756 – 5 December 1791) was a prolific and influential composer of the Classical period. Despite his short life, his rapid pace of composition resulted in more than 800 works representing virtually every Western classical form and genre of his time.",
      achievements: [
        "Composed over 800 works in his 35-year life",
        "Child prodigy who performed for European royalty at age 6",
        "Don Giovanni and The Magic Flute remain operatic masterpieces",
        "Inducted into the Grammy Hall of Fame multiple times"
      ],
      albums: ["requiem-album", "symphony-no-40-album"],
      formedYear: 1762,
      origin: "Salzburg, Archbishopric of Salzburg (modern Austria)"
    }
  ],

  // ─── ALBUMS ────────────────────────────────────────────────────────────────
  albums: [
    // ── Rock ──
    {
      id: "led-zeppelin-iv",
      title: "Led Zeppelin IV",
      artistId: "led-zeppelin",
      genreIds: ["rock"],
      releaseDate: "1971-11-08",
      coverImage: "assets/images/led-zeppelin-iv.jpg",
      description: "The fourth studio album by Led Zeppelin, featuring some of the band's most iconic tracks including Stairway to Heaven. The album was released without a title or any text on the cover, making it one of the most mysterious releases in rock history.",
      isNewRelease: false,
      isBestOfYear: false,
      isFeatured: true,
      songs: [
        { id: "black-dog",           title: "Black Dog",           albumId: "led-zeppelin-iv", duration: "4:55", trackNumber: 1 },
        { id: "rock-and-roll",       title: "Rock and Roll",       albumId: "led-zeppelin-iv", duration: "3:40", trackNumber: 2 },
        { id: "the-battle-of-evermore", title: "The Battle of Evermore", albumId: "led-zeppelin-iv", duration: "5:51", trackNumber: 3 },
        { id: "stairway-to-heaven",  title: "Stairway to Heaven",  albumId: "led-zeppelin-iv", duration: "8:02", trackNumber: 4 },
        { id: "misty-mountain-hop",  title: "Misty Mountain Hop",  albumId: "led-zeppelin-iv", duration: "4:38", trackNumber: 5 }
      ]
    },
    {
      id: "physical-graffiti",
      title: "Physical Graffiti",
      artistId: "led-zeppelin",
      genreIds: ["rock"],
      releaseDate: "1975-02-24",
      coverImage: "assets/images/physical-graffiti.jpg",
      description: "The sixth studio album by Led Zeppelin, a double album that showcases the band's musical diversity, ranging from hard rock to folk, blues, and Eastern-influenced music. Kashmir is widely considered one of the greatest rock songs ever recorded.",
      isNewRelease: false,
      isBestOfYear: false,
      isFeatured: true,
      songs: [
        { id: "custard-pie",         title: "Custard Pie",         albumId: "physical-graffiti", duration: "4:13", trackNumber: 1 },
        { id: "the-rover",           title: "The Rover",           albumId: "physical-graffiti", duration: "5:37", trackNumber: 2 },
        { id: "in-my-time-of-dying", title: "In My Time of Dying", albumId: "physical-graffiti", duration: "11:05", trackNumber: 3 },
        { id: "houses-of-the-holy",  title: "Houses of the Holy",  albumId: "physical-graffiti", duration: "4:01", trackNumber: 4 },
        { id: "kashmir",             title: "Kashmir",             albumId: "physical-graffiti", duration: "8:32", trackNumber: 5 }
      ]
    },
    {
      id: "nevermind",
      title: "Nevermind",
      artistId: "nirvana",
      genreIds: ["rock"],
      releaseDate: "1991-09-24",
      coverImage: "assets/images/nevermind.jpg",
      description: "The second studio album by Nirvana, Nevermind is widely credited with bringing alternative rock and grunge to mainstream audiences. Smells Like Teen Spirit became an anthem for Generation X and one of the most recognizable songs in rock history.",
      isNewRelease: false,
      isBestOfYear: false,
      isFeatured: true,
      songs: [
        { id: "smells-like-teen-spirit", title: "Smells Like Teen Spirit", albumId: "nevermind", duration: "5:01", trackNumber: 1 },
        { id: "in-bloom",            title: "In Bloom",            albumId: "nevermind", duration: "4:15", trackNumber: 2 },
        { id: "come-as-you-are",     title: "Come as You Are",     albumId: "nevermind", duration: "3:39", trackNumber: 3 },
        { id: "lithium",             title: "Lithium",             albumId: "nevermind", duration: "4:17", trackNumber: 4 },
        { id: "polly",               title: "Polly",               albumId: "nevermind", duration: "2:57", trackNumber: 5 }
      ]
    },
    {
      id: "in-utero",
      title: "In Utero",
      artistId: "nirvana",
      genreIds: ["rock"],
      releaseDate: "2026-03-15",
      coverImage: "assets/images/in-utero.jpg",
      description: "A special 2026 remastered edition of Nirvana's third and final studio album, featuring previously unreleased demos and alternate mixes. The raw, abrasive sound of the original 1993 recording is preserved while new archival material sheds light on the band's creative process.",
      isNewRelease: true,
      isBestOfYear: true,
      isFeatured: false,
      songs: [
        { id: "serve-the-servants",  title: "Serve the Servants",  albumId: "in-utero", duration: "3:36", trackNumber: 1 },
        { id: "scentless-apprentice",title: "Scentless Apprentice", albumId: "in-utero", duration: "3:48", trackNumber: 2 },
        { id: "heart-shaped-box",    title: "Heart-Shaped Box",    albumId: "in-utero", duration: "4:41", trackNumber: 3 },
        { id: "rape-me",             title: "Rape Me",             albumId: "in-utero", duration: "2:50", trackNumber: 4 },
        { id: "all-apologies",       title: "All Apologies",       albumId: "in-utero", duration: "3:51", trackNumber: 5 }
      ]
    },
    // ── Jazz ──
    {
      id: "kind-of-blue",
      title: "Kind of Blue",
      artistId: "miles-davis",
      genreIds: ["jazz"],
      releaseDate: "1959-08-17",
      coverImage: "assets/images/kind-of-blue.jpg",
      description: "Kind of Blue is a studio album by American jazz musician Miles Davis. Released in 1959, it is the best-selling jazz album of all time. The album is widely considered one of the greatest and most influential albums ever recorded, pioneering the modal jazz style.",
      isNewRelease: false,
      isBestOfYear: false,
      isFeatured: true,
      songs: [
        { id: "so-what",             title: "So What",             albumId: "kind-of-blue", duration: "9:22", trackNumber: 1 },
        { id: "freddie-freeloader",  title: "Freddie Freeloader",  albumId: "kind-of-blue", duration: "9:46", trackNumber: 2 },
        { id: "blue-in-green",       title: "Blue in Green",       albumId: "kind-of-blue", duration: "5:37", trackNumber: 3 },
        { id: "all-blues",           title: "All Blues",           albumId: "kind-of-blue", duration: "11:33", trackNumber: 4 },
        { id: "flamenco-sketches",   title: "Flamenco Sketches",   albumId: "kind-of-blue", duration: "9:26", trackNumber: 5 }
      ]
    },
    {
      id: "bitches-brew",
      title: "Bitches Brew",
      artistId: "miles-davis",
      genreIds: ["jazz"],
      releaseDate: "1970-03-30",
      coverImage: "assets/images/bitches-brew.jpg",
      description: "Bitches Brew is a double album by Miles Davis, released in 1970. It is widely considered a landmark recording in jazz fusion, combining jazz improvisation with rock rhythms and electric instruments. The album was a commercial and critical success, winning the Grammy Award for Best Large Jazz Ensemble Album.",
      isNewRelease: false,
      isBestOfYear: false,
      isFeatured: false,
      songs: [
        { id: "pharaoh-dance",       title: "Pharaoh's Dance",     albumId: "bitches-brew", duration: "20:05", trackNumber: 1 },
        { id: "bitches-brew-track",  title: "Bitches Brew",        albumId: "bitches-brew", duration: "26:58", trackNumber: 2 },
        { id: "spanish-key",         title: "Spanish Key",         albumId: "bitches-brew", duration: "17:32", trackNumber: 3 },
        { id: "john-mclaughlin",     title: "John McLaughlin",     albumId: "bitches-brew", duration: "4:23", trackNumber: 4 }
      ]
    },
    {
      id: "a-love-supreme",
      title: "A Love Supreme",
      artistId: "john-coltrane",
      genreIds: ["jazz"],
      releaseDate: "1965-01-17",
      coverImage: "assets/images/a-love-supreme.jpg",
      description: "A Love Supreme is a studio album by jazz musician John Coltrane. Recorded in one session on December 9, 1964, it is widely considered one of the greatest jazz albums ever recorded. The album is a four-part suite dedicated to God, representing Coltrane's spiritual awakening.",
      isNewRelease: false,
      isBestOfYear: false,
      isFeatured: false,
      songs: [
        { id: "acknowledgement",     title: "Acknowledgement",     albumId: "a-love-supreme", duration: "7:46", trackNumber: 1 },
        { id: "resolution",          title: "Resolution",          albumId: "a-love-supreme", duration: "7:23", trackNumber: 2 },
        { id: "pursuance",           title: "Pursuance",           albumId: "a-love-supreme", duration: "10:52", trackNumber: 3 },
        { id: "psalm",               title: "Psalm",               albumId: "a-love-supreme", duration: "7:05", trackNumber: 4 }
      ]
    },
    {
      id: "giant-steps",
      title: "Giant Steps",
      artistId: "john-coltrane",
      genreIds: ["jazz"],
      releaseDate: "2026-02-10",
      coverImage: "assets/images/giant-steps.jpg",
      description: "A landmark 2026 anniversary reissue of John Coltrane's 1960 masterpiece, featuring newly discovered studio outtakes and a remastered stereo mix. Giant Steps introduced the Coltrane changes — a harmonic innovation that revolutionized jazz theory and remains studied by musicians worldwide.",
      isNewRelease: true,
      isBestOfYear: true,
      isFeatured: false,
      songs: [
        { id: "giant-steps-track",   title: "Giant Steps",         albumId: "giant-steps", duration: "4:43", trackNumber: 1 },
        { id: "cousin-mary",         title: "Cousin Mary",         albumId: "giant-steps", duration: "5:47", trackNumber: 2 },
        { id: "countdown",           title: "Countdown",           albumId: "giant-steps", duration: "2:22", trackNumber: 3 },
        { id: "spiral",              title: "Spiral",              albumId: "giant-steps", duration: "5:57", trackNumber: 4 },
        { id: "syeeda-song-flute",   title: "Syeeda's Song Flute", albumId: "giant-steps", duration: "7:00", trackNumber: 5 }
      ]
    },
    // ── Pop ──
    {
      id: "thriller",
      title: "Thriller",
      artistId: "michael-jackson",
      genreIds: ["pop"],
      releaseDate: "1982-11-30",
      coverImage: "assets/images/thriller.jpg",
      description: "Thriller is the sixth studio album by Michael Jackson, released on November 30, 1982. It is the best-selling album of all time, with estimated sales of 66–70 million copies worldwide. The album produced seven Billboard Hot 100 top-ten singles and won a record-breaking eight Grammy Awards.",
      isNewRelease: false,
      isBestOfYear: false,
      isFeatured: true,
      songs: [
        { id: "wanna-be-startin-somethin", title: "Wanna Be Startin' Somethin'", albumId: "thriller", duration: "6:03", trackNumber: 1 },
        { id: "thriller-track",      title: "Thriller",            albumId: "thriller", duration: "5:57", trackNumber: 2 },
        { id: "beat-it",             title: "Beat It",             albumId: "thriller", duration: "4:18", trackNumber: 3 },
        { id: "billie-jean",         title: "Billie Jean",         albumId: "thriller", duration: "4:54", trackNumber: 4 },
        { id: "human-nature",        title: "Human Nature",        albumId: "thriller", duration: "4:06", trackNumber: 5 }
      ]
    },
    {
      id: "bad",
      title: "Bad",
      artistId: "michael-jackson",
      genreIds: ["pop"],
      releaseDate: "1987-08-31",
      coverImage: "assets/images/bad.jpg",
      description: "Bad is the seventh studio album by Michael Jackson. It was the follow-up to his record-breaking Thriller album. Bad produced five number-one singles on the Billboard Hot 100, a record at the time, and is one of the best-selling albums of all time with over 45 million copies sold.",
      isNewRelease: false,
      isBestOfYear: false,
      isFeatured: false,
      songs: [
        { id: "bad-track",           title: "Bad",                 albumId: "bad", duration: "4:07", trackNumber: 1 },
        { id: "the-way-you-make-me-feel", title: "The Way You Make Me Feel", albumId: "bad", duration: "4:59", trackNumber: 2 },
        { id: "man-in-the-mirror",   title: "Man in the Mirror",   albumId: "bad", duration: "5:19", trackNumber: 3 },
        { id: "i-just-cant-stop-loving-you", title: "I Just Can't Stop Loving You", albumId: "bad", duration: "4:12", trackNumber: 4 },
        { id: "dirty-diana",         title: "Dirty Diana",         albumId: "bad", duration: "4:41", trackNumber: 5 }
      ]
    },
    {
      id: "1989",
      title: "1989",
      artistId: "taylor-swift",
      genreIds: ["pop"],
      releaseDate: "2014-10-27",
      coverImage: "assets/images/1989.jpg",
      description: "1989 is the fifth studio album by Taylor Swift. It marked her official transition from country to pop music. The album won the Grammy Award for Album of the Year and produced multiple number-one singles including Shake It Off and Blank Space.",
      isNewRelease: false,
      isBestOfYear: false,
      isFeatured: false,
      songs: [
        { id: "welcome-to-new-york", title: "Welcome to New York", albumId: "1989", duration: "3:32", trackNumber: 1 },
        { id: "blank-space",         title: "Blank Space",         albumId: "1989", duration: "3:51", trackNumber: 2 },
        { id: "style",               title: "Style",               albumId: "1989", duration: "3:51", trackNumber: 3 },
        { id: "shake-it-off",        title: "Shake It Off",        albumId: "1989", duration: "3:39", trackNumber: 4 },
        { id: "bad-blood",           title: "Bad Blood",           albumId: "1989", duration: "3:31", trackNumber: 5 }
      ]
    },
    {
      id: "midnights",
      title: "Midnights",
      artistId: "taylor-swift",
      genreIds: ["pop"],
      releaseDate: "2026-04-05",
      coverImage: "assets/images/midnights.jpg",
      description: "A special 2026 deluxe edition of Taylor Swift's tenth studio album Midnights, featuring new bonus tracks and a reimagined acoustic version of Anti-Hero. The album explores themes of sleepless nights and self-reflection, blending synth-pop with dream-pop production.",
      isNewRelease: true,
      isBestOfYear: false,
      isFeatured: false,
      songs: [
        { id: "lavender-haze",       title: "Lavender Haze",       albumId: "midnights", duration: "3:22", trackNumber: 1 },
        { id: "marjorie",            title: "Marjorie",            albumId: "midnights", duration: "4:17", trackNumber: 2 },
        { id: "anti-hero",           title: "Anti-Hero",           albumId: "midnights", duration: "3:20", trackNumber: 3 },
        { id: "snow-on-the-beach",   title: "Snow on the Beach",   albumId: "midnights", duration: "4:16", trackNumber: 4 },
        { id: "midnight-rain",       title: "Midnight Rain",       albumId: "midnights", duration: "2:54", trackNumber: 5 }
      ]
    },
    // ── Rap ──
    {
      id: "the-slim-shady-lp",
      title: "The Slim Shady LP",
      artistId: "eminem",
      genreIds: ["rap"],
      releaseDate: "1999-02-23",
      coverImage: "assets/images/slim-shady-lp.jpg",
      description: "The Slim Shady LP is the second studio album by Eminem and his major-label debut. The album introduced the world to Slim Shady, Eminem's alter ego, and established him as a major force in hip-hop. It won the Grammy Award for Best Rap Album.",
      isNewRelease: false,
      isBestOfYear: false,
      isFeatured: false,
      songs: [
        { id: "my-name-is",          title: "My Name Is",          albumId: "the-slim-shady-lp", duration: "4:28", trackNumber: 1 },
        { id: "guilty-conscience",   title: "Guilty Conscience",   albumId: "the-slim-shady-lp", duration: "3:18", trackNumber: 2 },
        { id: "brain-damage",        title: "Brain Damage",        albumId: "the-slim-shady-lp", duration: "3:45", trackNumber: 3 },
        { id: "97-bonnie-clyde",     title: "'97 Bonnie & Clyde",  albumId: "the-slim-shady-lp", duration: "5:17", trackNumber: 4 },
        { id: "role-model",          title: "Role Model",          albumId: "the-slim-shady-lp", duration: "3:25", trackNumber: 5 }
      ]
    },
    {
      id: "the-marshall-mathers-lp",
      title: "The Marshall Mathers LP",
      artistId: "eminem",
      genreIds: ["rap"],
      releaseDate: "2000-05-23",
      coverImage: "assets/images/marshall-mathers-lp.jpg",
      description: "The Marshall Mathers LP is the third studio album by Eminem. It became the fastest-selling rap album in history, selling 1.76 million copies in its first week. The album won the Grammy Award for Best Rap Album and is widely considered one of the greatest hip-hop albums ever made.",
      isNewRelease: false,
      isBestOfYear: false,
      isFeatured: true,
      songs: [
        { id: "the-real-slim-shady", title: "The Real Slim Shady", albumId: "the-marshall-mathers-lp", duration: "4:44", trackNumber: 1 },
        { id: "stan",                title: "Stan",                albumId: "the-marshall-mathers-lp", duration: "6:44", trackNumber: 2 },
        { id: "the-way-i-am",        title: "The Way I Am",        albumId: "the-marshall-mathers-lp", duration: "4:50", trackNumber: 3 },
        { id: "kim",                 title: "Kim",                 albumId: "the-marshall-mathers-lp", duration: "6:17", trackNumber: 4 },
        { id: "criminal",            title: "Criminal",            albumId: "the-marshall-mathers-lp", duration: "5:19", trackNumber: 5 }
      ]
    },
    {
      id: "good-kid-maad-city",
      title: "good kid, m.A.A.d city",
      artistId: "kendrick-lamar",
      genreIds: ["rap"],
      releaseDate: "2012-10-22",
      coverImage: "assets/images/good-kid-maad-city.jpg",
      description: "good kid, m.A.A.d city is the second studio album by Kendrick Lamar. It is a concept album that tells the story of Kendrick's teenage years growing up in Compton, California. The album is widely regarded as one of the greatest hip-hop albums of all time.",
      isNewRelease: false,
      isBestOfYear: false,
      isFeatured: false,
      songs: [
        { id: "swimming-pools",      title: "Swimming Pools (Drank)", albumId: "good-kid-maad-city", duration: "5:13", trackNumber: 1 },
        { id: "backseat-freestyle",  title: "Backseat Freestyle",  albumId: "good-kid-maad-city", duration: "3:31", trackNumber: 2 },
        { id: "money-trees",         title: "Money Trees",         albumId: "good-kid-maad-city", duration: "6:26", trackNumber: 3 },
        { id: "poetic-justice",      title: "Poetic Justice",      albumId: "good-kid-maad-city", duration: "4:53", trackNumber: 4 },
        { id: "m-a-a-d-city",        title: "m.A.A.d city",        albumId: "good-kid-maad-city", duration: "5:50", trackNumber: 5 }
      ]
    },
    {
      id: "to-pimp-a-butterfly",
      title: "To Pimp a Butterfly",
      artistId: "kendrick-lamar",
      genreIds: ["rap"],
      releaseDate: "2026-05-20",
      coverImage: "assets/images/to-pimp-a-butterfly.jpg",
      description: "A 2026 anniversary deluxe edition of Kendrick Lamar's critically acclaimed third studio album, featuring new spoken word interludes and a bonus live recording from the 2015 Grammy performance. The album blends jazz, funk, and soul with Kendrick's incisive commentary on race and identity in America.",
      isNewRelease: true,
      isBestOfYear: true,
      isFeatured: false,
      songs: [
        { id: "wesley-theory",       title: "Wesley's Theory",     albumId: "to-pimp-a-butterfly", duration: "4:46", trackNumber: 1 },
        { id: "king-kunta",          title: "King Kunta",          albumId: "to-pimp-a-butterfly", duration: "3:54", trackNumber: 2 },
        { id: "alright",             title: "Alright",             albumId: "to-pimp-a-butterfly", duration: "3:39", trackNumber: 3 },
        { id: "these-walls",         title: "These Walls",         albumId: "to-pimp-a-butterfly", duration: "5:00", trackNumber: 4 },
        { id: "mortal-man",          title: "Mortal Man",          albumId: "to-pimp-a-butterfly", duration: "12:07", trackNumber: 5 }
      ]
    },
    // ── Classical ──
    {
      id: "symphony-no-9",
      title: "Symphony No. 9 in D minor, Op. 125",
      artistId: "beethoven",
      genreIds: ["classical"],
      releaseDate: "1824-05-07",
      coverImage: "assets/images/symphony-no-9.jpg",
      description: "Beethoven's Ninth Symphony is one of the best-known works in the common practice period. Written in the final years of his life, when he was completely deaf, it is widely considered one of the supreme achievements in the history of music. The final movement features the famous 'Ode to Joy' choral setting.",
      isNewRelease: false,
      isBestOfYear: false,
      isFeatured: true,
      songs: [
        { id: "sym9-mvt1", title: "I. Allegro ma non troppo",       albumId: "symphony-no-9", duration: "15:30", trackNumber: 1 },
        { id: "sym9-mvt2", title: "II. Molto vivace",               albumId: "symphony-no-9", duration: "12:45", trackNumber: 2 },
        { id: "sym9-mvt3", title: "III. Adagio molto e cantabile",  albumId: "symphony-no-9", duration: "16:20", trackNumber: 3 },
        { id: "sym9-mvt4", title: "IV. Presto – Ode to Joy",        albumId: "symphony-no-9", duration: "24:10", trackNumber: 4 }
      ]
    },
    {
      id: "moonlight-sonata-album",
      title: "Piano Sonata No. 14 'Moonlight'",
      artistId: "beethoven",
      genreIds: ["classical"],
      releaseDate: "1802-08-01",
      coverImage: "assets/images/moonlight-sonata.jpg",
      description: "The Piano Sonata No. 14 in C-sharp minor, nicknamed the 'Moonlight Sonata', is one of Beethoven's most celebrated works. The first movement's haunting, arpeggiated accompaniment has made it one of the most recognizable pieces in classical music.",
      isNewRelease: false,
      isBestOfYear: false,
      isFeatured: false,
      songs: [
        { id: "moonlight-mvt1", title: "I. Adagio sostenuto",       albumId: "moonlight-sonata-album", duration: "6:02", trackNumber: 1 },
        { id: "moonlight-mvt2", title: "II. Allegretto",            albumId: "moonlight-sonata-album", duration: "2:15", trackNumber: 2 },
        { id: "moonlight-mvt3", title: "III. Presto agitato",       albumId: "moonlight-sonata-album", duration: "7:30", trackNumber: 3 }
      ]
    },
    {
      id: "requiem-album",
      title: "Requiem in D minor, K. 626",
      artistId: "mozart",
      genreIds: ["classical"],
      releaseDate: "1791-12-05",
      coverImage: "assets/images/mozart-requiem.jpg",
      description: "Mozart's Requiem is a requiem mass in D minor. It was composed in Vienna in 1791 and left unfinished at the composer's death. The work is considered one of the greatest choral compositions ever written, and its mysterious circumstances of composition have inspired countless legends.",
      isNewRelease: false,
      isBestOfYear: false,
      isFeatured: false,
      songs: [
        { id: "requiem-introitus",   title: "Introitus: Requiem aeternam", albumId: "requiem-album", duration: "3:45", trackNumber: 1 },
        { id: "requiem-kyrie",       title: "Kyrie eleison",               albumId: "requiem-album", duration: "3:10", trackNumber: 2 },
        { id: "requiem-dies-irae",   title: "Dies irae",                   albumId: "requiem-album", duration: "1:50", trackNumber: 3 },
        { id: "requiem-lacrimosa",   title: "Lacrimosa",                   albumId: "requiem-album", duration: "3:30", trackNumber: 4 },
        { id: "requiem-agnus-dei",   title: "Agnus Dei",                   albumId: "requiem-album", duration: "4:20", trackNumber: 5 }
      ]
    },
    {
      id: "symphony-no-40-album",
      title: "Symphony No. 40 in G minor, K. 550",
      artistId: "mozart",
      genreIds: ["classical"],
      releaseDate: "2026-06-01",
      coverImage: "assets/images/symphony-no-40.jpg",
      description: "A stunning 2026 new recording of Mozart's Symphony No. 40 by the Vienna Philharmonic, conducted by Gustavo Dudamel. This fresh interpretation brings new energy to one of Mozart's most beloved and emotionally intense symphonies, recorded in the Musikverein's Golden Hall.",
      isNewRelease: true,
      isBestOfYear: false,
      isFeatured: false,
      songs: [
        { id: "sym40-mvt1", title: "I. Molto allegro",              albumId: "symphony-no-40-album", duration: "7:45", trackNumber: 1 },
        { id: "sym40-mvt2", title: "II. Andante",                   albumId: "symphony-no-40-album", duration: "9:10", trackNumber: 2 },
        { id: "sym40-mvt3", title: "III. Menuetto: Allegretto",     albumId: "symphony-no-40-album", duration: "5:20", trackNumber: 3 },
        { id: "sym40-mvt4", title: "IV. Finale: Allegro assai",     albumId: "symphony-no-40-album", duration: "5:55", trackNumber: 4 }
      ]
    }
  ],

  // ─── REVIEWS ───────────────────────────────────────────────────────────────
  reviews: [
    {
      id: "review-001",
      targetType: "album",
      targetId: "led-zeppelin-iv",
      author: "Alex Turner",
      rating: 5,
      body: "Led Zeppelin IV is an absolute masterpiece. Stairway to Heaven alone would make this one of the greatest albums ever recorded, but every track here is a gem. The dynamic range from the delicate acoustic passages to the thunderous hard rock is unmatched. A timeless record that sounds as fresh today as it did in 1971.",
      date: "2024-03-12"
    },
    {
      id: "review-002",
      targetType: "album",
      targetId: "kind-of-blue",
      author: "Sarah Mitchell",
      rating: 5,
      body: "Kind of Blue is the perfect jazz album. Miles Davis and his ensemble created something transcendent here — the modal approach gives the music a floating, meditative quality that never gets old. So What is one of the most iconic jazz compositions ever written. Essential listening for anyone interested in music.",
      date: "2024-05-20"
    },
    {
      id: "review-003",
      targetType: "album",
      targetId: "thriller",
      author: "James Rodriguez",
      rating: 5,
      body: "Thriller is the greatest pop album ever made, full stop. Michael Jackson was operating on a completely different level here. Every single track is a hit, the production by Quincy Jones is flawless, and the songwriting is impeccable. Billie Jean and Beat It are two of the most perfect pop songs ever written.",
      date: "2024-07-08"
    },
    {
      id: "review-004",
      targetType: "artist",
      targetId: "eminem",
      author: "Marcus Johnson",
      rating: 5,
      body: "Eminem is simply the greatest rapper of all time when it comes to technical skill. His ability to construct complex rhyme schemes, his delivery, his storytelling — nobody does it better. The Marshall Mathers LP and The Slim Shady LP are two of the most important albums in hip-hop history. A true legend.",
      date: "2024-09-15"
    },
    {
      id: "review-005",
      targetType: "album",
      targetId: "symphony-no-9",
      author: "Elena Vasquez",
      rating: 5,
      body: "Beethoven's Ninth is the pinnacle of human artistic achievement. The fact that he composed this while completely deaf is almost incomprehensible. The Ode to Joy finale is one of the most emotionally overwhelming experiences in all of music. Every performance I hear reveals something new. An eternal masterpiece.",
      date: "2024-11-02"
    },
    {
      id: "review-006",
      targetType: "album",
      targetId: "nevermind",
      author: "Chris Dawson",
      rating: 5,
      body: "Nevermind changed everything. Before this album, mainstream rock was dominated by hair metal and glossy pop. Nirvana blew all of that away with raw, honest, and incredibly catchy songs. Smells Like Teen Spirit is one of the most important songs in rock history. Kurt Cobain was a generational talent.",
      date: "2024-12-18"
    },
    {
      id: "review-007",
      targetType: "album",
      targetId: "good-kid-maad-city",
      author: "Priya Sharma",
      rating: 5,
      body: "good kid, m.A.A.d city is a cinematic masterpiece. Kendrick Lamar tells the story of his youth in Compton with such vivid detail and emotional depth that it feels like watching a film. Swimming Pools and Money Trees are incredible tracks, but the album works best as a complete narrative experience.",
      date: "2025-01-25"
    },
    {
      id: "review-008",
      targetType: "artist",
      targetId: "beethoven",
      author: "Thomas Weber",
      rating: 5,
      body: "Beethoven stands alone at the summit of Western classical music. His ability to convey profound human emotion through purely instrumental means is unparalleled. From the intimate beauty of the Moonlight Sonata to the cosmic grandeur of the Ninth Symphony, his range is staggering. The greatest composer who ever lived.",
      date: "2025-03-10"
    },
    {
      id: "review-009",
      targetType: "album",
      targetId: "a-love-supreme",
      author: "Nina Okafor",
      rating: 5,
      body: "A Love Supreme is John Coltrane's spiritual testament and one of the most profound recordings in jazz history. The four-part suite builds from a simple bass motif into something transcendent. Coltrane's saxophone playing here is beyond technique — it's pure expression of the soul. A sacred recording.",
      date: "2025-04-22"
    },
    {
      id: "review-010",
      targetType: "album",
      targetId: "to-pimp-a-butterfly",
      author: "DeShawn Williams",
      rating: 5,
      body: "To Pimp a Butterfly is the most important rap album of the 21st century. Kendrick Lamar weaves together jazz, funk, spoken word, and hip-hop into a cohesive statement about Black identity in America. Alright became an anthem for the Black Lives Matter movement. This album will be studied for generations.",
      date: "2025-06-05"
    }
  ]

}; // end window.MusicData
