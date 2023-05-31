import { Router } from "express";
import { signUpValidation } from "../middlewares/userValidation.middelware.js";
import {signInValidation} from "../middlewares/loginValidation.middleware.js";
import { signUp, singIn } from "../controllers/user.controllers.js";

import { loginSchema } from "../schemas/user_login.schema.js";

const userRouter = Router()

userRouter.post("/sign-up", signUpValidation, signUp)
userRouter.post("/sign-in",signInValidation(loginSchema), singIn )

export default userRouter