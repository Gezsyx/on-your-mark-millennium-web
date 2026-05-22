import express from "express"
import cors from "cors"
import eventRoutes from "./routes/eventRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import pembicaraRoutes from "./routes/pembicaraRoutes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API Kon")
})

app.use("/events", eventRoutes)
app.use("/categories", categoryRoutes)
app.use("/pembicara", pembicaraRoutes)

export default app