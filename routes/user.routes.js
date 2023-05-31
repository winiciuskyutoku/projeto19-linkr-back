import { Router } from "express";
import { signUpValidation } from "../middlewares/userValidation.middelware.js";
import schemaValidation from "../middlewares/schemaValidation.middleware.js";
import { signUp, singIn, getUsers } from "../controllers/user.controllers.js";
import { loginSchema, signUpValidate, searchValidate } from "../schemas/userValidate.schema.js";

const userRouter = Router();

userRouter.post("/sign-up", schemaValidation(signUpValidate), signUpValidation, signUp);
userRouter.post("/sign-in", schemaValidation(loginSchema), singIn);
userRouter.get("/get-users", schemaValidation(searchValidate), getUsers);

export default userRouter;