import crypto from "crypto";

let items = [
  { id: crypto.randomUUID(), text: "Finish projects", mood: "🎀", done: false, createdAt: Date.now() },
  { id: crypto.randomUUID(), text: "Deploy on vercel", mood: "✨", done: false, createdAt: Date.now() },
];

export function listItems({ search = "", sort = "newest" } = {}) {
  let result = [...items];

  if (search) {
    const q = search.toLowerCase();
    result = result.filter((i) => i.text.toLowerCase().includes(q));
  }

  if (sort === "oldest") result.sort((a, b) => a.createdAt - b.createdAt);
  if (sort === "newest") result.sort((a, b) => b.createdAt - a.createdAt);
  if (sort === "done") result.sort((a, b) => Number(b.done) - Number(a.done));

  return {
    count: result.length,
    items: result,
  };
}

export function createItem({ text, mood = "✨" }) {
  const item = {
    id: crypto.randomUUID(),
    text,
    mood,
    done: false,
    createdAt: Date.now(),
  };
  items.unshift(item);
  return item;
}

export function toggleItem(id) {
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  items[idx].done = !items[idx].done;
  return items[idx];
}

export function deleteItem(id) {
  const before = items.length;
  items = items.filter((i) => i.id !== id);
  return items.length !== before;
}

export function clearCompleted() {
  const before = items.length;
  items = items.filter((i) => !i.done);
  return before - items.length;
}
