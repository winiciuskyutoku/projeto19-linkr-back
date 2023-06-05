import { Router } from "express";
import { getHashtags, getHashtagsByName } from "../controllers/hashtag.controller.js";

const hashtagRouter = Router()

hashtagRouter.get("/hashtags/:hashtag", getHashtagsByName)
hashtagRouter.get("/hashtags", getHashtags)

export default hashtagRouter