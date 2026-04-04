import express from "express";
import { registerUser } from "../Controllers/auth_controller.js";
import { loginUser } from "../Controllers/auth_controller.js";
import { isAuthenticated } from "../Middlewares/auth_middleware.js";

const router = express.Router();

//register route
router.post("/register", isAuthenticated, registerUser);

//login route
router.post("/login", isAuthenticated, loginUser);

export default router;