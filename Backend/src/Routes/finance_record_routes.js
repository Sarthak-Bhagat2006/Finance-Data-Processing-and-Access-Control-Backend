import express from "express";
import { createRecord, getRecords, updateRecord, deleteRecord } from "../Controllers/finance_record_controller.js";

import { isAuthenticated } from "../Middlewares/auth_middleware.js";
import { authorizeRoles } from "../Middlewares/auth_role.js";

const router = express.Router();

// create
router.post("/", isAuthenticated, authorizeRoles("admin"), createRecord); //access to admin

// get
router.get("/", isAuthenticated, getRecords);

// update
router.put("/:id", isAuthenticated, authorizeRoles("admin"), updateRecord); //access to admin

// delete
router.delete("/:id", isAuthenticated, authorizeRoles("admin"), deleteRecord); //access to admin

export default router;