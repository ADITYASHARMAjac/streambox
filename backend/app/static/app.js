import { DEFAULT_MOVIES } from "./movies.js";

const API_BASE = typeof window !== "undefined" ? window.location.origin : "http://127.0.0.1:8000";
const USE_LOCAL_ONLY = (() => {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    const stored = localStorage.getItem("streambox_use_local_only");
    if (stored === "true") {
      return true;
    }
    if (stored === "false") {
      return false;
    }
  } catch (error) {
    console.warn("Unable to read local storage toggle; defaulting to API mode.", error);
  }
  return false;
})();
const LOCAL_DATA_KEY = "streambox_local_data";

const state = {
  token: localStorage.getItem("streambox_token"),
  profile: localStorage.getItem("streambox_profile")
    ? JSON.parse(localStorage.getItem("streambox_profile"))
    : null,
  movies: [],
  watchlist: [],
};

const dom = {
  pageLoader: document.getElementById("pageLoader"),
  hero: document.getElementById("hero"),
  trendingRow: document.getElementById("trendingRow"),
  popularRow: document.getElementById("popularRow"),
  newReleasesRow: document.getElementById("newReleasesRow"),
  watchlistRow: document.getElementById("watchlistRow"),
  watchlistEmpty: document.getElementById("watchlistEmpty"),
  year: document.getElementById("year"),
  loginButtonSheet: document.getElementById("loginButtonSheet"),
  logoutButtonSheet: document.getElementById("logoutButtonSheet"),
  profileMenuSheet: document.getElementById("profileMenuSheet"),
  profileNameSheet: document.getElementById("profileNameSheet"),
  navToggle: document.getElementById("navToggle"),
  modal: document.getElementById("authModal"),
  modalClose: document.getElementById("modalClose"),
  loginForm: document.getElementById("loginForm"),
  registerForm: document.getElementById("registerForm"),
  loginTab: document.getElementById("loginTab"),
  registerTab: document.getElementById("registerTab"),
  loginMessage: document.querySelector('[data-message="login"]'),
  registerMessage: document.querySelector('[data-message="register"]'),
  cardTemplate: document.getElementById("cardTemplate"),
  player: document.getElementById("player"),
  playerVideo: document.getElementById("playerVideo"),
  playerClose: document.getElementById("playerClose"),
  playerTitle: document.getElementById("playerTitle"),
  playerMeta: document.getElementById("playerMeta"),
  playerDescription: document.getElementById("playerDescription"),
  playerPlay: document.getElementById("playerPlay"),
  playerMute: document.getElementById("playerMute"),
  playerTimeline: document.getElementById("playerTimeline"),
  playerCurrentTime: document.getElementById("playerCurrentTime"),
  playerDuration: document.getElementById("playerDuration"),
  playerLoader: document.getElementById("playerLoader"),
  playerError: document.getElementById("playerError"),
};

dom.year.textContent = new Date().getFullYear();

const playerState = {
  activeMovie: null,
  isScrubbing: false,
  wasPlayingBeforeScrub: false,
};

const curatedRowConfigs = [
  {
    key: "newReleasesRow",
    filter: (movie) => Number(movie.year) >= 2023,
    sort: (a, b) => Number(b.year) - Number(a.year),
    limit: 6,
    min: 4,
  },
];

function genreMatches(movie, genres) {
  if (!movie || !movie.genre) {
    return false;
  }
  const value = movie.genre.toLowerCase();
  return genres.some((genre) => value.includes(String(genre).toLowerCase()));
}

function dedupeMovies(movies) {
  const list = Array.isArray(movies) ? movies : [];
  const seen = new Set();
  return list.filter((movie) => {
    if (!movie || seen.has(movie.id)) {
      return false;
    }
    seen.add(movie.id);
    return true;
  });
}

function getRandomSubset(movies, count) {
  const copy = dedupeMovies(movies).slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return typeof count === "number" ? copy.slice(0, count) : copy;
}

