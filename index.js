import express from  "express"
import "dotenv/config"
import connectToDB from  "./models/index"
import cookieParser from "cookie-parser"
import cors from  "cors"
import messageRouter from  "./routes/Message"
import userRouter from  "./routes/User"
import * as jwt from  "./utilities/jwt"
import chalk from  "chalk"

const app = express()
const PORT = process.env.PORT || 8080

// MIDDLEWARES 
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(chalk.blue(req.method), chalk.white(req.url))
  next()
})

app.use(express.json())
app.use(cors({
  origin : "http://localhost:5173",
  credentials: true,
}
))
app.use(jwt.decodeToken)

// AUTHENTICATION
app.use("/users", userRouter)

// SIMPLE CRUD EXAMPLE
app.use("/messages", messageRouter)

connectToDB().then(() => {
  app.listen(PORT, () => console.log(chalk.green(`LISTENING ON PORT ${PORT} (http://localhost:${PORT})`)))
})
