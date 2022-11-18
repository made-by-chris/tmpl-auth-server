import express from  "express"
const router = express.Router()
import {
  getAllUsers,
  createUser,
  login,
  me,
  getUser,
  updateUser,
  deleteUser 
} from "../controllers/User"

router
  .route("/")
  .get(getAllUsers)
  .post(createUser)

router.route("/login").post(login)

router.get("/me", me)


export default router