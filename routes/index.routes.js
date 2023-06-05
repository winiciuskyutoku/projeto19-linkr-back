import { Router } from "express";
import userRouter from "./user.routes.js";
import postsRouter from "./post.routes.js";
import hashtagRouter from "./hashtag.routes.js";

const router = Router()

router.use(userRouter)
router.use(postsRouter)
router.use(hashtagRouter)

export default router