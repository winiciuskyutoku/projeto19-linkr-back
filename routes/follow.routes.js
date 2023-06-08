import { Router } from "express";

import { follow, follower } from "../controllers/follow.controller.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { followValidate } from "../middlewares/followValidate.middleware.js";

const followRouter = Router();

followRouter.post("/follow/:id", authValidation, followValidate, follow);
followRouter.get("/follower/:id", authValidation, followValidate, follower);

export default followRouter;