import express from  "express"
const app = express()
const PORT = process.env.PORT || 8080
import cookieParser from  "cookie-parser"
import { v4: uuidv4 } from  "uuid"

// SESSIONS
const sessions = []

function sessionChecker(request, response, next) {
  const sessionId = request.cookies.sessionId
  console.log(sessions, sessionId)
  if (sessionId) {
    const session = sessions.find((session) => session.id === sessionId)
    if (session) {
      request.session = session
    } else {
      response.clearCookie("sessionId")
    }
    console.log("session found", session)
  }
  next()
}

function sessionCreator(request, response, next) {
  if (!request.session) {
    const newSession = {
      id: uuidv4(),
    }
    sessions.push(newSession)
    response.cookie("sessionId", newSession.id)
    request.session = newSession
    console.log("new session", newSession)
  }
  next()
}

app.use(cookieParser())
app.use(sessionChecker)
app.use(sessionCreator)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(PORT, () => console.log("SESSION DEMO LISTENING ON PORT " + PORT))
