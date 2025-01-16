"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CelebrationModel = void 0;
const database_1 = require("../database"); // Import database connection
class CelebrationModel {
    // Method to insert a new celebration
    async insertCelebration(celebration, userId) {
        await (0, database_1.connectDB)(); // Ensure the database is connected
        if (!database_1.client) {
            throw new Error("Database client is not connected");
        }
        const query = 'INSERT INTO celebrations(user_id, date, celebration_type) VALUES($1, $2, $3)';
        const values = [userId, celebration.date, celebration.celebrationType];
        console.log(query, values);
        try {
            await database_1.client.query(query, values);
            console.log("Celebration inserted successfully");
        }
        catch (error) {
            console.error("Error inserting celebration:", error);
            throw error; // Rethrow the error for handling in the controller
        }
    }
    // Method to update an existing celebration
    async updateCelebration(celebration, userId) {
        await (0, database_1.connectDB)(); // Ensure the database is connected
        if (!database_1.client) {
            throw new Error("Database client is not connected");
        }
        const query = 'UPDATE celebrations SET user_id = $1, date = $2, celebration_type = $3 WHERE id = $4';
        const values = [userId, celebration.date, celebration.celebrationType, celebration.id];
        try {
            await database_1.client.query(query, values);
            console.log("Celebration updated successfully");
        }
        catch (error) {
            console.error("Error updating celebration:", error);
            throw error;
        }
    }
    // Method to get celebrations based on user ID
    async getCelebrationsByUserId(userId) {
        await (0, database_1.connectDB)(); // Ensure the database is connected
        if (!database_1.client) {
            throw new Error("Database client is not connected");
        }
        const query = 'SELECT * FROM celebrations WHERE user_id = $1';
        const values = [userId];
        try {
            const result = await database_1.client.query(query, values);
            return result.rows; // Return the celebrations found
        }
        catch (error) {
            console.error("Error fetching celebrations:", error);
            return []; // Return an empty array in case of error
        }
    }
}
exports.CelebrationModel = CelebrationModel;
