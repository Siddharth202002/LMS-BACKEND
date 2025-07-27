import { Router } from "express";
import { getUserStats } from "../controllers/admin.controller.js";
import { isloogedIn, autorizeRoles } from "../middleWare/auth.middleware.js";

const adminRouter = Router();

adminRouter.get("/", isloogedIn, autorizeRoles("ADMIN"), getUserStats);

export default adminRouter;
