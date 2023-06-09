import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
//import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import { postSchema } from "../schemas/post.schemas.js";
import { getPosts, postPosts, likePost, deletePost, getNewPostsAmount, getPostsLogin } from "../controllers/post.controllers.js";
import schemaValidation from "../middlewares/schemaValidation.middleware.js";
import { validateDeletePost } from "../middlewares/post.middleware.js";
import { timestampSchema } from "../schemas/timestamp.schema.js";

const postsRouter = Router()

postsRouter.get("/get-new-posts/:date", authValidation, getNewPostsAmount)
postsRouter.post("/post", authValidation, schemaValidation(postSchema), postPosts)
postsRouter.get("/get-posts/:date", getPosts)
postsRouter.get("/get-posts-login/:date", getPostsLogin)
postsRouter.delete("/delete-post/:user_id/:id", authValidation,  validateDeletePost, deletePost)
postsRouter.post("/like-post/:id", authValidation, likePost);

export default postsRouter