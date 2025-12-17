const statusEl = document.getElementById("status");
const nameInput = document.getElementById("nameQuery");
const minAgeInput = document.getElementById("minAge");
const maxAgeInput = document.getElementById("maxAge");

function render(model) {
  const source = document.getElementById("results_template").innerHTML;
  const template = Handlebars.compile(source);
  document.getElementById("results").innerHTML = template(model);
}

async function checkHealth() {
  try {
    const res = await fetch("/api/health");
    const data = await res.json();
    statusEl.textContent = data.ok ? "API: OK ✅" : "API: not ok";
  } catch {
    statusEl.textContent = "API: error ❌";
  }
}

async function showAll() {
  const res = await fetch("/api");
  const model = await res.json();
  render(model);
}

async function search() {
  const name = nameInput.value.trim();
  const minAge = minAgeInput.value.trim();
  const maxAge = maxAgeInput.value.trim();

  const params = new URLSearchParams();
  if (name) params.set("name", name);
  if (minAge) params.set("minAge", minAge);
  if (maxAge) params.set("maxAge", maxAge);

  const url = `/api/search?${params.toString()}`;
  const res = await fetch(url);
  const model = await res.json();
  render(model);
}

document.getElementById("searchBtn").addEventListener("click", search);
document.getElementById("showAllBtn").addEventListener("click", showAll);

checkHealth();
showAll();
