import express from  "express"
import MessageController from  "../controllers/Message"
import * as auth from  "../utilities/auth"

const router = express.Router()

const {
  getAllMessages,
  createMessage,
  getMessage,
  updateMessage,
  deleteMessage,
} = MessageController

router.route("/").get(getAllMessages).post(auth.isLoggedIn, createMessage)

router.route("/:id").get(getMessage).put(updateMessage).delete(deleteMessage)

export default router