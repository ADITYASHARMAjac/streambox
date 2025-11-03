import { DEFAULT_MOVIES } from "./movies.js";

const API_BASE = typeof window !== "undefined" ? window.location.origin : "http://127.0.0.1:8000";

const MOVIE_FACTS = {
  1: {
    maturity: "16+",
    maturityLong: "U/A 16+",
    runtime: "1h 48m",
    views: "1,066,901 views",
    updated: "Added 1 day ago",
    cast: ["Ava Brooks", "Miles Carter", "Iris Valdez"],
    creators: ["Lena Ortiz"],
  audio: ["English (Atmos)", "Hindi", "Spanish"],
  subtitles: ["English", "Spanish"],
    tags: ["Mind-bending", "Suspenseful", "Teen Mystery"],
    about: "When portals crack open across their sleepy town, a group of friends races to rescue their missing leader before reality collapses.",
    highlights: ["Dimension-hopping thrills", "Haunting synth soundtrack", "Cliffhanger finale"],
    extras: "Includes behind-the-scenes interviews and director commentary for every episode.",
    release: "September 2023",
    resolution: "Ultra HD",
    genreLabel: "Sci-Fi Thriller",
    videoSources: {
      auto: "assets/movies/stranger-things.mp4",
      high: "assets/movies/stranger-things.mp4",
      medium: "assets/movies/stranger-things.mp4",
      low: "assets/movies/stranger-things.mp4",
    },
    captionTracks: [
      {
        label: "English (CC)",
        srclang: "en",
        kind: "captions",
        src: "assets/captions/stranger-worlds-en.vtt",
        default: true,
      },
    ],
    subtitleTracks: [
      {
        label: "English",
        srclang: "en",
        src: "assets/captions/stranger-worlds-en.vtt",
        default: true,
      },
      {
        label: "Spanish",
        srclang: "es",
        src: "assets/captions/stranger-worlds-es.vtt",
      },
    ],
  },
  2: {
    maturity: "13+",
    maturityLong: "U/A 13+",
    runtime: "2h 02m",
    views: "842,311 views",
    updated: "New this week",
    cast: ["Jun Park", "River Cole", "Sasha Malik"],
    creators: ["Elliot Zhang"],
    audio: ["English", "Korean", "Japanese"],
    subtitles: ["English", "Spanish"],
    tags: ["High-Octane", "Tech Heist", "Neon"],
    about: "An underground hacker hunts for a saboteur in a megacity's power grid before the blackout sparks chaos.",
    highlights: ["Neon-drenched action", "Pulse-pounding chase sequences", "Dynamic duo at the core"],
    extras: "Comes with an 8-minute stunt featurette and art gallery.",
    release: "May 2024",
    resolution: "Ultra HD",
    genreLabel: "Action Thriller",
    videoSources: {
      auto: "assets/movies/spiderman.mp4",
      high: "assets/movies/spiderman.mp4",
      medium: "assets/movies/spiderman.mp4",
      low: "assets/movies/spiderman.mp4",
    },
    captionTracks: [
      {
        label: "English (CC)",
        srclang: "en",
        kind: "captions",
        src: "assets/captions/neon-nights-en.vtt",
        default: true,
      },
    ],
    subtitleTracks: [
      {
        label: "English",
        srclang: "en",
        src: "assets/captions/neon-nights-en.vtt",
        default: true,
      },
      {
        label: "Spanish",
        srclang: "es",
        src: "assets/captions/neon-nights-es.vtt",
      },
    ],
  },
  3: {
    maturity: "PG",
    maturityLong: "PG",
    runtime: "1h 36m",
    views: "612,047 views",
    updated: "Just added",
    cast: ["Elena Reyes", "Theo Mercer", "Nadia Quinn"],
    creators: ["Harper Lin"],
    audio: ["English", "French"],
    subtitles: ["English", "Spanish"],
    tags: ["Heartfelt", "Musical", "Alternate Realities"],
    about: "Two musicians discover their harmonies can bridge alternate timelines—and bring their hearts together.",
    highlights: ["Sweeping original soundtrack", "Dual-timeline romance", "Bittersweet finale"],
    extras: "Acoustic performance clips and composer breakdowns included.",
    release: "November 2022",
    resolution: "HD",
    genreLabel: "Romantic Drama",
    videoSources: {
      auto: "assets/movies/purple-heart.mp4",
      high: "assets/movies/purple-heart.mp4",
      medium: "assets/movies/purple-heart.mp4",
      low: "assets/movies/purple-heart.mp4",
    },
    captionTracks: [
      {
        label: "English (CC)",
        srclang: "en",
        kind: "captions",
        src: "assets/captions/parallel-hearts-en.vtt",
        default: true,
      },
    ],
    subtitleTracks: [
      {
        label: "English",
        srclang: "en",
        src: "assets/captions/parallel-hearts-en.vtt",
        default: true,
      },
      {
        label: "Spanish",
        srclang: "es",
        src: "assets/captions/parallel-hearts-es.vtt",
      },
    ],
  },
  4: {
    maturity: "13+",
    maturityLong: "U/A 13+",
    runtime: "1h 55m",
    views: "954,772 views",
    updated: "Trending now",
    cast: ["Celeste Rhee", "Harlan Boyd", "Isla Navarro"],
    creators: ["Noah Whitaker"],
    audio: ["English", "Spanish"],
    subtitles: ["English", "Spanish"],
    tags: ["Space Survival", "Psychological", "Mystery"],
    about: "A stranded crew uncovers a mutiny aboard a rogue station as a meteor storm hurtles toward them.",
    highlights: ["Nerve-racking zero-g sequences", "Paranoia-fueled storytelling", "Jaw-dropping third act"],
    extras: "Mission brief dossiers and VFX breakdowns included.",
    release: "June 2021",
    resolution: "Ultra HD",
    genreLabel: "Sci-Fi Thriller",
    videoSources: {
      auto: "assets/movies/orbitfall.mp4",
      high: "assets/movies/orbitfall.mp4",
      medium: "assets/movies/orbitfall.mp4",
      low: "assets/movies/orbitfall.mp4",
    },
    captionTracks: [
      {
        label: "English (CC)",
        srclang: "en",
        kind: "captions",
        src: "assets/captions/orbitfall-en.vtt",
        default: true,
      },
    ],
    subtitleTracks: [
      {
        label: "English",
        srclang: "en",
        src: "assets/captions/orbitfall-en.vtt",
        default: true,
      },
      {
        label: "Spanish",
        srclang: "es",
        src: "assets/captions/orbitfall-es.vtt",
      },
    ],
  },
  5: {
    maturity: "13+",
    maturityLong: "U/A 13+",
    runtime: "2h 08m",
    views: "703,221 views",
    updated: "Popular",
    cast: ["Maya Ellis", "Gideon Price", "Rowan Blake"],
    creators: ["Sienna Falk"],
    audio: ["English", "Spanish", "Italian"],
    subtitles: ["English", "Spanish"],
    tags: ["Arthurian", "Epic", "Magic"],
    about: "A historian awakens an ancient order to stop an immortal tyrant bent on reshaping modern Britain.",
    highlights: ["Sweeping battles", "Myth-rich lore", "Strong heroine"],
    extras: "Lore guide and concept art gallery included.",
    release: "March 2020",
    resolution: "Ultra HD",
    genreLabel: "Fantasy Saga",
    videoSources: {
      auto: "assets/movies/echoes-of-avalon.mp4",
      high: "assets/movies/echoes-of-avalon.mp4",
      medium: "assets/movies/echoes-of-avalon.mp4",
      low: "assets/movies/echoes-of-avalon.mp4",
    },
    captionTracks: [
      {
        label: "English (CC)",
        srclang: "en",
        kind: "captions",
        src: "assets/captions/echoes-of-avalon-en.vtt",
        default: true,
      },
    ],
    subtitleTracks: [
      {
        label: "English",
        srclang: "en",
        src: "assets/captions/echoes-of-avalon-en.vtt",
        default: true,
      },
      {
        label: "Spanish",
        srclang: "es",
        src: "assets/captions/echoes-of-avalon-es.vtt",
      },
    ],
  },
  6: {
    maturity: "13+",
    maturityLong: "U/A 13+",
    runtime: "1h 42m",
    views: "488,913 views",
    updated: "Critics' choice",
    cast: ["Leah Morgan", "Arjun Rao", "Pia Gardener"],
    creators: ["Dominic Hale"],
    audio: ["English", "Hindi"],
    subtitles: ["English", "Spanish"],
    tags: ["Tech Drama", "Character Study", "Resilience"],
    about: "An elite developer confronts buried trauma while leading a team to build a sentient climate-defense AI.",
    highlights: ["Emotionally grounded", "Timely ethical debates", "Rousing finale"],
    extras: "Panel discussions and script-to-screen comparisons included.",
    release: "August 2024",
    resolution: "HD",
    genreLabel: "Drama",
    videoSources: {
      auto: "assets/movies/code-meridian.mp4",
      high: "assets/movies/code-meridian.mp4",
      medium: "assets/movies/code-meridian.mp4",
      low: "assets/movies/code-meridian.mp4",
    },
    captionTracks: [
      {
        label: "English (CC)",
        srclang: "en",
        kind: "captions",
        src: "assets/captions/code-meridian-en.vtt",
        default: true,
      },
    ],
    subtitleTracks: [
      {
        label: "English",
        srclang: "en",
        src: "assets/captions/code-meridian-en.vtt",
        default: true,
      },
      {
        label: "Spanish",
        srclang: "es",
        src: "assets/captions/code-meridian-es.vtt",
      },
    ],
  },
  7: {
    maturity: "16+",
    maturityLong: "U/A 16+",
    runtime: "1h 38m",
    views: "529,444 views",
    updated: "New episodes",
    cast: ["Noor Patel", "Elliot Shaw", "Greta Singh"],
    creators: ["Mason Ortiz"],
    audio: ["English", "Tamil"],
    subtitles: ["English", "Spanish"],
    tags: ["Noir", "Slow Burn", "Mystery"],
    about: "A detective who hears emotional echoes in music tracks a composer leaving victims a sonic calling card.",
    highlights: ["Moody cinematography", "Unforgettable score", "Twisty mystery"],
    extras: "Composer Q&A and playlist of featured songs included.",
    release: "October 2019",
    resolution: "HD",
    genreLabel: "Mystery Thriller",
    videoSources: {
      auto: "assets/movies/last-lullaby.mp4",
      high: "assets/movies/last-lullaby.mp4",
      medium: "assets/movies/last-lullaby.mp4",
      low: "assets/movies/last-lullaby.mp4",
    },
    captionTracks: [
      {
        label: "English (CC)",
        srclang: "en",
        kind: "captions",
        src: "assets/captions/last-lullaby-en.vtt",
        default: true,
      },
    ],
    subtitleTracks: [
      {
        label: "English",
        srclang: "en",
        src: "assets/captions/last-lullaby-en.vtt",
        default: true,
      },
      {
        label: "Spanish",
        srclang: "es",
        src: "assets/captions/last-lullaby-es.vtt",
      },
    ],
  },
  8: {
    maturity: "13+",
    maturityLong: "U/A 13+",
    runtime: "1h 47m",
    views: "467,908 views",
    updated: "In Top 10",
    cast: ["Dax Monroe", "Kana Ito", "Luca Verde"],
    creators: ["Jules Bennett"],
    audio: ["English", "Japanese"],
    subtitles: ["English", "Spanish"],
    tags: ["Time Travel", "Adventure", "Adrenaline"],
    about: "A time-surfing pilot must patch paradoxes after a racing league tears the timeline apart.",
    highlights: ["Inventive set pieces", "Time-bending twists", "High-energy soundtrack"],
    extras: "Storyboard gallery and director commentary included.",
    release: "July 2021",
    resolution: "Ultra HD",
    genreLabel: "Adventure",
    videoSources: {
      auto: "assets/movies/topguns.mp4",
      high: "assets/movies/topguns.mp4",
      medium: "assets/movies/topguns.mp4",
      low: "assets/movies/topguns.mp4",
    },
    captionTracks: [
      {
        label: "English (CC)",
        srclang: "en",
        kind: "captions",
        src: "assets/captions/chrono-drift-en.vtt",
        default: true,
      },
    ],
    subtitleTracks: [
      {
        label: "English",
        srclang: "en",
        src: "assets/captions/chrono-drift-en.vtt",
        default: true,
      },
      {
        label: "Spanish",
        srclang: "es",
        src: "assets/captions/chrono-drift-es.vtt",
      },
    ],
  },
  9: {
    maturity: "PG",
    maturityLong: "PG",
    runtime: "1h 31m",
    views: "392,540 views",
    updated: "Award-winning",
    cast: ["Leila Zhou", "Marco Fontes", "Amelia Cruz"],
    creators: ["Yara Mendes"],
    audio: ["English", "Portuguese"],
    subtitles: ["English", "Spanish"],
    tags: ["Inspiring", "Architecture", "Eco"],
    about: "Master glass artisans build vertical eco-cities and reshape the skylines of the future.",
    highlights: ["Breathtaking visuals", "Intimate artist stories", "Sustainable design insights"],
    extras: "Includes director's journal pages and extended interviews.",
    release: "April 2020",
    resolution: "Ultra HD",
    genreLabel: "Documentary",
    videoSources: {
      auto: "assets/movies/garden-of-glass.mp4",
      high: "assets/movies/garden-of-glass.mp4",
      medium: "assets/movies/garden-of-glass.mp4",
      low: "assets/movies/garden-of-glass.mp4",
    },
    captionTracks: [
      {
        label: "English (CC)",
        srclang: "en",
        kind: "captions",
        src: "assets/captions/garden-of-glass-en.vtt",
        default: true,
      },
    ],
    subtitleTracks: [
      {
        label: "English",
        srclang: "en",
        src: "assets/captions/garden-of-glass-en.vtt",
        default: true,
      },
      {
        label: "Spanish",
        srclang: "es",
        src: "assets/captions/garden-of-glass-es.vtt",
      },
    ],
  },
  10: {
    maturity: "PG",
    maturityLong: "PG",
    runtime: "1h 28m",
    views: "284,663 views",
    updated: "Family favorite",
    cast: ["Harper Lee", "Jamal Ortiz", "The Bloom Kids"],
    creators: ["Riley Donovan"],
    audio: ["English", "Spanish"],
    subtitles: ["English", "Spanish"],
    tags: ["Feel-good", "Musical", "Family"],
    about: "A traveling family band discovers harmonics that heal ecosystems as they tour a dystopian countryside.",
    highlights: ["Sing-along originals", "Family-first storytelling", "Hopeful tone"],
    extras: "Sing-along mode and lyric videos included.",
    release: "December 2018",
    resolution: "HD",
    genreLabel: "Family Musical",
    videoSources: {
      auto: "assets/movies/sonic-bloom.mp4",
      high: "assets/movies/sonic-bloom.mp4",
      medium: "assets/movies/sonic-bloom.mp4",
      low: "assets/movies/sonic-bloom.mp4",
    },
    captionTracks: [
      {
        label: "English (CC)",
        srclang: "en",
        kind: "captions",
        src: "assets/captions/sonic-bloom-en.vtt",
        default: true,
      },
    ],
    subtitleTracks: [
      {
        label: "English",
        srclang: "en",
        src: "assets/captions/sonic-bloom-en.vtt",
        default: true,
      },
      {
        label: "Spanish",
        srclang: "es",
        src: "assets/captions/sonic-bloom-es.vtt",
      },
    ],
  },
};

