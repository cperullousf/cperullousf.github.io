const filters = [...document.querySelectorAll(".filter-button")];
const cards = [...document.querySelectorAll(".destination-card")];
const searchInput = document.querySelector("#destination-search");
const resultsCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
let activeRegion = "all";

function updateDestinations() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  for (const card of cards) {
    const matchesRegion = activeRegion === "all" || card.dataset.region === activeRegion;
    const matchesSearch = card.dataset.name.includes(query) || card.querySelector("h3").textContent.toLowerCase().includes(query);
    const isVisible = matchesRegion && matchesSearch;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  }

  resultsCount.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? "place" : "places"}`;
  emptyState.hidden = visibleCount > 0;
}

for (const filter of filters) {
  filter.addEventListener("click", () => {
    activeRegion = filter.dataset.region;
    for (const button of filters) {
      const isActive = button === filter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    }
    updateDestinations();
  });
}

searchInput.addEventListener("input", updateDestinations);

for (const button of document.querySelectorAll(".save-button")) {
  button.addEventListener("click", () => {
    const isSaved = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", String(!isSaved));
    button.setAttribute("aria-label", `${isSaved ? "Save" : "Remove"} ${button.closest(".destination-card").querySelector("h3").textContent}`);
  });
}