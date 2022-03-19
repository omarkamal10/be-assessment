import express from "express";
import url from "url";
import { userController } from "../controllers";
import { Authenticate } from "../middleware";
const router = express.Router();

// *==========================================================================
// *                                 Auth
// *==========================================================================

router.get("/ping", Authenticate(), (req, res) => {
  console.log("Ping!!");

  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  console.log(trimmedPath);
  console.log(req.method);
  res.send("Ping!");
});

router.post("/register", userController.createUser);
router.post("/login", userController.login);

router.get("/verify/:id/:token", userController.verifyUser);

export default router;
