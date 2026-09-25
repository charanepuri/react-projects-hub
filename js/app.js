/**
 * React Projects Hub - Application Controller
 * Developed with Vanilla JavaScript for high performance
 */

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const projectsGrid = document.getElementById("projectsGrid");
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const categoryFilters = document.getElementById("categoryFilters");
  const sortSelect = document.getElementById("sortSelect");
  const viewGridBtn = document.getElementById("viewGridBtn");
  const viewListBtn = document.getElementById("viewListBtn");
  const projectCountSpan = document.getElementById("projectCount");
  const favoriteFilterBtn = document.getElementById("favoriteFilterBtn");
  const favoritesBadge = document.getElementById("favoritesBadge");

  // Modals
  const previewModal = document.getElementById("previewModal");
  const previewFrame = document.getElementById("previewFrame");
  const previewTitle = document.getElementById("previewTitle");
  const previewExternalLink = document.getElementById("previewExternalLink");
  const previewFrameContainer = document.getElementById("previewFrameContainer");
  const closePreviewBtn = document.getElementById("closePreviewBtn");
  const deviceButtons = document.querySelectorAll(".device-btn");

  const detailsModal = document.getElementById("detailsModal");
  const detailsModalContent = document.getElementById("detailsModalContent");
  const closeDetailsBtn = document.getElementById("closeDetailsBtn");

  // State Management
  let currentCategory = "all";
  let currentSearch = "";
  let currentSort = "featured";
  let currentView = "grid"; // 'grid' | 'list'
  let onlyFavorites = false;
  let favorites = JSON.parse(localStorage.getItem("react_hub_favorites") || "[]");

  // Initialize
  initApp();

  function initApp() {
    renderCategoryFilters();
    renderProjects();
    updateFavoriteBadge();
    bindEventListeners();
    initStatsCounter();
  }

  // Bind Event Listeners
  function bindEventListeners() {
    // Search input
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      clearSearchBtn.classList.toggle("hidden", currentSearch === "");
      renderProjects();
    });

    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      currentSearch = "";
      clearSearchBtn.classList.add("hidden");
      searchInput.focus();
      renderProjects();
    });

    // Keyboard shortcut '/' to search
    window.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
      if (e.key === "Escape") {
        closePreviewModal();
        closeDetailsModal();
      }
    });

    // Sort select
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderProjects();
    });

    // View toggles
    viewGridBtn.addEventListener("click", () => {
      currentView = "grid";
      viewGridBtn.classList.add("bg-sky-500/20", "text-sky-400", "border-sky-500/40");
      viewGridBtn.classList.remove("text-slate-400");
      viewListBtn.classList.remove("bg-sky-500/20", "text-sky-400", "border-sky-500/40");
      viewListBtn.classList.add("text-slate-400");
      renderProjects();
    });

    viewListBtn.addEventListener("click", () => {
      currentView = "list";
      viewListBtn.classList.add("bg-sky-500/20", "text-sky-400", "border-sky-500/40");
      viewListBtn.classList.remove("text-slate-400");
      viewGridBtn.classList.remove("bg-sky-500/20", "text-sky-400", "border-sky-500/40");
      viewGridBtn.classList.add("text-slate-400");
      renderProjects();
    });

    // Favorite filter toggle
    favoriteFilterBtn.addEventListener("click", () => {
      onlyFavorites = !onlyFavorites;
      if (onlyFavorites) {
        favoriteFilterBtn.classList.add("bg-amber-500/20", "border-amber-500/40", "text-amber-400");
        favoriteFilterBtn.classList.remove("text-slate-400");
      } else {
        favoriteFilterBtn.classList.remove("bg-amber-500/20", "border-amber-500/40", "text-amber-400");
        favoriteFilterBtn.classList.add("text-slate-400");
      }
      renderProjects();
    });

    // Device switchers in preview modal
    deviceButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        deviceButtons.forEach((b) => b.classList.remove("bg-sky-500", "text-white"));
        btn.classList.add("bg-sky-500", "text-white");
        const device = btn.dataset.device;

        previewFrameContainer.className = "flex justify-center items-center w-full transition-all duration-300";
        if (device === "mobile") {
          previewFrame.className = "device-frame-mobile rounded-3xl bg-slate-950";
        } else if (device === "tablet") {
          previewFrame.className = "device-frame-tablet rounded-2xl bg-slate-950";
        } else {
          previewFrame.className = "device-frame-desktop rounded-xl bg-slate-950";
        }
      });
    });

    // Close preview modal
    closePreviewBtn.addEventListener("click", closePreviewModal);
    previewModal.addEventListener("click", (e) => {
      if (e.target === previewModal) closePreviewModal();
    });

    // Close details modal
    closeDetailsBtn.addEventListener("click", closeDetailsModal);
    detailsModal.addEventListener("click", (e) => {
      if (e.target === detailsModal) closeDetailsModal();
    });
  }

  // Category Filters Builder
  function renderCategoryFilters() {
    const categories = [
      { id: "all", label: "All Projects" },
      { id: "tools", label: "Utilities & Tools" },
      { id: "analytics", label: "Data & Analytics" },
      { id: "lifestyle", label: "Lifestyle & Guides" },
      { id: "reference", label: "Reference & Study" }
    ];

    categoryFilters.innerHTML = categories
      .map((cat) => {
        const count =
          cat.id === "all"
            ? projectsData.length
            : projectsData.filter((p) => p.category === cat.id).length;
        const isActive = cat.id === currentCategory;
        return `
          <button 
            type="button" 
            data-category="${cat.id}"
            class="filter-btn text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full border border-slate-700 transition flex items-center gap-2 ${
              isActive ? "active text-white" : "text-slate-300 bg-slate-800/60 hover:border-slate-500"
            }"
          >
            <span>${cat.label}</span>
            <span class="text-[11px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-slate-700/60 text-slate-400"}">
              ${count}
            </span>
          </button>
        `;
      })
      .join("");

    // Bind category filter clicks
    categoryFilters.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentCategory = btn.dataset.category;
        renderCategoryFilters();
        renderProjects();
      });
    });
  }

  // Filter & Sort Projects
  function getFilteredProjects() {
    let list = [...projectsData];

    // Filter by category
    if (currentCategory !== "all") {
      list = list.filter((p) => p.category === currentCategory);
    }

    // Filter by search query
    if (currentSearch) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(currentSearch) ||
          p.shortDesc.toLowerCase().includes(currentSearch) ||
          p.badge.toLowerCase().includes(currentSearch) ||
          p.techStack.some((tech) => tech.toLowerCase().includes(currentSearch)) ||
          p.features.some((f) => f.toLowerCase().includes(currentSearch))
      );
    }

    // Filter by favorites
    if (onlyFavorites) {
      list = list.filter((p) => favorites.includes(p.id));
    }

    // Sort
    if (currentSort === "alpha-asc") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (currentSort === "alpha-desc") {
      list.sort((a, b) => b.title.localeCompare(a.title));
    } else if (currentSort === "category") {
      list.sort((a, b) => a.categoryLabel.localeCompare(b.categoryLabel));
    }

    return list;
  }

  // Render Projects Grid / List
  function renderProjects() {
    const list = getFilteredProjects();
    projectCountSpan.textContent = list.length;

    if (list.length === 0) {
      projectsGrid.className = "w-full py-16 text-center";
      projectsGrid.innerHTML = `
        <div class="max-w-md mx-auto p-8 rounded-2xl glass-panel text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 text-2xl">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">No projects found</h3>
          <p class="text-slate-400 text-sm mb-6">
            ${
              onlyFavorites
                ? "You haven't bookmarked any projects yet. Click the star icon on any card to save it here!"
                : "Try adjusting your search terms or selecting a different category filter."
            }
          </p>
          <button 
            id="resetFiltersBtn"
            class="px-4 py-2 text-sm font-semibold rounded-lg bg-sky-500 hover:bg-sky-400 text-white transition shadow-lg shadow-sky-500/25"
          >
            Reset Filters
          </button>
        </div>
      `;

      const resetBtn = document.getElementById("resetFiltersBtn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          currentCategory = "all";
          currentSearch = "";
          searchInput.value = "";
          onlyFavorites = false;
          favoriteFilterBtn.classList.remove("bg-amber-500/20", "border-amber-500/40", "text-amber-400");
          favoriteFilterBtn.classList.add("text-slate-400");
          clearSearchBtn.classList.add("hidden");
          renderCategoryFilters();
          renderProjects();
        });
      }
      return;
    }

    if (currentView === "grid") {
      projectsGrid.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
      projectsGrid.innerHTML = list.map((project) => renderCard(project)).join("");
    } else {
      projectsGrid.className = "flex flex-col gap-4";
      projectsGrid.innerHTML = list.map((project) => renderListItem(project)).join("");
    }

    attachCardActions();
  }

  // Render Grid Card HTML
  function renderCard(p) {
    const isFav = favorites.includes(p.id);
    return `
      <article class="glow-card glass-panel rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden transition-all duration-300">
        <!-- Accent Top Bar -->
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${p.gradient}"></div>
        
        <div>
          <!-- Header: Category & Favorite -->
          <div class="flex items-center justify-between mb-4">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 border border-slate-700/80 text-sky-300">
              <i class="${p.icon} text-[11px]"></i>
              ${p.badge}
            </span>
            <div class="flex items-center gap-2">
              <button 
                class="fav-btn p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition ${isFav ? "!text-amber-400" : ""}" 
                data-id="${p.id}" 
                title="${isFav ? 'Remove from favorites' : 'Add to favorites'}"
              >
                <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-star text-base"></i>
              </button>
            </div>
          </div>

          <!-- Project Title & Icon -->
          <div class="flex items-start gap-3.5 mb-3">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-br ${p.gradient} p-0.5 shrink-0 shadow-lg">
              <div class="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-white">
                <i class="${p.icon} text-lg"></i>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                ${p.title}
              </h3>
              <span class="text-xs text-slate-400">${p.categoryLabel}</span>
            </div>
          </div>

          <!-- Description -->
          <p class="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
            ${p.shortDesc}
          </p>

          <!-- Tech Stack Tags -->
          <div class="flex flex-wrap gap-1.5 mb-6">
            ${p.techStack
              .map(
                (tech) => `
              <span class="px-2.5 py-0.5 rounded-md text-xs font-mono bg-slate-800/90 text-slate-300 border border-slate-700/60">
                ${tech}
              </span>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="pt-4 border-t border-slate-800/80 flex flex-col gap-2.5">
          <div class="grid grid-cols-2 gap-2">
            <a 
              href="${p.liveUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white transition shadow-md shadow-sky-500/20"
            >
              <span>Live App</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            </a>

            <a 
              href="${p.githubUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition"
            >
              <i class="fa-brands fa-github text-sm"></i>
              <span>GitHub</span>
            </a>
          </div>

          <!-- Secondary Toolbar: Preview Simulator & Details Modal & Extra Links -->
          <div class="flex items-center justify-between gap-1.5 pt-1">
            <button 
              class="preview-trigger-btn flex-1 py-1.5 px-2 rounded-lg text-xs font-medium text-slate-300 hover:text-sky-300 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition inline-flex items-center justify-center gap-1.5"
              data-id="${p.id}"
            >
              <i class="fa-solid fa-display text-sky-400"></i>
              <span>Live Preview</span>
            </button>

            <button 
              class="details-trigger-btn flex-1 py-1.5 px-2 rounded-lg text-xs font-medium text-slate-300 hover:text-purple-300 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition inline-flex items-center justify-center gap-1.5"
              data-id="${p.id}"
            >
              <i class="fa-solid fa-circle-info text-purple-400"></i>
              <span>Details</span>
            </button>

            <button 
              class="share-btn p-2 rounded-lg text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition"
              data-url="${p.liveUrl}" 
              data-title="${p.title}"
              title="Copy Live URL"
            >
              <i class="fa-solid fa-share-nodes text-xs"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  // Render List Item HTML
  function renderListItem(p) {
    const isFav = favorites.includes(p.id);
    return `
      <article class="glow-card glass-panel rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group">
        <div class="flex items-start gap-4 flex-1">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${p.gradient} p-0.5 shrink-0">
            <div class="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-white">
              <i class="${p.icon} text-lg"></i>
            </div>
          </div>
          <div>
            <div class="flex items-center gap-2 mb-1 flex-wrap">
              <h3 class="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                ${p.title}
              </h3>
              <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 border border-slate-700 text-sky-300">
                ${p.badge}
              </span>
              <span class="text-xs text-slate-400">(${p.categoryLabel})</span>
            </div>
            <p class="text-slate-300 text-sm line-clamp-1 max-w-2xl mb-2">
              ${p.shortDesc}
            </p>
            <div class="flex flex-wrap gap-1.5">
              ${p.techStack
                .slice(0, 4)
                .map(
                  (tech) => `
                <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-400">
                  ${tech}
                </span>
              `
                )
                .join("")}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
          <button 
            class="fav-btn p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition ${isFav ? "!text-amber-400" : ""}" 
            data-id="${p.id}"
          >
            <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-star text-base"></i>
          </button>

          <button 
            class="details-trigger-btn px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            data-id="${p.id}"
          >
            Details
          </button>

          <button 
            class="preview-trigger-btn px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 transition"
            data-id="${p.id}"
          >
            Preview
          </button>

          <a 
            href="${p.liveUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-white transition flex items-center gap-1.5"
          >
            <span>Live App</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        </div>
      </article>
    `;
  }

  // Attach card click handlers
  function attachCardActions() {
    // Favorite buttons
    document.querySelectorAll(".fav-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        toggleFavorite(id);
      });
    });

    // Preview triggers
    document.querySelectorAll(".preview-trigger-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const project = projectsData.find((p) => p.id === id);
        if (project) openPreviewModal(project);
      });
    });

    // Details triggers
    document.querySelectorAll(".details-trigger-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const project = projectsData.find((p) => p.id === id);
        if (project) openDetailsModal(project);
      });
    });

    // Share buttons
    document.querySelectorAll(".share-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const url = btn.dataset.url;
        const title = btn.dataset.title;
        try {
          if (navigator.clipboard) {
            await navigator.clipboard.writeText(url);
            showToast(`Link for "${title}" copied to clipboard!`, "success");
          } else {
            prompt("Copy project URL:", url);
          }
        } catch (err) {
          showToast(`URL: ${url}`, "info");
        }
      });
    });
  }

  // Toggle Favorite
  function toggleFavorite(id) {
    const index = favorites.indexOf(id);
    const project = projectsData.find((p) => p.id === id);
    if (index === -1) {
      favorites.push(id);
      showToast(`Added "${project.title}" to favorites!`, "success");
    } else {
      favorites.splice(index, 1);
      showToast(`Removed "${project.title}" from favorites`, "info");
    }
    localStorage.setItem("react_hub_favorites", JSON.stringify(favorites));
    updateFavoriteBadge();
    renderProjects();
  }

  function updateFavoriteBadge() {
    favoritesBadge.textContent = favorites.length;
    if (favorites.length > 0) {
      favoritesBadge.classList.remove("hidden");
    } else {
      favoritesBadge.classList.add("hidden");
    }
  }

  // Preview Modal
  function openPreviewModal(project) {
    previewTitle.textContent = project.title;
    previewExternalLink.href = project.liveUrl;
    previewFrame.src = project.liveUrl;
    previewModal.classList.remove("hidden");
    previewModal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }

  function closePreviewModal() {
    previewModal.classList.add("hidden");
    previewModal.classList.remove("flex");
    previewFrame.src = "about:blank";
    document.body.style.overflow = "";
  }

  // Details Modal
  function openDetailsModal(p) {
    const isFav = favorites.includes(p.id);
    detailsModalContent.innerHTML = `
      <div class="relative">
        <!-- Header Banner -->
        <div class="h-28 rounded-t-2xl bg-gradient-to-r ${p.gradient} p-6 flex items-end justify-between relative overflow-hidden">
          <div class="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
          <div class="relative z-10 flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-slate-900 border border-white/20 flex items-center justify-center text-white text-xl">
              <i class="${p.icon}"></i>
            </div>
            <div>
              <span class="text-xs uppercase tracking-wider font-bold text-white/80">${p.badge}</span>
              <h2 class="text-2xl font-black text-white">${p.title}</h2>
            </div>
          </div>
          <div class="relative z-10">
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md">
              ${p.categoryLabel}
            </span>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="p-6 md:p-8 space-y-6">
          <div>
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Overview</h4>
            <p class="text-slate-200 leading-relaxed text-sm md:text-base">
              ${p.longDesc}
            </p>
          </div>

          <!-- Key Highlights -->
          <div>
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Key Features & Highlights</h4>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              ${p.features
                .map(
                  (f) => `
                <li class="flex items-start gap-2.5 text-sm text-slate-300 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
                  <i class="fa-solid fa-circle-check text-sky-400 text-xs mt-1 shrink-0"></i>
                  <span>${f}</span>
                </li>
              `
                )
                .join("")}
            </ul>
          </div>

          <!-- Technologies Used -->
          <div>
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Technology Stack</h4>
            <div class="flex flex-wrap gap-2">
              ${p.techStack
                .map(
                  (t) => `
                <span class="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-800 border border-slate-700 text-sky-300">
                  ${t}
                </span>
              `
                )
                .join("")}
            </div>
          </div>

          <!-- Action Links & Documentation -->
          <div>
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">All Project Resources & Links</h4>
            <div class="flex flex-wrap gap-2.5">
              ${p.links
                .map((lnk) => {
                  let btnStyle = "bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700";
                  if (lnk.type === "primary") {
                    btnStyle = "bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-400 hover:to-blue-500 border-transparent shadow-lg shadow-sky-500/20";
                  } else if (lnk.type === "tertiary") {
                    btnStyle = "bg-purple-900/40 text-purple-300 border-purple-700/50 hover:bg-purple-900/60";
                  }
                  return `
                    <a 
                      href="${lnk.url}" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition ${btnStyle}"
                    >
                      <i class="${lnk.icon}"></i>
                      <span>${lnk.label}</span>
                    </a>
                  `;
                })
                .join("")}
            </div>
          </div>
        </div>
      </div>
    `;

    detailsModal.classList.remove("hidden");
    detailsModal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }

  function closeDetailsModal() {
    detailsModal.classList.add("hidden");
    detailsModal.classList.remove("flex");
    document.body.style.overflow = "";
  }

  // Toast Notification
  function showToast(message, type = "info") {
    let toast = document.getElementById("toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.className =
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-slate-900/95 border border-slate-700 text-white shadow-2xl backdrop-blur-md flex items-center gap-3 text-sm opacity-0 pointer-events-none transition-all duration-300";
      document.body.appendChild(toast);
    }

    let icon = "fa-solid fa-circle-info text-sky-400";
    if (type === "success") icon = "fa-solid fa-circle-check text-emerald-400";
    if (type === "warning") icon = "fa-solid fa-triangle-exclamation text-amber-400";

    toast.innerHTML = `
      <i class="${icon}"></i>
      <span>${message}</span>
    `;

    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  // Animated Counter for Stats
  function initStatsCounter() {
    const counters = document.querySelectorAll(".stat-counter");
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 20));
      const interval = setInterval(() => {
        count += step;
        if (count >= target) {
          counter.textContent = target;
          clearInterval(interval);
        } else {
          counter.textContent = count;
        }
      }, 50);
    });
  }
});
