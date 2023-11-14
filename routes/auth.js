import express from "express";
import { login_user, logout_user } from "../controller/auth_controller.js";

// init route
const router = express.Router();

// create router
router.post("/api/v1/login", login_user )
router.post("/api/v1/logout", logout_user )

// export router
export default router