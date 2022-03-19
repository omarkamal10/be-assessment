import express from "express";

import UserRoutes from "./User.Routes";
import URLCheckRoutes from "./URL.Routes";
const router = express.Router();

router.use("/users", UserRoutes);
router.use("/url-check", URLCheckRoutes);
export default router;
