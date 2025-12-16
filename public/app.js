const listEl = document.getElementById("list");
const emptyEl = document.getElementById("emptyState");
const countEl = document.getElementById("count");
const toastEl = document.getElementById("toast");

const form = document.getElementById("createForm");
const textInput = document.getElementById("textInput");
const moodInput = document.getElementById("moodInput");
const searchInput = document.getElementById("searchInput");
const sortInput = document.getElementById("sortInput");
const clearDoneBtn = document.getElementById("clearDoneBtn");
const healthEl = document.getElementById("health");

let state = { search: "", sort: "newest" };

function toast(msg) {
  toastEl.textContent = msg;
  setTimeout(() => (toastEl.textContent = ""), 1600);
}

async function api(path, options) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok && res.status !== 204) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Request failed");
  }
  return res.status === 204 ? null : res.json();
}

function render({ items, count }) {
  countEl.textContent = count;
  listEl.innerHTML = "";

  if (!items.length) {
    emptyEl.classList.remove("d-none");
    return;
  }
  emptyEl.classList.add("d-none");

  for (const item of items) {
    const row = document.createElement("div");
    row.className = `card glass item ${item.done ? "done" : ""}`;

    row.innerHTML = `
      <div class="left">
        <div class="icon">${item.mood || "✨"}</div>
        <div class="text">${escapeHtml(item.text)}</div>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-outline-light" data-action="toggle" data-id="${item.id}">
          ${item.done ? "Undo" : "Done"}
        </button>
        <button class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${item.id}">
          Delete
        </button>
      </div>
    `;

    listEl.appendChild(row);
  }
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[c]));
}

async function load() {
  const q = new URLSearchParams();
  if (state.search) q.set("search", state.search);
  if (state.sort) q.set("sort", state.sort);

  const data = await api(`/api/items?${q.toString()}`);
  render(data);
}

async function checkHealth() {
  try {
    const data = await api("/api/health");
    healthEl.textContent = "OK";
  } catch {
    healthEl.textContent = "offline";
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = textInput.value.trim();
  if (!text) return toast("Type something first 😌");
  try {
    await api("/api/items", { method: "POST", body: JSON.stringify({ text, mood: moodInput.value }) });
    textInput.value = "";
    toast("Added 💖");
    await load();
  } catch (err) {
    toast(err.message);
  }
});

searchInput.addEventListener("input", async (e) => {
  state.search = e.target.value.trim();
  await load();
});

sortInput.addEventListener("change", async (e) => {
  state.sort = e.target.value;
  await load();
});

clearDoneBtn.addEventListener("click", async () => {
  try {
    const res = await api("/api/items", { method: "DELETE" });
    toast(`Cleared ${res.cleared} done ✨`);
    await load();
  } catch (err) {
    toast(err.message);
  }
});

listEl.addEventListener("click", async (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;

  const id = btn.dataset.id;
  const action = btn.dataset.action;

  try {
    if (action === "toggle") await api(`/api/items/${id}/toggle`, { method: "PATCH" });
    if (action === "delete") await api(`/api/items/${id}`, { method: "DELETE" });
    await load();
  } catch (err) {
    toast(err.message);
  }
});

(async function init() {
  await checkHealth();
  await load();
})();
