import express from "express"
import cors from "cors"
import eventRoutes from "./routes/eventRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import pembicaraRoutes from "./routes/pembicaraRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import usersRouter from "./routes/userRoutes.js"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API Kon")
})

app.use("/events", eventRoutes)
app.use("/categories", categoryRoutes)
app.use("/pembicara", pembicaraRoutes)
app.use("/auth", authRoutes)
app.use("/users", usersRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// export default app