function selectMoviesForConfig(config) {
  const all = dedupeMovies(state.movies);
  if (!all.length) {
    return [];
  }

  let selection;
  if (typeof config.transform === "function") {
    selection = dedupeMovies(config.transform(all.slice()));
  } else {
    const filtered = typeof config.filter === "function" ? all.filter(config.filter) : all.slice();
    if (typeof config.sort === "function") {
      selection = filtered.slice().sort(config.sort);
    } else {
      selection = filtered.slice();
    }
  }

  selection = dedupeMovies(selection);

  const limit = config.limit || selection.length || all.length;
  const min = config.min || 0;
  const targetSize = Math.max(min, limit);

  if (selection.length < targetSize) {
    const extras = all.filter((movie) => !selection.some((entry) => entry.id === movie.id));
    selection = selection.concat(extras.slice(0, targetSize - selection.length));
  }

  if (!selection.length) {
    selection = all.slice(0, limit);
  }

  selection = dedupeMovies(selection);

  if (limit) {
    selection = selection.slice(0, limit);
  }

  return selection;
}

function populateCuratedRows() {
  const keys = curatedRowConfigs.map((config) => config.key);
  keys.forEach((key) => {
    const container = dom[key];
    if (container && state.movies.length === 0) {
      container.innerHTML = "";
    }
  });

  if (state.movies.length === 0) {
    return;
  }

  curatedRowConfigs.forEach((config) => {
    const container = dom[config.key];
    if (!container) {
      return;
    }
    const movies = selectMoviesForConfig(config);
    renderRow(container, movies);
  });
}

function closeNavSheet() {
  if (dom.navToggle) {
    dom.navToggle.checked = false;
  }
}

function resolveAssetPath(path, kind) {
  if (!path) {
    return "";
  }
  const trimmed = path.trim();
  if (trimmed === "") {
    return "";
  }
  if (/^(?:https?:)?\/\//i.test(trimmed) || trimmed.startsWith("data:")) {
    return trimmed;
  }
  if (trimmed.startsWith("/")) {
    return `${API_BASE}${trimmed}`;
  }
  if (trimmed.startsWith("/static/")) {
    return trimmed;
  }
  const ensureStaticPrefix = (value) => `/static/${value.replace(/^\/+/g, "")}`;
  if (trimmed.includes("/")) {
    return ensureStaticPrefix(trimmed);
  }
  const folder = kind === "background"
    ? "assets/backgrounds"
    : kind === "thumbnail"
      ? "assets/thumbnails"
      : "assets";
  return ensureStaticPrefix(`${folder}/${trimmed}`);
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }
  const totalSeconds = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function setPlayerButtons() {
  if (!dom.playerPlay || !dom.playerMute || !dom.playerVideo) {
    return;
  }
  const video = dom.playerVideo;
  if (video.paused || video.ended) {
    dom.playerPlay.textContent = video.ended ? "Replay" : "Play";
  } else {
    dom.playerPlay.textContent = "Pause";
  }
  dom.playerMute.textContent = video.muted || video.volume === 0 ? "Unmute" : "Mute";
}

function showPlayerLoader() {
  if (dom.playerLoader) {
    dom.playerLoader.hidden = false;
  }
}

function hidePlayerLoader() {
  if (dom.playerLoader) {
    dom.playerLoader.hidden = true;
  }
}

function showPlayerError(message) {
  if (dom.playerError) {
    dom.playerError.textContent = message;
    dom.playerError.hidden = false;
  }
}

function clearPlayerError() {
  if (dom.playerError) {
    dom.playerError.hidden = true;
    dom.playerError.textContent = "";
  }
}

function showPageLoader() {
  if (!dom.pageLoader) {
    return;
  }
  dom.pageLoader.classList.add("page-loader--active");
  dom.pageLoader.setAttribute("aria-busy", "true");
}

