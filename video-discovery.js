
(() => {
  "use strict";

  const videos = [
    {
      id: 1,
      title: "La jugada que nadie esperaba",
      creator: "Fogo Gaming",
      category: "gaming",
      emoji: "🎮",
      color: "linear-gradient(135deg, #3023ae, #c86dd7)",
      description: "Gaming · Vídeo de demostración"
    },
    {
      id: 2,
      title: "Transforma una idea en algo increíble",
      creator: "Creative Studio",
      category: "creatividad",
      emoji: "🎨",
      color: "linear-gradient(135deg, #f857a6, #ff5858)",
      description: "Creatividad · Vídeo de demostración"
    },
    {
      id: 3,
      title: "Cuando tu plan sale completamente mal",
      creator: "Fogo Humor",
      category: "humor",
      emoji: "😂",
      color: "linear-gradient(135deg, #f7971e, #ffd200)",
      description: "Humor · Vídeo de demostración"
    },
    {
      id: 4,
      title: "El momento decisivo del partido",
      creator: "Zona Deportiva",
      category: "deportes",
      emoji: "⚽",
      color: "linear-gradient(135deg, #11998e, #38ef7d)",
      description: "Deportes · Vídeo de demostración"
    },
    {
      id: 5,
      title: "Pequeñas ideas, grandes resultados",
      creator: "Creative Studio",
      category: "creatividad",
      emoji: "✨",
      color: "linear-gradient(135deg, #4568dc, #b06ab3)",
      description: "Creatividad · Vídeo de demostración"
    },
    {
      id: 6,
      title: "Una partida para recordar",
      creator: "Fogo Gaming",
      category: "gaming",
      emoji: "🕹️",
      color: "linear-gradient(135deg, #232526, #414345)",
      description: "Gaming · Vídeo de demostración"
    }
  ];

  let activeCategory = "all";
  let searchQuery = "";

  function addStyles() {
    if (document.querySelector("#videoDiscoveryStyles")) return;

    const style = document.createElement("style");
    style.id = "videoDiscoveryStyles";

    style.textContent = `
      #videoDiscovery {
        margin-top: 30px;
      }

      #videoDiscovery.hidden {
        display: none !important;
      }

      body.video-discovery-active #storiesSection,
      body.video-discovery-active #feedSection,
      body.video-discovery-active #shortsSection,
      body.video-discovery-active #profileSection {
        display: none !important;
      }

      .video-discovery-heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
        margin-bottom: 24px;
      }

      .video-discovery-heading h2 {
        margin: 0 0 8px;
        font-size: 25px;
        font-weight: 900;
      }

      .video-discovery-heading p {
        margin: 0;
        opacity: .7;
      }

      .video-discovery-filters {
        display: flex;
        flex-wrap: wrap;
        gap: 9px;
        margin-bottom: 24px;
      }

      .video-discovery-filter {
        border: 1px solid rgba(255,255,255,.12);
        border-radius: 999px;
        padding: 10px 16px;
        background: rgba(255,255,255,.045);
        color: inherit;
        font: inherit;
        cursor: pointer;
        transition: .2s ease;
      }

      .video-discovery-filter:hover {
        background: rgba(255,255,255,.1);
      }

      .video-discovery-filter.selected {
        color: white;
        border-color: transparent;
        background: linear-gradient(110deg, #ff5b36, #ff2876);
      }

      .video-discovery-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 22px;
      }

      .video-discovery-card {
        min-width: 0;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,.09);
        border-radius: 18px;
        background: rgba(255,255,255,.035);
        transition: transform .2s ease, border-color .2s ease;
      }

      .video-discovery-card:hover {
        transform: translateY(-4px);
        border-color: rgba(255,100,80,.55);
      }

      .video-discovery-thumbnail {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        aspect-ratio: 16 / 9;
        font-size: 58px;
        overflow: hidden;
      }

      .video-discovery-play {
        position: absolute;
        right: 14px;
        bottom: 14px;
        width: 40px;
        height: 40px;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: rgba(0,0,0,.65);
        color: white;
        font-size: 17px;
      }

      .video-discovery-info {
        padding: 16px;
      }

      .video-discovery-info h3 {
        margin: 0 0 9px;
        font-size: 16px;
        line-height: 1.45;
      }

      .video-discovery-creator {
        margin: 0 0 7px;
        font-size: 13px;
        opacity: .8;
      }

      .video-discovery-description {
        margin: 0;
        font-size: 12px;
        opacity: .6;
      }

      .video-discovery-note {
        margin-top: 22px;
        padding: 14px 16px;
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 12px;
        font-size: 13px;
        line-height: 1.6;
        opacity: .8;
      }

      .video-discovery-empty {
        grid-column: 1 / -1;
        padding: 35px 15px;
        text-align: center;
        opacity: .7;
      }

      @media (max-width: 1050px) {
        .video-discovery-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 600px) {
        .video-discovery-grid {
          grid-template-columns: 1fr;
        }

        .video-discovery-heading h2 {
          font-size: 22px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function createSection() {
    const main = document.querySelector(".main-content");
    if (!main || document.querySelector("#videoDiscovery")) return;

    const section = document.createElement("section");
    section.id = "videoDiscovery";
    section.className = "hidden";

    section.innerHTML = `
      <div class="video-discovery-heading">
        <div>
          <h2>Descubre vídeos <span>✦</span></h2>
          <p>Encuentra contenido según tus intereses.</p>
        </div>
        <span class="section-label">FOGOSM VIDEO</span>
      </div>

      <div class="video-discovery-filters" aria-label="Filtrar vídeos">
        <button class="video-discovery-filter selected" data-video-filter="all">Todos</button>
        <button class="video-discovery-filter" data-video-filter="gaming">Gaming</button>
        <button class="video-discovery-filter" data-video-filter="creatividad">Creatividad</button>
        <button class="video-discovery-filter" data-video-filter="humor">Humor</button>
        <button class="video-discovery-filter" data-video-filter="deportes">Deportes</button>
      </div>

      <div class="video-discovery-grid" id="videoDiscoveryGrid"></div>

      <p class="video-discovery-note">
        Estos son ejemplos visuales. Los vídeos reales, las reproducciones y las
        subidas se conectarán cuando implementemos el sistema de almacenamiento de vídeo.
      </p>
    `;

    const welcome = main.querySelector(".welcome-row");
    if (welcome) {
      welcome.insertAdjacentElement("afterend", section);
    } else {
      main.prepend(section);
    }

    renderVideos();
  }

  function renderVideos() {
    const grid = document.querySelector("#videoDiscoveryGrid");
    if (!grid) return;

    const filtered = videos.filter(video => {
      const matchesCategory =
        activeCategory === "all" || video.category === activeCategory;

      const searchableText =
        `${video.title} ${video.creator} ${video.category}`.toLowerCase();

      return matchesCategory && searchableText.includes(searchQuery);
    });

    if (!filtered.length) {
      grid.innerHTML = `
        <div class="video-discovery-empty">
          <h3>No se encontraron vídeos</h3>
          <p>Prueba otra búsqueda o selecciona otra categoría.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(video => `
      <article class="video-discovery-card">
        <div class="video-discovery-thumbnail"
             style="background:${video.color}"
             aria-label="${video.category}">
          <span aria-hidden="true">${video.emoji}</span>
          <span class="video-discovery-play" aria-hidden="true">▶</span>
        </div>
        <div class="video-discovery-info">
          <h3>${escapeText(video.title)}</h3>
          <p class="video-discovery-creator">${escapeText(video.creator)}</p>
          <p class="video-discovery-description">${escapeText(video.description)}</p>
        </div>
      </article>
    `).join("");
  }

  function escapeText(value) {
    const element = document.createElement("span");
    element.textContent = value;
    return element.innerHTML;
  }

  function showVideos() {
    const section = document.querySelector("#videoDiscovery");
    if (!section) return;

    document.body.classList.add("video-discovery-active");
    section.classList.remove("hidden");

    document.querySelectorAll("[data-view]").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.view === "videos"
      );
    });

    const title = document.querySelector("#pageTitle");
    const subtitle = document.querySelector("#pageSubtitle");

    if (title) title.innerHTML = 'Descubre <span>vídeos.</span>';
    if (subtitle) subtitle.textContent =
      "Explora contenido y encuentra tu próximo favorito.";

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function hideVideos() {
    document.body.classList.remove("video-discovery-active");

    const section = document.querySelector("#videoDiscovery");
    if (section) section.classList.add("hidden");
  }

  function addNavigationButton() {
    const sidebarNav = document.querySelector(".sidebar .nav-group");
    if (sidebarNav && !document.querySelector('[data-view="videos"]')) {
      const button = document.createElement("button");
      button.className = "nav-item";
      button.dataset.view = "videos";
      button.innerHTML = '<span class="nav-icon">▷</span> Vídeos';
      sidebarNav.appendChild(button);
    }
  }

  function connectSearch() {
    const searchForm = document.querySelector("#searchForm");
    const searchInput = document.querySelector("#searchInput");

    if (searchForm && searchInput) {
      searchForm.addEventListener("submit", event => {
        event.preventDefault();
        searchQuery = searchInput.value.trim().toLowerCase();
        showVideos();
        renderVideos();
      });
    }
  }

  function connectEvents() {
    document.addEventListener("click", event => {
      const filter = event.target.closest("[data-video-filter]");

      if (filter) {
        activeCategory = filter.dataset.videoFilter;

        document.querySelectorAll("[data-video-filter]").forEach(button => {
          button.classList.toggle("selected", button === filter);
        });

        renderVideos();
        return;
      }

      const navButton = event.target.closest('[data-view="videos"]');

      if (navButton) {
        event.preventDefault();
        showVideos();
        return;
      }

      const otherViewButton = event.target.closest("[data-view]");

      if (otherViewButton && otherViewButton.dataset.view !== "videos") {
        hideVideos();
      }
    });
  }

  function escapeExistingSearch() {
    const searchInput = document.querySelector("#searchInput");
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        if (document.body.classList.contains("video-discovery-active")) {
          searchQuery = searchInput.value.trim().toLowerCase();
          renderVideos();
        }
      });
    }
  }

  function init() {
    addStyles();
    createSection();
    addNavigationButton();
    connectSearch();
    escapeExistingSearch();
    connectEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
