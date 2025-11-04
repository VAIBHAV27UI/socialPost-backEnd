import express from "express"
import {createPost, getAllPost, updatePostStatus} from './../controller/post.controller'
import { verifyToken } from "../middleware/auth";
import multer from "multer";

const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post("/users/create-post", verifyToken, upload.single("image"), createPost) 
router.get("/get-all-post", getAllPost) 
router.put("/get-all-post/:id/status", updatePostStatus)


export default router;