function hidePageLoader() {
  if (!dom.pageLoader) {
    return;
  }
  dom.pageLoader.classList.remove("page-loader--active");
  dom.pageLoader.setAttribute("aria-busy", "false");
}

function updatePlayerTimeline() {
  if (!dom.playerVideo || !dom.playerTimeline || playerState.isScrubbing) {
    return;
  }
  const video = dom.playerVideo;
  const duration = video.duration || 0;
  const current = video.currentTime || 0;
  if (duration > 0) {
    dom.playerTimeline.value = Math.floor((current / duration) * 1000);
    dom.playerDuration.textContent = formatTime(duration);
  } else {
    dom.playerTimeline.value = 0;
    dom.playerDuration.textContent = "0:00";
  }
  dom.playerCurrentTime.textContent = formatTime(current);
}

function resetPlayer() {
  if (!dom.player || !dom.playerVideo) {
    return;
  }
  dom.playerVideo.pause();
  dom.playerVideo.removeAttribute("src");
  dom.playerVideo.load();
  if (dom.playerVideo.hasAttribute("poster")) {
    dom.playerVideo.removeAttribute("poster");
  }
  document.body.classList.remove("player-open");
  dom.player.classList.remove("player--open");
  dom.player.hidden = true;
  playerState.activeMovie = null;
  playerState.isScrubbing = false;
  playerState.wasPlayingBeforeScrub = false;
  dom.playerTimeline.value = 0;
  dom.playerCurrentTime.textContent = "0:00";
  dom.playerDuration.textContent = "0:00";
  hidePlayerLoader();
  clearPlayerError();
}

function openPlayer(movie) {
  if (!dom.player || !dom.playerVideo) {
    return;
  }
  closeNavSheet();
  playerState.activeMovie = movie;
  document.body.classList.add("player-open");
  dom.player.hidden = false;
  dom.player.classList.add("player--open");
  clearPlayerError();
  showPlayerLoader();
  dom.playerTimeline.value = 0;
  dom.playerCurrentTime.textContent = "0:00";
  dom.playerDuration.textContent = "0:00";
  if (dom.playerTitle) {
    dom.playerTitle.textContent = movie.title;
  }
  if (dom.playerMeta) {
    dom.playerMeta.textContent = `${movie.year} • ${movie.genre} • ${movie.rating}`;
  }
  if (dom.playerDescription) {
    dom.playerDescription.textContent = movie.description;
  }
  const posterUrl = resolveAssetPath(movie.background_url, "background");
  if (posterUrl) {
    dom.playerVideo.setAttribute("poster", posterUrl);
  }
  const source = movie.video_url && (movie.video_url.startsWith("http")
    ? movie.video_url
    : movie.video_url.startsWith("/")
      ? `${API_BASE}${movie.video_url}`
      : resolveAssetPath(movie.video_url, "video"));
  if (!source) {
    hidePlayerLoader();
    showPlayerError("No video source configured for this title.");
    setPlayerButtons();
    return;
  }
  dom.playerVideo.src = source;
  dom.playerVideo.load();
  const playbackAttempt = dom.playerVideo.play();
  setPlayerButtons();
  if (playbackAttempt && typeof playbackAttempt.catch === "function") {
    playbackAttempt.catch(() => {
      hidePlayerLoader();
      setPlayerButtons();
      showPlayerError("Video paused. Press Play to start playback.");
    });
  }
}

function closePlayer() {
  resetPlayer();
}

function togglePlay() {
  if (!dom.playerVideo) {
    return;
  }
  if (dom.playerVideo.paused || dom.playerVideo.ended) {
    dom.playerVideo.play().catch(() => {
      showPlayerError("Unable to start playback.");
    });
  } else {
    dom.playerVideo.pause();
  }
  setPlayerButtons();
}

function toggleMute() {
  if (!dom.playerVideo) {
    return;
  }
  dom.playerVideo.muted = !dom.playerVideo.muted;
  setPlayerButtons();
}

