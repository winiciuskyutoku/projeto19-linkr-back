import { Router } from "express";

import { follow } from "../controllers/follow.controller.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";

const followRouter = Router();

followRouter.use(authValidation)
followRouter.post("/follow/:id", follow);

export default followRouter;