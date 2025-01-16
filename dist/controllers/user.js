"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetailsById = exports.deleteUser = exports.updateUser = exports.insertUser = void 0;
const user_1 = require("../models/user"); // Import UserModel and User interface
const celebration_1 = require("../models/celebration");
const timezone_1 = require("../utils/timezone");
const userModel = new user_1.UserModel(); // Create an instance of UserModel
const celebrationModel = new celebration_1.CelebrationModel(); // Create an instance of CelebrationModel
// Function to insert a new user
const insertUser = async (req, res) => {
    const user = req.body; // Get user data from request body
    try {
        const timezoneOffset = await (0, timezone_1.getTimezoneByIp)(req.body.ip);
        user.locationTimeZone = timezoneOffset;
        const userId = await userModel.insertUser(user);
        if (req.body.celebrations && userId !== -1) {
            for (const celebration of req.body.celebrations) {
                await celebrationModel.insertCelebration(celebration, userId);
            }
        }
        res.status(201).json({ message: "User inserted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Error inserting user" });
    }
};
exports.insertUser = insertUser;
// Function to update an existing user
const updateUser = async (req, res) => {
    const userId = parseInt(req.params.id); // Get user ID from request parameters
    const user = req.body; // Get updated user data from request body
    try {
        await userModel.updateUser(userId, user);
        if (req.body.celebrations) {
            for (const celebration of req.body.celebrations) {
                await celebrationModel.updateCelebration(celebration, userId);
            }
        }
        res.status(200).json({ message: "User updated successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Error updating user" });
    }
};
exports.updateUser = updateUser;
// Function to soft delete a user
const deleteUser = async (req, res) => {
    const userId = parseInt(req.params.id); // Get user ID from request parameters
    try {
        await userModel.deleteUser(userId);
        res.status(200).json({ message: "User soft deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting user" });
    }
};
exports.deleteUser = deleteUser;
// Function to get user details by ID
const getUserDetailsById = async (req, res) => {
    const userId = parseInt(req.params.id); // Get user ID from request parameters
    try {
        const userDetails = await userModel.getUserDetailsById(userId);
        if (userDetails) {
            res.status(200).json(userDetails);
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching user details" });
    }
};
exports.getUserDetailsById = getUserDetailsById;
