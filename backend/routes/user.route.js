import express from "express"
import { deleteUser, login, register, updateUser } from "../controllers/user.controller.js"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { singleUpload } from "../middleware/multer.js"

const router = express.Router()

router.route("/register").post(singleUpload, register)
router.route("/login").post(login)
router.route("/logout").get(deleteUser)
router.route("/profile/update").post(isAuthenticated,singleUpload, updateUser)

export default router;