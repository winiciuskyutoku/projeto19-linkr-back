import { Router } from "express";
import userRouter from "./user.routes.js";
import postsRouter from "./post.routes.js";

const router = Router()

router.use(userRouter)
router.use(postsRouter)

export default router