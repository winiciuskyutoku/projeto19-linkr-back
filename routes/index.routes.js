import { Router } from "express";
import userRouter from "./user.routes.js";
import postsRouter from "./post.routes.js";
import hashtagRouter from "./hashtag.routes.js";
import followRouter from "./follow.routes.js";
import commentRouter from "./comments.routes.js";

const router = Router()

router.use(userRouter)
router.use(postsRouter)
router.use(hashtagRouter)
router.use(followRouter);
router.use(commentRouter)

export default router