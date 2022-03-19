import express from "express";
import { urlController } from "../controllers";
import { Authenticate } from "../middleware";
const router = express.Router();

// *==========================================================================
// *                                 URL Checks
// *==========================================================================

router.post("/create", Authenticate(), urlController.createURLCheck);

router.post("/check", Authenticate(), urlController.urlCheck);

router.put("/:id", Authenticate(), urlController.modifyURLCheck);
router.get("/", Authenticate(), urlController.getAllURLChecks);

router.get("/tags/:tag", Authenticate(), urlController.getURLChecksByTag);

export default router;
