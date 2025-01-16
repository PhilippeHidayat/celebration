import { Request, Response } from 'express';
import { UserModel, User } from '../models/user'; // Import UserModel and User interface
import { CelebrationModel } from '../models/celebration';
import { getTimezoneByIp } from '../utils/timezone';

const userModel = new UserModel(); // Create an instance of UserModel
const celebrationModel = new CelebrationModel(); // Create an instance of CelebrationModel
// Function to insert a new user
export const insertUser = async (req: Request, res: Response) => {
    const user: User = req.body; // Get user data from request body
    try {
        const timezoneOffset = await getTimezoneByIp(req.body.ip);
        user.locationTimeZone = timezoneOffset;
        const userId = await userModel.insertUser(user);
        if (req.body.celebrations && userId !== -1) {
            for (const celebration of req.body.celebrations) {
                await celebrationModel.insertCelebration(celebration, userId);
            }
        }
        res.status(201).json({ message: "User inserted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error inserting user" });
    }
};

// Function to update an existing user
export const updateUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id); // Get user ID from request parameters
    const user: User = req.body; // Get updated user data from request body
    try {
        await userModel.updateUser(userId, user);
        if (req.body.celebrations) {
            for (const celebration of req.body.celebrations) {
                await celebrationModel.updateCelebration(celebration, userId);
            }
        }
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating user" });
    }
};

// Function to soft delete a user
export const deleteUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id); // Get user ID from request parameters
    try {
        await userModel.deleteUser(userId);
        res.status(200).json({ message: "User soft deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting user" });
    }
};

// Function to get user details by ID
export const getUserDetailsById = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id); // Get user ID from request parameters
    try {
        const userDetails = await userModel.getUserDetailsById(userId);
        if (userDetails) {
            res.status(200).json(userDetails);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching user details" });
    }
};