const dom = {
  pageLoader: document.getElementById("pageLoader"),
  video: document.getElementById("movieVideo"),
  backdrop: document.getElementById("movieBackdrop"),
  loader: document.getElementById("movieLoader"),
  error: document.getElementById("movieError"),
  playToggle: document.getElementById("moviePlayToggle"),
  primaryPlay: document.getElementById("moviePrimaryPlay"),
  muteToggle: document.getElementById("movieMuteToggle"),
  fullscreen: document.getElementById("movieFullscreenToggle"),
  settingsToggle: document.getElementById("movieSettingsToggle"),
  settingsPanel: document.getElementById("movieSettingsPanel"),
  settingsClose: document.getElementById("movieSettingsClose"),
  qualitySelect: document.getElementById("movieQualitySelect"),
  captionsToggle: document.getElementById("movieCaptionsToggle"),
  subtitlesSelect: document.getElementById("movieSubtitleSelect"),
  audioSelect: document.getElementById("movieAudioSelect"),
  settingsStatus: document.getElementById("movieSettingsStatus"),
  seek: document.getElementById("movieSeek"),
  timeCurrent: document.getElementById("movieTimeCurrent"),
  timeDuration: document.getElementById("movieTimeDuration"),
  badge: document.getElementById("movieBadge"),
  title: document.getElementById("movieTitle"),
  statViews: document.getElementById("movieStatViews"),
  statUpdated: document.getElementById("movieStatUpdated"),
  year: document.getElementById("movieYear"),
  rating: document.getElementById("movieRating"),
  duration: document.getElementById("movieDuration"),
  genre: document.getElementById("movieGenre"),
  description: document.getElementById("movieDescription"),
  cast: document.getElementById("movieCast"),
  creators: document.getElementById("movieCreators"),
  audio: document.getElementById("movieAudio"),
  subtitles: document.getElementById("movieSubtitles"),
  tags: document.getElementById("movieTags"),
  recommendations: document.getElementById("movieRecommendations"),
  about: document.getElementById("movieAbout"),
  release: document.getElementById("movieRelease"),
  maturity: document.getElementById("movieMaturity"),
  sidebarGenre: document.getElementById("movieSidebarGenre"),
  extras: document.getElementById("movieExtras"),
  highlights: document.getElementById("movieHighlights"),
  addList: document.getElementById("movieAddList"),
};

