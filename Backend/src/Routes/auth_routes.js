import express from "express";
import { registerUser } from "../Controllers/auth_controller.js";
import { loginUser } from "../Controllers/auth_controller.js";

const router = express.Router();

//register route
router.post("/register", registerUser);

//login route
router.post("/login", loginUser);

export default router;