import { Router } from "express";
import { signUpValidation } from "../middlewares/userValidation.middleware.js";
import schemaValidation from "../middlewares/schemaValidation.middleware.js";
import {
  signUp,
  singIn,
  getUsers,
  getProfile
} from "../controllers/user.controllers.js";
import {
  loginSchema,
  signUpValidate,
  searchValidate
} from "../schemas/userValidate.schema.js";


const userRouter = Router();

userRouter.post("/sign-up", schemaValidation(signUpValidate), signUpValidation, signUp);
userRouter.post("/sign-in", schemaValidation(loginSchema), singIn);
userRouter.post("/get-users", schemaValidation(searchValidate), getUsers);
userRouter.get("/profile-user/:id", getProfile)



export default userRouter;