import { Router } from "express";
import { signUpValidation } from "../middlewares/userValidation.middelware.js";
import { signUp } from "../controllers/user.controllers.js";

const userRouter = Router()

userRouter.post("/sign-up", signUpValidation, signUp)

export default userRouter