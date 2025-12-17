const statusEl = document.getElementById("status");
const nameInput = document.getElementById("nameQuery");

async function checkHealth() {
  try {
    const res = await fetch("/api/health");
    const data = await res.json();
    statusEl.textContent = data.ok ? "API: OK" : "API: not ok";
  } catch (e) {
    statusEl.textContent = "API: error";
  }
}

function render_view(model) {
  const source = document.getElementById("show_results_view").innerHTML;
  const template = Handlebars.compile(source);
  document.getElementById("results").innerHTML = template(model);
}

async function updateView(button) {
  const type = button.dataset.querytype;
  let apiUrl = "/api";

  if (type === "by_name") {
    const q = nameInput.value.trim();
    apiUrl = `/api/by_name/${encodeURIComponent(q || "")}`;
  }

  const res = await fetch(apiUrl);
  const model = await res.json();
  render_view(model);
}

document.getElementById("queryByName").addEventListener("click", (e) => updateView(e.target));
document.getElementById("showAll").addEventListener("click", (e) => updateView(e.target));

checkHealth();
updateView({ dataset: { querytype: "all" } });
