import { connectDB, client } from '../../database'; // Import the database connection
import { Celebration } from '../celebration'; // Import the Celebration interface if needed

export class CheckAnniversaryModel {
    
    // Public function to get anniversaries from the database
    public async getAnniversaries(): Promise<{ firstName: string; lastName: string; email: string; celebrationType: string; }[]> {
        await connectDB(); // Ensure the database is connected
        if (!client) {
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
            const result = await client.query(query);
            return result.rows; // Return the rows of data
        } catch (error) {
            console.error("Error fetching anniversaries:", error);
            throw error; // Rethrow the error for handling in the controller
        }
    }
}
