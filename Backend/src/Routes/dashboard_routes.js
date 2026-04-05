import express from "express";
import { getSummary, getCategoryWise, getTrends } from "../Controllers/dashboard_controller.js";

import { isAuthenticated } from "../Middlewares/auth_middleware.js";
import { authorizeRoles } from "../Middlewares/auth_role.js";

const router = express.Router();

// summary access to analyst and admin
router.get(
    "/summary",
    isAuthenticated,
    authorizeRoles("analyst", "admin"),
    getSummary
);

// category wise access to analyst and admin
router.get(
    "/category-wise",
    isAuthenticated,
    authorizeRoles("analyst", "admin"),
    getCategoryWise
);

// trends access to analyst and admin
router.get(
    "/trends",
    isAuthenticated,
    authorizeRoles("analyst", "admin"),
    getTrends
);

export default router;