function setLocalData(data) {
  localStorage.setItem(LOCAL_DATA_KEY, JSON.stringify(data));
}

function getLocalData() {
  const raw = localStorage.getItem(LOCAL_DATA_KEY);
  if (!raw) {
    const initial = { users: [], watchlists: {} };
    setLocalData(initial);
    return initial;
  }
  try {
    const parsed = JSON.parse(raw);
    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      watchlists:
        parsed.watchlists && typeof parsed.watchlists === "object"
          ? parsed.watchlists
          : {},
    };
  } catch (error) {
    const fallback = { users: [], watchlists: {} };
    setLocalData(fallback);
    return fallback;
  }
}

function findLocalUser(email) {
  const data = getLocalData();
  return data.users.find((user) => user.email === email) || null;
}

function saveLocalUser(user) {
  const data = getLocalData();
  const index = data.users.findIndex((item) => item.email === user.email);
  if (index >= 0) {
    data.users[index] = user;
  } else {
    data.users.push(user);
  }
  setLocalData(data);
}

function getLocalWatchlist(email) {
  const data = getLocalData();
  return Array.isArray(data.watchlists[email]) ? data.watchlists[email] : [];
}

function saveLocalWatchlist(email, entries) {
  const data = getLocalData();
  data.watchlists[email] = entries;
  setLocalData(data);
}

function generateLocalToken() {
  if (window.crypto && window.crypto.randomUUID) {
    return `local-${window.crypto.randomUUID()}`;
  }
  return `local-${Date.now()}`;
}

function handlePlay(movie) {
  if (dom.player && dom.playerVideo) {
    openPlayer(movie);
    return;
  }
  const fallback = movie.video_url.startsWith("http")
    ? movie.video_url
    : movie.video_url.startsWith("/")
      ? `${API_BASE}${movie.video_url}`
      : resolveAssetPath(movie.video_url, "video");
  if (fallback) {
    window.open(fallback, "_blank");
  } else {
    alert("No video source is configured for this title.");
  }
}

