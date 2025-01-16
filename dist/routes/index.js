"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
// Define routes for user operations
router.post('/users', user_1.insertUser); // Insert a new user
router.put('/users/:id', user_1.updateUser); // Update an existing user
router.delete('/users/:id', user_1.deleteUser); // Soft delete a user
router.get('/users/:id', user_1.getUserDetailsById); // Get user details by ID
exports.default = router;
