import express from "express"
import { login, signUp } from "../controller/user.controller"

const router = express.Router()

router.post("/users/signup", signUp)
router.post("/users/login", login)

export default router
