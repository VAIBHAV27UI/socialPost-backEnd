import express from "express";
import { login, signup } from "../controller/admin.controller";

const router = express.Router();

router.post("/admin/signup", signup);
router.post("/admin/login", login);

export default router;
