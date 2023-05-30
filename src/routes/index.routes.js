import { Router } from "express";
import postsRouter from "./post.routes.js";

const router = Router()

router.use(postsRouter)

export default router