async function apiRequest(path, options = {}) {
  if (USE_LOCAL_ONLY) {
    throw new Error("Backend API disabled in local-only mode.");
  }
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (state.token) {
    headers.Authorization = `Bearer ${state.token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!response.ok) {
    let detail = "Request failed";
    try {
      const data = await response.json();
      detail = data.detail || data.message || detail;
      throw new Error(detail);
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error(response.statusText);
      }
      throw error;
    }
  }
  if (response.status === 204) {
    return null;
  }
  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
}

function setAuth(token, profile) {
  state.token = token;
  state.profile = profile;
  if (token) {
    localStorage.setItem("streambox_token", token);
  } else {
    localStorage.removeItem("streambox_token");
  }
  if (profile) {
    localStorage.setItem("streambox_profile", JSON.stringify(profile));
  } else {
    localStorage.removeItem("streambox_profile");
  }
  updateAuthUI();
  if (state.movies.length > 0) {
    refreshCatalogViews();
  }
}

function updateAuthUI() {
  const isAuthenticated = Boolean(state.token);

  if (dom.loginButtonSheet) {
    dom.loginButtonSheet.hidden = isAuthenticated;
  }

  if (dom.profileMenuSheet) {
    dom.profileMenuSheet.hidden = !isAuthenticated;
  }

  if (dom.profileNameSheet) {
    dom.profileNameSheet.textContent = isAuthenticated && state.profile ? state.profile.full_name : "";
  }
}

function openModal(initialTab = "login") {
  dom.modal.hidden = false;
  dom.modal.style.display = "grid";
  closeNavSheet();
  requestAnimationFrame(() => {
    dom.modal.classList.add("modal--open");
  });
  switchTab(initialTab);
}

function closeModal() {
  dom.modal.classList.remove("modal--open");
  dom.modal.style.display = "none";
  dom.modal.hidden = true;
  dom.loginForm.reset();
  dom.registerForm.reset();
  dom.loginMessage.textContent = "";
  dom.registerMessage.textContent = "";
}

function switchTab(tab) {
  const showLogin = tab === "login";
  dom.loginTab.classList.toggle("modal__tab--active", showLogin);
  dom.registerTab.classList.toggle("modal__tab--active", !showLogin);
  dom.loginForm.classList.toggle("modal__form--hidden", !showLogin);
  dom.registerForm.classList.toggle("modal__form--hidden", showLogin);
}


async function loadProfile() {
  if (!state.token) {
    setAuth(null, null);
    return;
  }
  if (USE_LOCAL_ONLY) {
    return;
  }
  try {
    const profile = await apiRequest("/auth/me");
    setAuth(state.token, profile);
  } catch (error) {
    console.error(error);
    setAuth(null, null);
  }
}

function createCard(movie, context = "catalog") {
  const card = dom.cardTemplate.content.firstElementChild.cloneNode(true);
  // expose the movie id for the global click handler to pick up
  card.dataset.movieId = String(movie.id);
  const image = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");
  const meta = card.querySelector(".card__meta");
  const playBtn = card.querySelector('[data-action="play"]');
  const watchlistBtn = card.querySelector('[data-action="watchlist"]');

  const thumbnailUrl = resolveAssetPath(movie.thumbnail_url, "thumbnail");
  image.style.backgroundImage = thumbnailUrl
    ? `url(${thumbnailUrl})`
    : "linear-gradient(135deg, rgba(229, 9, 20, 0.5), rgba(0, 0, 0, 0.7))";
  title.textContent = movie.title;
  meta.textContent = `${movie.year} • ${movie.genre} • ${movie.rating}`;

  playBtn.addEventListener("click", () => handlePlay(movie));

  const isInWatchlist = state.watchlist.some((entry) => entry.movie.id === movie.id);
  watchlistBtn.textContent = isInWatchlist ? "Remove" : "My List";

  watchlistBtn.addEventListener("click", () => {
    if (!state.token) {
      openModal("login");
      return;
    }
    if (context === "watchlist" || isInWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie.id);
    }
  });

  return card;
}

function renderRow(container, movies, context = "catalog") {
  if (!container) {
    return;
  }
  container.innerHTML = "";
  movies.forEach((movie) => container.appendChild(createCard(movie, context)));
}

function updateWatchlistUI(movies) {
  if (!dom.watchlistRow || !dom.watchlistEmpty) {
    return;
  }
  renderRow(dom.watchlistRow, movies, "watchlist");
  dom.watchlistEmpty.hidden = movies.length > 0;
}

function renderHero(movie) {
  dom.hero.innerHTML = "";
  if (!movie) {
    dom.hero.style.backgroundImage = "linear-gradient(120deg, rgba(0,0,0,0.9), rgba(0,0,0,0.5))";
    return;
  }
  const heroBackground = resolveAssetPath(movie.background_url, "background");
  dom.hero.style.backgroundImage = heroBackground
    ? `linear-gradient(120deg, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.9) 100%), url(${heroBackground})`
    : "linear-gradient(120deg, rgba(0,0,0,0.9), rgba(0,0,0,0.5))";

  const container = document.createElement("div");
  container.className = "hero__content";

  const title = document.createElement("h1");
  title.className = "hero__title";
  title.textContent = movie.title;

  const meta = document.createElement("div");
  meta.className = "hero__meta";
  meta.textContent = `${movie.year} • ${movie.genre} • ${movie.rating}`;

  const description = document.createElement("p");
  description.className = "hero__description";
  description.textContent = movie.description;

  const actions = document.createElement("div");
  actions.className = "hero__actions";

  const playBtn = document.createElement("button");
  playBtn.className = "btn btn--primary";
  playBtn.textContent = "Play";
  playBtn.addEventListener("click", () => handlePlay(movie));

  const watchlistBtn = document.createElement("button");
  watchlistBtn.className = "btn btn--ghost";
  const isInWatchlist = state.watchlist.some((entry) => entry.movie.id === movie.id);
  watchlistBtn.textContent = isInWatchlist ? "Remove from My List" : "Add to My List";
  watchlistBtn.addEventListener("click", () => {
    if (!state.token) {
      openModal("login");
      return;
    }
    if (isInWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie.id);
    }
  });

  actions.append(playBtn, watchlistBtn);
  container.append(title, meta, description, actions);
  dom.hero.appendChild(container);
}

function refreshCatalogViews() {
  if (state.movies.length === 0) {
    dom.hero.innerHTML = "";
    dom.hero.style.backgroundImage = "linear-gradient(120deg, rgba(0,0,0,0.9), rgba(0,0,0,0.5))";
    populateCuratedRows();
    return;
  }
  renderHero(state.movies[0]);
  renderRow(dom.trendingRow, state.movies.slice(0, 6));
  renderRow(dom.popularRow, [...state.movies].reverse());
  populateCuratedRows();
}

async function loadMovies() {
  if (USE_LOCAL_ONLY) {
    state.movies = DEFAULT_MOVIES;
    refreshCatalogViews();
    return;
  }
  try {
    const data = await apiRequest("/movies");
    state.movies = data.items;
  } catch (error) {
    console.error(error);
    state.movies = DEFAULT_MOVIES;
  }
  refreshCatalogViews();
}

async function loadWatchlist() {
  if (!state.token) {
    state.watchlist = [];
    updateWatchlistUI([]);
    refreshCatalogViews();
    return;
  }
  if (USE_LOCAL_ONLY) {
    if (!state.profile) {
      state.watchlist = [];
      updateWatchlistUI([]);
      refreshCatalogViews();
      return;
    }
    const entries = getLocalWatchlist(state.profile.email);
    state.watchlist = entries
      .map((entry) => {
        const movie = state.movies.find((item) => item.id === entry.movieId);
        if (!movie) {
          return null;
        }
        return {
          id: entry.movieId,
          movie,
          added_at: entry.addedAt,
        };
      })
      .filter(Boolean);
    const movies = state.watchlist.map((entry) => entry.movie);
    updateWatchlistUI(movies);
    refreshCatalogViews();
    return;
  }
  try {
    const data = await apiRequest("/watchlist");
    state.watchlist = data.items;
    const movies = state.watchlist.map((entry) => entry.movie);
    updateWatchlistUI(movies);
    refreshCatalogViews();
  } catch (error) {
    console.error(error);
    updateWatchlistUI([]);
  }
}

async function addToWatchlist(movieId) {
  if (USE_LOCAL_ONLY) {
    if (!state.profile) {
      return;
    }
    const entries = getLocalWatchlist(state.profile.email);
    if (!entries.some((entry) => entry.movieId === movieId)) {
      entries.push({ movieId, addedAt: new Date().toISOString() });
      saveLocalWatchlist(state.profile.email, entries);
    }
    await loadWatchlist();
    return;
  }
  try {
    await apiRequest(`/watchlist/${movieId}`, { method: "POST" });
    await loadWatchlist();
    await loadMovies();
  } catch (error) {
    console.error(error);
  }
}

async function removeFromWatchlist(movieId) {
  if (USE_LOCAL_ONLY) {
    if (!state.profile) {
      return;
    }
    const entries = getLocalWatchlist(state.profile.email);
    const nextEntries = entries.filter((entry) => entry.movieId !== movieId);
    saveLocalWatchlist(state.profile.email, nextEntries);
    await loadWatchlist();
    return;
  }
  try {
    await apiRequest(`/watchlist/${movieId}`, { method: "DELETE" });
    await loadWatchlist();
    await loadMovies();
  } catch (error) {
    console.error(error);
  }
}

async function handleLogin(event) {
  event.preventDefault();
  dom.loginMessage.textContent = "Signing in...";
  const formData = new FormData(dom.loginForm);
  const email = formData.get("email").trim().toLowerCase();
  const password = formData.get("password");

  if (USE_LOCAL_ONLY) {
    const user = findLocalUser(email);
    if (!user || user.password !== password) {
      dom.loginMessage.textContent = "Incorrect email or password";
      return;
    }
    const profile = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
    };
    setAuth(generateLocalToken(), profile);
    dom.loginMessage.textContent = "Signed in successfully.";
    closeModal();
    await loadWatchlist();
    return;
  }
  const payload = new URLSearchParams();
  payload.append("username", email);
  payload.append("password", password);

  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
    });
    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.detail || "Login failed");
    }
    const data = await response.json();
    setAuth(data.access_token, state.profile);
    await loadProfile();
    dom.loginMessage.textContent = "Signed in successfully.";
    closeModal();
    await loadWatchlist();
  } catch (error) {
    dom.loginMessage.textContent = error.message;
  }
}

async function handleRegister(event) {
  event.preventDefault();
  dom.registerMessage.textContent = "Creating account...";
  const formData = new FormData(dom.registerForm);
  const fullName = formData.get("full_name").trim();
  const email = formData.get("email").trim().toLowerCase();
  const password = formData.get("password");

  if (USE_LOCAL_ONLY) {
    if (findLocalUser(email)) {
      dom.registerMessage.textContent = "Email already registered";
      return;
    }
    const user = {
      id: Date.now(),
      full_name: fullName,
      email,
      password,
    };
    saveLocalUser(user);
    saveLocalWatchlist(email, []);
    const profile = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
    };
    setAuth(generateLocalToken(), profile);
    dom.registerMessage.textContent = "Account created. You're signed in.";
    setTimeout(() => {
      closeModal();
    }, 600);
    await loadWatchlist();
    return;
  }
  const payload = {
    full_name: fullName,
    email,
    password,
  };
  try {
    await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    dom.registerMessage.textContent = "Account created. Please sign in.";
    switchTab("login");
  } catch (error) {
    dom.registerMessage.textContent = error.message;
  }
}

if (dom.playerClose) {
  dom.playerClose.addEventListener("click", closePlayer);
}
if (dom.playerPlay) {
  dom.playerPlay.addEventListener("click", () => {
    clearPlayerError();
    togglePlay();
  });
}
if (dom.playerMute) {
  dom.playerMute.addEventListener("click", toggleMute);
}
if (dom.player) {
  dom.player.addEventListener("click", (event) => {
    if (event.target === dom.player) {
      closePlayer();
    }
  });
}
if (dom.playerTimeline) {
  dom.playerTimeline.addEventListener("pointerdown", () => {
    if (!dom.playerVideo) {
      return;
    }
    playerState.isScrubbing = true;
    playerState.wasPlayingBeforeScrub = !dom.playerVideo.paused;
    dom.playerVideo.pause();
  });
  dom.playerTimeline.addEventListener("pointerup", () => {
    if (!dom.playerVideo) {
      return;
    }
    playerState.isScrubbing = false;
    if (dom.playerVideo.duration) {
      const percent = Number(dom.playerTimeline.value) / 1000;
      dom.playerVideo.currentTime = dom.playerVideo.duration * percent;
    }
    if (playerState.wasPlayingBeforeScrub) {
      dom.playerVideo.play().catch(() => {
        showPlayerError("Unable to resume playback.");
      });
    }
    playerState.wasPlayingBeforeScrub = false;
  });
  dom.playerTimeline.addEventListener("pointercancel", () => {
    playerState.isScrubbing = false;
    playerState.wasPlayingBeforeScrub = false;
  });
  dom.playerTimeline.addEventListener("input", () => {
    if (!dom.playerVideo || !dom.playerVideo.duration) {
      return;
    }
    const percent = Number(dom.playerTimeline.value) / 1000;
    const previewTime = dom.playerVideo.duration * percent;
    dom.playerCurrentTime.textContent = formatTime(previewTime);
  });
  dom.playerTimeline.addEventListener("change", () => {
    if (!dom.playerVideo || !dom.playerVideo.duration) {
      return;
    }
    const percent = Number(dom.playerTimeline.value) / 1000;
    dom.playerVideo.currentTime = dom.playerVideo.duration * percent;
    if (!dom.playerVideo.paused) {
      clearPlayerError();
    }
  });
}
if (dom.playerVideo) {
  dom.playerVideo.addEventListener("loadedmetadata", () => {
    hidePlayerLoader();
    updatePlayerTimeline();
    setPlayerButtons();
  });
  dom.playerVideo.addEventListener("timeupdate", updatePlayerTimeline);
  dom.playerVideo.addEventListener("play", () => {
    hidePlayerLoader();
    clearPlayerError();
    setPlayerButtons();
  });
  dom.playerVideo.addEventListener("pause", setPlayerButtons);
  dom.playerVideo.addEventListener("playing", () => {
    hidePlayerLoader();
    setPlayerButtons();
  });
  dom.playerVideo.addEventListener("waiting", showPlayerLoader);
  dom.playerVideo.addEventListener("ended", () => {
    setPlayerButtons();
  });
  dom.playerVideo.addEventListener("error", () => {
    hidePlayerLoader();
    setPlayerButtons();
    showPlayerError("Video unavailable. Make sure the backend streaming service is running.");
  });
}

// When the user clicks play on a card, open the dedicated movie page.
document.addEventListener('click', (e) => {
  const btn = e.target.closest && e.target.closest('[data-action="play"]');
  if (!btn) return;
  const card = btn.closest('.card');
  if (!card) return;
  // Attempt to read movie id from a data attribute on the card
  const id = card.dataset.movieId || card.getAttribute('data-movie-id');
  if (id) {
    // Navigate to the dedicated movie page
  window.location.href = `/movie?id=${encodeURIComponent(id)}`;
    return;
  }
  // Fallback: if the card has a title we can match from state.movies
  const titleElem = card.querySelector('.card__title');
  if (titleElem) {
    const title = titleElem.textContent.trim();
    const found = state.movies.find(m => m.title === title);
    if (found) {
  window.location.href = `/movie?id=${encodeURIComponent(found.id)}`;
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && dom.player && !dom.player.hidden) {
    closePlayer();
    return;
  }
  if (event.key === " " && dom.player && !dom.player.hidden) {
    const active = document.activeElement;
    if (active && ["INPUT", "TEXTAREA", "BUTTON"].includes(active.tagName)) {
      return;
    }
    event.preventDefault();
    clearPlayerError();
    togglePlay();
  }
});

if (dom.loginButtonSheet) {
  dom.loginButtonSheet.addEventListener("click", () => openModal("login"));
}
if (dom.logoutButtonSheet) {
  dom.logoutButtonSheet.addEventListener("click", () => {
    setAuth(null, null);
    closeNavSheet();
    loadWatchlist();
  });
}
dom.modalClose.addEventListener("click", (event) => {
  event.preventDefault();
  closeModal();
});
dom.modal.addEventListener("click", (event) => {
  if (event.target === dom.modal) {
    closeModal();
  }
});
dom.loginTab.addEventListener("click", () => switchTab("login"));
dom.registerTab.addEventListener("click", () => switchTab("register"));
dom.loginForm.addEventListener("submit", handleLogin);
dom.registerForm.addEventListener("submit", handleRegister);

updateAuthUI();

async function bootstrap() {
  showPageLoader();
  try {
    await loadMovies();
    await loadProfile();
    await loadWatchlist();
  } catch (error) {
    console.error("Initial load failed", error);
  } finally {
    hidePageLoader();
  }
}

bootstrap();

const nav = document.querySelector(".nav");
if (nav) {
  window.addEventListener("scroll", () => {
    nav.classList.toggle("nav--scrolled", window.scrollY > 10);
  });
}
