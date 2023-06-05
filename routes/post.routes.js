import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
//import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import { postSchema } from "../schemas/post.schemas.js";
import { getPosts, postPosts, likePost } from "../controllers/post.controllers.js";
import schemaValidation from "../middlewares/schemaValidation.middleware.js";

const postsRouter = Router()

postsRouter.post("/post", authValidation, schemaValidation(postSchema), postPosts)
postsRouter.get("/get-posts", getPosts)
postsRouter.post("/like-post/:id", authValidation, likePost);

export default postsRouter