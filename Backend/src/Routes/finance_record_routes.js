import express from "express";
import { createRecord, getRecords, updateRecord, deleteRecord } from "../Controllers/finance_record_controller.js";

import { isAuthenticated } from "../Middlewares/auth_middleware.js";
// import { authorizeRoles } from "../Middlewares/role_middleware.js"; 

const router = express.Router();

// create
router.post("/", isAuthenticated, createRecord);

// get
router.get("/", isAuthenticated, getRecords);

// update
router.put("/:id", isAuthenticated, updateRecord);

// delete
router.delete("/:id", isAuthenticated, deleteRecord);

export default router;