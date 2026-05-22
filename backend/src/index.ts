import "dotenv/config";
import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import pembicaraRoutes from "./routes/pembicaraRoutes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/events", eventRoutes);
app.use("/pembicara", pembicaraRoutes);
app.use("/categories", categoryRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
