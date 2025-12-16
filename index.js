
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import itemsRouter from "./routes/items.routes.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, "..", "public")));


app.use("/api/items", itemsRouter);


app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    app: "Jessica REST App",
    time: new Date().toISOString(),
  });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
