import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { blogEntryMiddleware } from "./api/blogEntries.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const frontendPath = path.join(__dirname, "../../frontend/public");

app.use(express.json());

app.use(express.static(frontendPath));

app.use("/api/blog", blogEntryMiddleware);

app.all("*all", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
