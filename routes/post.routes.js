import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import { postSchema } from "../schemas/post.schemas.js";
import { postPosts } from "../controllers/post.controllers.js";


const postsRouter = Router()

postsRouter.post("/post", authValidation, validateSchema(postSchema), postPosts)

export default postsRouter