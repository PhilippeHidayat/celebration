"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAnniversaryModel = void 0;
const database_1 = require("../../database"); // Import the database connection
class CheckAnniversaryModel {
    // Public function to get anniversaries from the database
    async getAnniversaries() {
        await (0, database_1.connectDB)(); // Ensure the database is connected
        if (!database_1.client) {
            throw new Error("Database client is not connected");
        }
        const query = 'SELECT u.first_name, u.last_name, u.email, c.celebration_type ' +
            'FROM users u ' +
            'join celebrations c on u.id = c.user_id ' +
            'WHERE ' +
            'DATE( ' +
            'CURRENT_TIMESTAMP AT TIME ZONE \'UTC\' + (u.location_timezone || \' hours\')::INTERVAL ' +
            ') = c.date ' +
            'AND ( ' +
            'CURRENT_TIMESTAMP AT TIME ZONE \'UTC\' + (u.location_timezone || \' hours\')::INTERVAL ' +
            ')::time BETWEEN \'09:00:00\' AND \'09:59:59\';'; // Adjust the query as needed
        try {
            const result = await database_1.client.query(query);
            return result.rows; // Return the rows of data
        }
        catch (error) {
            console.error("Error fetching anniversaries:", error);
            throw error; // Rethrow the error for handling in the controller
        }
    }
}
exports.CheckAnniversaryModel = CheckAnniversaryModel;
