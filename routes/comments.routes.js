import { Router } from "express";
import { getComments, postComments } from "../controllers/comments.controllers.js";
import schemaValidation from "../middlewares/schemaValidation.middleware.js";
import { commentSchema } from "../schemas/comments.schemas.js";

const commentRouter = Router()

commentRouter.get("/get-comments/:post_id", getComments)
commentRouter.post("/post-comments", schemaValidation(commentSchema) ,postComments)

export default commentRouter