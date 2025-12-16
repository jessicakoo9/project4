import express from "express";
import {
  listItems,
  createItem,
  toggleItem,
  deleteItem,
  clearCompleted,
} from "../data/items.store.js";

const router = express.Router();


router.get("/", (req, res) => {
  const search = (req.query.search || "").trim();
  const sort = (req.query.sort || "newest").trim();
  res.json(listItems({ search, sort }));
});


router.post("/", (req, res) => {
  const { text, mood } = req.body || {};
  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Text is required." });
  }
  const newItem = createItem({ text: text.trim(), mood: mood || "✨" });
  res.status(201).json(newItem);
});


router.patch("/:id/toggle", (req, res) => {
  const updated = toggleItem(req.params.id);
  if (!updated) return res.status(404).json({ error: "Item not found." });
  res.json(updated);
});


router.delete("/:id", (req, res) => {
  const ok = deleteItem(req.params.id);
  if (!ok) return res.status(404).json({ error: "Item not found." });
  res.status(204).send();
});


router.delete("/", (req, res) => {
  const cleared = clearCompleted();
  res.json({ cleared });
});

export default router;