const state = {
  catalog: [],
  movie: null,
  facts: null,
  isScrubbing: false,
  wasPlayingBeforeScrub: false,
  addedToList: false,
  settings: {
    quality: "auto",
    captions: false,
    subtitles: "english",
    audio: "original",
  },
  videoSources: {},
  captionTracks: {},
  subtitleTracks: {},
};

let settingsStatusTimer = null;

function showPageLoader() {
  if (!dom.pageLoader) return;
  dom.pageLoader.classList.add("page-loader--active");
  dom.pageLoader.setAttribute("aria-busy", "true");
}

function hidePageLoader() {
  if (!dom.pageLoader) return;
  dom.pageLoader.classList.remove("page-loader--active");
  dom.pageLoader.setAttribute("aria-busy", "false");
}

function qs(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function resolveAssetPath(path, kind) {
  if (!path) return "";
  const trimmed = path.trim();
  if (/^(?:https?:)?\/\//i.test(trimmed) || trimmed.startsWith("data:")) return trimmed;
  if (trimmed.startsWith("/")) return `${API_BASE}${trimmed}`;
  const ensureStaticPrefix = (value) => `/static/${value.replace(/^\/+/g, "")}`;
  if (trimmed.startsWith("assets/")) return ensureStaticPrefix(trimmed);
  if (trimmed.startsWith("static/")) return `/${trimmed.replace(/^\/+/g, "")}`;
  if (trimmed.includes("/")) return ensureStaticPrefix(trimmed);
  const folder = kind === "background" ? "assets/backgrounds" : kind === "thumbnail" ? "assets/thumbnails" : "assets";
  return ensureStaticPrefix(`${folder}/${trimmed}`);
}

function formatTime(seconds) {
  const total = Math.max(0, Math.floor(Number(seconds) || 0));
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function formatList(items) {
  if (!items) return "―";
  if (Array.isArray(items)) {
    return items.length ? items.join(", ") : "―";
  }
  return String(items);
}

function setText(node, value, fallback = "―") {
  if (!node) return;
  node.textContent = value && value !== "" ? value : fallback;
}

function slugifyOption(value, fallback = "option") {
  const slug = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

function syncSelectOptions(select, items = [], { includeOff = false } = {}) {
  if (!select) return {};
  const added = new Set();
  const optionMap = {};
  select.innerHTML = "";

  items.forEach((item, index) => {
    if (!item) return;
    const rawLabel = typeof item === "string" ? item : item.label || item.name;
    if (!rawLabel) return;
    const label = String(rawLabel).trim();
    if (!label) return;
    const key = String(typeof item === "object" && item.value ? item.value : slugifyOption(label, `option-${index}`));
    if (added.has(key)) return;
    added.add(key);
    const option = document.createElement("option");
    option.value = key;
    option.textContent = label;
    option.dataset.label = label;
    if (typeof item === "object") {
      Object.entries(item).forEach(([prop, value]) => {
        if (value === undefined || value === null) return;
        if (prop === "label" || prop === "value") return;
        option.dataset[prop] = String(value);
      });
    }
    select.append(option);
    optionMap[key] = {
      label,
      data: typeof item === "object" ? { ...item } : {},
    };
  });

  if (includeOff) {
    if (!added.has("off")) {
      const option = document.createElement("option");
      option.value = "off";
      option.textContent = "Off";
      option.dataset.label = "Off";
      select.append(option);
      optionMap.off = { label: "Off", data: {} };
      added.add("off");
    }
  }

  return optionMap;
}

function setSelectValue(select, value) {
  if (!select) return "";
  const options = Array.from(select.options || []);
  const match = options.find((option) => option.value === value);
  const resolved = match ? match.value : options[0]?.value || "";
  select.value = resolved;
  return resolved;
}

function getOptionLabel(select, value) {
  if (!select) return "";
  const options = Array.from(select.options || []);
  const match = options.find((option) => option.value === value) || options.find((option) => option.selected);
  if (!match) return "";
  return match.dataset.label || match.textContent || match.value;
}

function buildVideoSources(movie, facts) {
  const sources = {};
  const factSources = facts?.videoSources && typeof facts.videoSources === "object" ? facts.videoSources : null;
  if (factSources) {
    Object.entries(factSources).forEach(([quality, src]) => {
      if (!src) return;
      const key = String(quality || "").toLowerCase() || "auto";
      sources[key] = resolveAssetPath(src, "video");
    });
  }
  if (movie?.video_url) {
    const raw = String(movie.video_url);
    let resolved = "";
    if (/^(?:https?:)?\/\//i.test(raw)) {
      resolved = raw;
    } else if (raw.startsWith("/")) {
      resolved = `${API_BASE}${raw}`;
    } else {
      resolved = resolveAssetPath(raw, "video");
    }
    if (resolved) {
      if (!sources.auto) {
        sources.auto = resolved;
      } else if (!sources.fallback) {
        sources.fallback = resolved;
      }
    }
  }
  if (!sources.auto && sources.fallback) {
    sources.auto = sources.fallback;
    delete sources.fallback;
  }
  return sources;
}

function normalizeTrackEntry(entry, index, fallbackKind) {
  if (!entry) return null;
  if (typeof entry === "string") {
    return {
      key: slugifyOption(entry, `${fallbackKind}-${index}`),
      label: entry,
      srclang: slugifyOption(entry, `lang-${index}`),
      kind: fallbackKind,
      src: "",
    };
  }
  const label = entry.label || entry.name || `Track ${index + 1}`;
  const srclang = entry.srclang || entry.language || slugifyOption(label, `lang-${index}`);
  const key = entry.value || slugifyOption(srclang || label, `${fallbackKind}-${index}`);
  return {
    key,
    label,
    srclang: String(srclang || "").toLowerCase(),
    kind: entry.kind || fallbackKind,
    src: entry.src || "",
    default: Boolean(entry.default),
  };
}

function buildTrackMap(tracks, fallbackKind) {
  const map = {};
  (Array.isArray(tracks) ? tracks : []).forEach((entry, index) => {
    const normalized = normalizeTrackEntry(entry, index, fallbackKind);
    if (!normalized || !normalized.src) return;
    const key = normalized.key || slugifyOption(normalized.srclang || normalized.label, `${fallbackKind}-${index}`);
    map[key] = {
      ...normalized,
      src: resolveAssetPath(normalized.src, "asset"),
    };
  });
  return map;
}

function applyTrackElements() {
  if (!dom.video) return;
  const existing = Array.from(dom.video.querySelectorAll("track[data-dynamic-track='true']"));
  existing.forEach((track) => track.remove());

  const appendTrack = (trackInfo) => {
    if (!trackInfo?.src) return;
    const track = document.createElement("track");
    track.setAttribute("data-dynamic-track", "true");
    track.label = trackInfo.label || "";
    track.kind = trackInfo.kind || "subtitles";
    track.srclang = trackInfo.srclang || "";
    track.src = trackInfo.src;
    if (trackInfo.default) {
      track.default = true;
    }
    dom.video.appendChild(track);
  };

  Object.values(state.captionTracks).forEach(appendTrack);
  Object.values(state.subtitleTracks).forEach(appendTrack);

  updateTextTrackModes();
}

function updateTextTrackModes() {
  if (!dom.video || !dom.video.textTracks) return;
  Array.from(dom.video.textTracks).forEach((track) => {
    if (!track) return;
    const language = String(track.language || "").toLowerCase();
    if (track.kind === "captions") {
      track.mode = state.settings.captions ? "showing" : "disabled";
    } else if (track.kind === "subtitles") {
      if (state.settings.subtitles === "off") {
        track.mode = "disabled";
      } else {
        track.mode = language === state.settings.subtitles ? "showing" : "disabled";
      }
    } else {
      track.mode = "disabled";
    }
  });
}

async function fetchCatalog() {
  if (state.catalog.length) {
    return state.catalog;
  }
  try {
    const response = await fetch(`${API_BASE}/movies`);
    if (response.ok) {
      const payload = await response.json();
      const items = Array.isArray(payload) ? payload : payload.items || [];
      if (items.length) {
        state.catalog = items.slice();
        return state.catalog;
      }
    }
  } catch (error) {
    console.warn("Falling back to local catalog", error);
  }
  state.catalog = DEFAULT_MOVIES.slice();
  return state.catalog;
}

async function fetchMovie(id) {
  try {
    const res = await fetch(`${API_BASE}/movies/${id}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.warn("Movie fetch failed, using fallback", error);
  }
  const catalog = await fetchCatalog();
  return catalog.find((movie) => String(movie.id) === String(id)) || null;
}

function createDefaultFacts(movie) {
  return {
    maturity: movie.rating,
    maturityLong: movie.rating,
    runtime: "1h 45m",
    views: "Trending now",
    updated: `${movie.year}`,
    cast: [movie.title, "Cast coming soon"],
    creators: ["StreamBox Originals"],
    audio: ["English"],
    subtitles: ["English"],
    tags: [movie.genre],
    about: movie.description,
    highlights: ["Beautiful storytelling", "Cinematic visuals"],
    extras: "Bonus materials coming soon.",
    release: String(movie.year),
    resolution: "HD",
    genreLabel: movie.genre,
  };
}

function renderTags(tags) {
  if (!dom.tags) return;
  dom.tags.innerHTML = "";
  (tags || []).forEach((tag) => {
    const span = document.createElement("span");
    span.className = "chip";
    span.textContent = tag;
    dom.tags.appendChild(span);
  });
}

function renderHighlights(list) {
  if (!dom.highlights) return;
  dom.highlights.innerHTML = "";
  (list || []).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    dom.highlights.appendChild(li);
  });
}

function renderRecommendations(currentMovie) {
  if (!dom.recommendations) return;
  const catalog = state.catalog.filter((item) => String(item.id) !== String(currentMovie.id));
  const sameGenre = catalog.filter((item) => item.genre === currentMovie.genre);
  const others = catalog.filter((item) => item.genre !== currentMovie.genre);
  const picks = [...sameGenre, ...others].slice(0, 6);
  dom.recommendations.innerHTML = "";
  if (!picks.length) {
    const empty = document.createElement("p");
    empty.className = "sidebar-card__meta";
    empty.textContent = "No recommendations available.";
    dom.recommendations.appendChild(empty);
    return;
  }
  picks.forEach((movie) => {
    const card = document.createElement("a");
    card.className = "sidebar-card";
  card.href = `/movie?id=${encodeURIComponent(movie.id)}`;

    const thumb = document.createElement("div");
    thumb.className = "sidebar-card__thumb";
    const thumbUrl = resolveAssetPath(movie.thumbnail_url, "thumbnail");
    if (thumbUrl) {
      thumb.style.backgroundImage = `url('${thumbUrl}')`;
    }

    const body = document.createElement("div");
    body.className = "sidebar-card__body";

    const title = document.createElement("h3");
    title.className = "sidebar-card__title";
    title.textContent = movie.title;

    const meta = document.createElement("p");
    meta.className = "sidebar-card__meta";
    meta.textContent = `${movie.genre} • ${movie.year}`;

    body.append(title, meta);
    card.append(thumb, body);
    dom.recommendations.appendChild(card);
  });
}

function showLoader() {
  if (dom.loader) dom.loader.hidden = false;
}

function hideLoader() {
  if (dom.loader) dom.loader.hidden = true;
}

function showError(message) {
  if (!dom.error) return;
  dom.error.textContent = message;
  dom.error.hidden = false;
}

function clearError() {
  if (!dom.error) return;
  dom.error.hidden = true;
  dom.error.textContent = "";
}

function updatePlayButtons() {
  if (!dom.video) return;
  const label = dom.video.paused ? (dom.video.ended ? "Replay" : "Play") : "Pause";
  if (dom.playToggle) dom.playToggle.textContent = label;
  if (dom.primaryPlay) dom.primaryPlay.textContent = label;
}

function updateMuteButton() {
  if (!dom.video || !dom.muteToggle) return;
  dom.muteToggle.textContent = dom.video.muted || dom.video.volume === 0 ? "Unmute" : "Mute";
}

function updateTimeline() {
  if (!dom.video || !dom.seek || state.isScrubbing) return;
  const duration = dom.video.duration || 0;
  const current = dom.video.currentTime || 0;
  if (duration > 0) {
    dom.seek.value = String(Math.floor((current / duration) * 1000));
    setText(dom.timeDuration, formatTime(duration));
  } else {
    dom.seek.value = "0";
    setText(dom.timeDuration, "0:00");
  }
  setText(dom.timeCurrent, formatTime(current));
}

function setVideoSource(quality = state.settings.quality || "auto", { preserveTime = false, autoplay = true } = {}) {
  if (!dom.video) return Promise.resolve();

  const normalizedQuality = String(quality || "auto").toLowerCase();
  const sources = state.videoSources || {};
  const availableKeys = Object.keys(sources).filter((key) => key !== "fallback");
  let resolvedQuality = normalizedQuality;
  let source = sources[normalizedQuality];
  if (!source) {
    if (sources.auto) {
      resolvedQuality = "auto";
      source = sources.auto;
    } else if (availableKeys.length) {
      resolvedQuality = availableKeys[0];
      source = sources[resolvedQuality];
    }
  }
  if (!source && sources.fallback) {
    resolvedQuality = "auto";
    source = sources.fallback;
  }

  if (!source) {
    hideLoader();
    showError("No video source configured for this title.");
    updatePlayButtons();
    return Promise.resolve();
  }

  const movie = state.movie;
  const posterUrl = movie ? resolveAssetPath(movie.background_url, "background") : "";
  if (posterUrl) {
    dom.video.setAttribute("poster", posterUrl);
  } else {
    dom.video.removeAttribute("poster");
  }
  if (posterUrl && dom.backdrop) {
    dom.backdrop.style.backgroundImage = `url('${posterUrl}')`;
  }

  const resumeFrom = preserveTime ? Math.max(0, dom.video.currentTime || 0) : 0;
  const wasPlaying = !dom.video.paused && !dom.video.ended;
  const shouldAutoplay = autoplay !== false;
  const resumePlayback = shouldAutoplay && (!preserveTime || wasPlaying);

  showLoader();
  clearError();
  dom.video.pause();

  state.settings.quality = resolvedQuality;
  if (dom.qualitySelect) {
    setSelectValue(dom.qualitySelect, resolvedQuality);
  }

  return new Promise((resolve) => {
    const handleLoadedMetadata = async () => {
      dom.video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      if (preserveTime && resumeFrom > 0 && Number.isFinite(dom.video.duration)) {
        dom.video.currentTime = Math.min(resumeFrom, Math.max(dom.video.duration - 0.25, 0));
      }
      updateMuteButton();
      updatePlayButtons();
      updateTextTrackModes();
      if (resumePlayback) {
        try {
          await dom.video.play();
        } catch (error) {
          showError("Playback paused. Press Play to continue.");
        }
      }
      resolve();
    };

    dom.video.addEventListener("loadedmetadata", handleLoadedMetadata, { once: true });
    dom.video.dataset.quality = resolvedQuality;
    dom.video.src = source;
    dom.video.load();
    if (!resumePlayback) {
      updatePlayButtons();
    }
  });
}

function playVideo() {
  if (!dom.video) return;
  dom.video.play().catch(() => {
    showError("Unable to start playback. Press Play to retry.");
  });
}

function pauseVideo() {
  if (!dom.video) return;
  dom.video.pause();
}

function togglePlay() {
  if (!dom.video) return;
  if (dom.video.paused || dom.video.ended) {
    playVideo();
  } else {
    pauseVideo();
  }
}

function toggleMute() {
  if (!dom.video) return;
  dom.video.muted = !dom.video.muted;
  updateMuteButton();
}

function toggleFullscreen() {
  const container = dom.video?.closest?.(".movie-player");
  if (!container) return;
  if (!document.fullscreenElement) {
    container.requestFullscreen?.().catch(() => {});
  } else {
    document.exitFullscreen?.().catch(() => {});
  }
}

function isSettingsPanelOpen() {
  return !!dom.settingsPanel && !dom.settingsPanel.hidden;
}

function openSettingsPanel() {
  if (!dom.settingsPanel) return;
  dom.settingsPanel.hidden = false;
  dom.settingsPanel.classList.add("movie-settings--open");
  dom.settingsPanel.setAttribute("aria-hidden", "false");
  if (dom.settingsToggle) {
    dom.settingsToggle.setAttribute("aria-expanded", "true");
  }
  updateSettingsStatus();
  const focusTarget = dom.settingsPanel.querySelector("select, button, input");
  if (focusTarget instanceof HTMLElement) {
    focusTarget.focus({ preventScroll: true });
  }
}

function closeSettingsPanel({ restoreFocus = false } = {}) {
  if (!dom.settingsPanel) return;
  dom.settingsPanel.hidden = true;
  dom.settingsPanel.classList.remove("movie-settings--open");
  dom.settingsPanel.setAttribute("aria-hidden", "true");
  if (dom.settingsToggle) {
    dom.settingsToggle.setAttribute("aria-expanded", "false");
    if (restoreFocus) {
      dom.settingsToggle.focus({ preventScroll: true });
    }
  }
  updateSettingsStatus();
}

function toggleSettingsPanel(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  if (isSettingsPanelOpen()) {
    closeSettingsPanel({ restoreFocus: true });
  } else {
    openSettingsPanel();
  }
}

function handleDocumentClick(event) {
  if (!isSettingsPanelOpen()) return;
  const target = event.target;
  if (!(target instanceof Node)) return;
  if (dom.settingsPanel?.contains(target)) return;
  if (dom.settingsToggle?.contains?.(target)) return;
  closeSettingsPanel({ restoreFocus: false });
}

function handleSettingsKeydown(event) {
  if (event.key === "Escape" && isSettingsPanelOpen()) {
    event.preventDefault();
    closeSettingsPanel({ restoreFocus: true });
  }
}

function setSettingsStatus(message, persist = false) {
  if (!dom.settingsStatus) return;
  dom.settingsStatus.textContent = message;
  if (settingsStatusTimer) {
    clearTimeout(settingsStatusTimer);
    settingsStatusTimer = null;
  }
  if (!persist) {
    settingsStatusTimer = setTimeout(() => {
      settingsStatusTimer = null;
      updateSettingsStatus();
    }, 2400);
  }
}

function updateSettingsStatus() {
  if (!dom.settingsStatus) return;
  const summary = [];
  if (dom.qualitySelect) {
    summary.push(`Quality: ${getOptionLabel(dom.qualitySelect, state.settings.quality) || "Auto"}`);
  }
  summary.push(`Captions: ${state.settings.captions ? "On" : "Off"}`);
  if (dom.subtitlesSelect) {
    summary.push(`Subtitles: ${getOptionLabel(dom.subtitlesSelect, state.settings.subtitles) || "Off"}`);
  }
  if (dom.audioSelect) {
    summary.push(`Audio: ${getOptionLabel(dom.audioSelect, state.settings.audio) || "Original"}`);
  }
  dom.settingsStatus.textContent = summary.join(" • ");
}

function handleQualityChange() {
  if (!dom.qualitySelect) return;
  const selected = dom.qualitySelect.value || "auto";
  const wasPlaying = dom.video && !dom.video.paused && !dom.video.ended;
  state.settings.quality = selected;
  setVideoSource(selected, { preserveTime: true, autoplay: wasPlaying }).then(() => {
    setSettingsStatus(`Quality set to ${getOptionLabel(dom.qualitySelect, state.settings.quality) || "Auto"}`);
  });
}

function handleCaptionsToggle() {
  if (!dom.captionsToggle) return;
  state.settings.captions = !!dom.captionsToggle.checked;
  updateTextTrackModes();
  setSettingsStatus(`Captions ${state.settings.captions ? "enabled" : "disabled"}`);
}

function handleSubtitleChange() {
  if (!dom.subtitlesSelect) return;
  state.settings.subtitles = dom.subtitlesSelect.value || "off";
  updateTextTrackModes();
  setSettingsStatus(`Subtitles set to ${getOptionLabel(dom.subtitlesSelect, state.settings.subtitles) || "Off"}`);
}

function handleAudioChange() {
  if (!dom.audioSelect) return;
  state.settings.audio = dom.audioSelect.value || "original";
  setSettingsStatus(`Audio set to ${getOptionLabel(dom.audioSelect, state.settings.audio) || "Original"}`);
}

function deriveQualityDefault(facts) {
  const resolution = String(facts?.resolution || "").toLowerCase();
  if (resolution.includes("ultra") || resolution.includes("4k")) return "high";
  if (resolution.includes("hd")) return "medium";
  return "auto";
}

function resetSettings() {
  const availableQualities = Object.keys(state.videoSources || {});
  const defaultQuality = deriveQualityDefault(state.facts);
  const qualityFallback = availableQualities.includes(defaultQuality)
    ? defaultQuality
    : availableQualities.includes("auto")
      ? "auto"
      : availableQualities[0] || "auto";
  state.settings.quality = setSelectValue(dom.qualitySelect, qualityFallback) || qualityFallback;

  const hasCaptions = Object.keys(state.captionTracks || {}).length > 0;
  state.settings.captions = hasCaptions && Object.values(state.captionTracks).some((track) => track.default);
  if (dom.captionsToggle) {
    dom.captionsToggle.checked = state.settings.captions;
    dom.captionsToggle.disabled = !hasCaptions;
    dom.captionsToggle.setAttribute("aria-disabled", hasCaptions ? "false" : "true");
  }

  const subtitleKeys = Object.keys(state.subtitleTracks || {});
  const preferredSubtitle = subtitleKeys.find((key) => state.subtitleTracks[key]?.default);
  const subtitleChoice = preferredSubtitle || (subtitleKeys.length ? subtitleKeys[0] : "off");
  state.settings.subtitles = setSelectValue(dom.subtitlesSelect, subtitleChoice) || subtitleChoice;
  if (dom.subtitlesSelect) {
    dom.subtitlesSelect.disabled = subtitleKeys.length === 0;
  }

  const audioDefault = slugifyOption(state.facts?.audio?.[0], "original");
  state.settings.audio = setSelectValue(dom.audioSelect, audioDefault) || audioDefault;

  updateTextTrackModes();
  updateSettingsStatus();
  setSettingsStatus("Playback settings ready", false);
}

function updateSettingsOptions() {
  const availableQualities = new Set(Object.keys(state.videoSources || {}));
  if (dom.qualitySelect) {
    Array.from(dom.qualitySelect.options || []).forEach((option) => {
      const key = String(option.value || "").toLowerCase();
      if (key === "auto") {
        option.disabled = !availableQualities.has("auto");
      } else {
        option.disabled = !availableQualities.has(key);
      }
    });
  }

  const hasCaptions = Object.keys(state.captionTracks || {}).length > 0;
  if (dom.captionsToggle) {
    dom.captionsToggle.disabled = !hasCaptions;
    dom.captionsToggle.setAttribute("aria-disabled", hasCaptions ? "false" : "true");
  }

  const subtitleOptions = Object.entries(state.subtitleTracks || {}).map(([key, track]) => ({
    value: key,
    label: track.label,
    srclang: track.srclang,
  }));
  syncSelectOptions(dom.subtitlesSelect, subtitleOptions, { includeOff: true });
  if (dom.subtitlesSelect) {
    dom.subtitlesSelect.disabled = subtitleOptions.length === 0;
  }

  const audioItems = Array.isArray(state.facts?.audio) && state.facts.audio.length ? state.facts.audio : ["Original"];
  syncSelectOptions(dom.audioSelect, audioItems);
}

function bindPlayerEvents() {
  if (!dom.video) return;
  dom.video.addEventListener("loadedmetadata", () => {
    hideLoader();
    updateTimeline();
    updatePlayButtons();
    updateMuteButton();
  });
  dom.video.addEventListener("timeupdate", updateTimeline);
  dom.video.addEventListener("play", () => {
    hideLoader();
    clearError();
    updatePlayButtons();
  });
  dom.video.addEventListener("pause", updatePlayButtons);
  dom.video.addEventListener("waiting", showLoader);
  dom.video.addEventListener("playing", () => {
    hideLoader();
    updatePlayButtons();
  });
  dom.video.addEventListener("ended", updatePlayButtons);
  dom.video.addEventListener("error", () => {
    hideLoader();
    showError("Video unavailable. Make sure the backend streaming service is running.");
    updatePlayButtons();
  });
}

function bindControlEvents() {
  if (dom.settingsToggle && dom.settingsPanel) {
    dom.settingsToggle.setAttribute("aria-haspopup", "dialog");
    dom.settingsToggle.setAttribute("aria-controls", dom.settingsPanel.id);
    dom.settingsToggle.setAttribute("aria-expanded", "false");
    dom.settingsPanel.setAttribute("role", "dialog");
    dom.settingsPanel.setAttribute("aria-hidden", "true");
    dom.settingsPanel.setAttribute("aria-label", "Playback settings");
  }

  dom.playToggle?.addEventListener("click", togglePlay);
  dom.primaryPlay?.addEventListener("click", () => {
    clearError();
    togglePlay();
  });
  dom.muteToggle?.addEventListener("click", toggleMute);
  dom.fullscreen?.addEventListener("click", toggleFullscreen);
  dom.settingsToggle?.addEventListener("click", toggleSettingsPanel);
  dom.settingsClose?.addEventListener("click", (event) => {
    event.preventDefault();
    closeSettingsPanel({ restoreFocus: true });
  });

  dom.seek?.addEventListener("pointerdown", () => {
    if (!dom.video) return;
    state.isScrubbing = true;
    state.wasPlayingBeforeScrub = !dom.video.paused;
    dom.video.pause();
  });

  dom.seek?.addEventListener("pointerup", () => {
    if (!dom.video) return;
    state.isScrubbing = false;
    if (dom.video.duration) {
      const percent = Number(dom.seek.value) / 1000;
      dom.video.currentTime = dom.video.duration * percent;
    }
    if (state.wasPlayingBeforeScrub) {
      dom.video.play().catch(() => {
        showError("Unable to resume playback.");
      });
    }
    state.wasPlayingBeforeScrub = false;
  });

  dom.seek?.addEventListener("input", () => {
    if (!dom.video || !dom.video.duration) return;
    const percent = Number(dom.seek.value) / 1000;
    const preview = dom.video.duration * percent;
    setText(dom.timeCurrent, formatTime(preview));
  });

  dom.seek?.addEventListener("change", () => {
    if (!dom.video || !dom.video.duration) return;
    const percent = Number(dom.seek.value) / 1000;
    dom.video.currentTime = dom.video.duration * percent;
    if (!dom.video.paused) {
      clearError();
    }
  });

  dom.addList?.addEventListener("click", () => {
    state.addedToList = !state.addedToList;
    dom.addList.textContent = state.addedToList ? "✓ Added" : "+ My List";
  });

  dom.qualitySelect?.addEventListener("change", handleQualityChange);
  dom.captionsToggle?.addEventListener("change", handleCaptionsToggle);
  dom.subtitlesSelect?.addEventListener("change", handleSubtitleChange);
  dom.audioSelect?.addEventListener("change", handleAudioChange);

  document.addEventListener("keydown", handleSettingsKeydown);
  document.addEventListener("click", handleDocumentClick, { capture: true });

}

function bindNavigation() {
  const backPrimary = document.getElementById("movieBackButton");
  const backSheet = document.getElementById("movieBackButtonSheet");
  const navToggle = document.getElementById("navToggle");

  const goBack = () => {
    if (history.length > 1) {
      history.back();
    } else {
  window.location.href = "/";
    }
  };

  backPrimary?.addEventListener("click", goBack);
  backSheet?.addEventListener("click", () => {
    if (navToggle) navToggle.checked = false;
    goBack();
  });

  document.querySelectorAll(".nav__sheet .nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navToggle) navToggle.checked = false;
    });
  });

  const nav = document.querySelector(".nav");
  if (nav) {
    window.addEventListener("scroll", () => {
      nav.classList.toggle("nav--scrolled", window.scrollY > 10);
    });
  }
}

async function applyMovie(movie, facts) {
  state.movie = movie;
  state.facts = facts;

  if (!state.catalog.some((item) => String(item.id) === String(movie.id))) {
    state.catalog.push({ ...movie });
  }

  setText(dom.title, movie.title);
  setText(dom.statViews, facts.views);
  setText(dom.statUpdated, facts.updated);
  setText(dom.year, movie.year);
  setText(dom.rating, facts.maturityLong || facts.maturity || movie.rating);
  setText(dom.duration, facts.runtime);
  setText(dom.genre, facts.genreLabel || movie.genre);
  setText(dom.description, movie.description);
  setText(dom.badge, facts.maturity || movie.rating);
  setText(dom.cast, formatList(facts.cast));
  setText(dom.creators, formatList(facts.creators));
  setText(dom.audio, formatList(facts.audio));
  setText(dom.subtitles, formatList(facts.subtitles));
  setText(dom.about, facts.about);
  setText(dom.release, facts.release);
  setText(dom.maturity, facts.maturityLong || facts.maturity || movie.rating);
  setText(dom.sidebarGenre, facts.genreLabel || movie.genre);
  setText(dom.extras, facts.extras);

  renderTags(facts.tags);
  renderHighlights(facts.highlights);
  renderRecommendations(movie);

  state.videoSources = buildVideoSources(movie, facts);
  state.captionTracks = buildTrackMap(facts.captionTracks, "captions");
  state.subtitleTracks = buildTrackMap(facts.subtitleTracks, "subtitles");

  updateSettingsOptions();
  applyTrackElements();
  resetSettings();

  hidePageLoader();
  await setVideoSource(state.settings.quality, { preserveTime: false, autoplay: true });
}

async function init() {
  showPageLoader();
  bindNavigation();
  bindPlayerEvents();
  bindControlEvents();

  const movieId = qs("id");
  if (!movieId) {
    hidePageLoader();
  window.location.href = "/";
    return;
  }

  await fetchCatalog();
  const movie = await fetchMovie(movieId);
  if (!movie) {
    setText(dom.title, "Movie not found");
    showError("Unable to load this title. Try selecting another movie from the catalog.");
    hidePageLoader();
    return;
  }

  const facts = { ...createDefaultFacts(movie), ...(MOVIE_FACTS[movie.id] || {}) };
  await applyMovie(movie, facts);
}

init();
