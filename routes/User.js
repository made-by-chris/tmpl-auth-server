import express from  "express"
const router = express.Router()
import {
  getAllUsers,
  createUser,
  login,
  logout,
  me
} from "../controllers/User"

router
  .route("/")
  .get(getAllUsers)
  .post(createUser)

router.post("/login", login)
router.get("/me", me)
router.get("/logout", logout)


export default router