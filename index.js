import express from "express";
import cors from "cors";

import chatRoutes from "./routes/chat.routes.js";
import productRoutes from "./routes/product.routes.js";
import translateRoutes from "./routes/translate.routes.js";
import pdfsummarizeRoutes from "./routes/pdfsummarize.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Node + Ollama API is running 🚀");
});

app.use("/api/chat", chatRoutes);
app.use("/api/products", productRoutes);
app.use("/api/translate", translateRoutes);
app.use("/api", pdfsummarizeRoutes);

app.listen(3000, () => {
  console.log("API running at http://localhost:3000");
});
