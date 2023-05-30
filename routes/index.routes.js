import { Router } from "express";
import userRouter from "./user.routes.js";

const router = Router()

router.use(userRouter)

export default router