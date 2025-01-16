import { CelebrationType } from './enums/celebration'; // Update the import path
import { connectDB, client } from '../database'; // Import database connection

export interface Celebration {
    id: number; // Primary key for the celebration
    userId: number; // Foreign key referencing the User
    date: Date; // The date of the celebration
    celebrationType: string; // The type of celebration
}

export class CelebrationModel {
    
    // Method to insert a new celebration
    public async insertCelebration(celebration: Celebration, userId: number): Promise<void> {
        await connectDB(); // Ensure the database is connected
        if (!client) {
            throw new Error("Database client is not connected");
        }
        const query = 'INSERT INTO celebrations(user_id, date, celebration_type) VALUES($1, $2, $3)';
        const values = [userId, celebration.date, celebration.celebrationType];
        console.log(query, values);
        try {
            await client.query(query, values);
            console.log("Celebration inserted successfully");
        } catch (error) {
            console.error("Error inserting celebration:", error);
            throw error; // Rethrow the error for handling in the controller
        }
    }

    // Method to update an existing celebration
    public async updateCelebration(celebration: Celebration, userId: number): Promise<void> {
        await connectDB(); // Ensure the database is connected
        if (!client) {
            throw new Error("Database client is not connected");
        }
        const query = 'UPDATE celebrations SET user_id = $1, date = $2, celebration_type = $3 WHERE id = $4';
        const values = [userId, celebration.date, celebration.celebrationType, celebration.id];

        try {
            await client.query(query, values);
            console.log("Celebration updated successfully");
        } catch (error) {
            console.error("Error updating celebration:", error);
            throw error;
        }
    }

    // Method to get celebrations based on user ID
    public async getCelebrationsByUserId(userId: number): Promise<Celebration[]> {
        await connectDB(); // Ensure the database is connected
        if (!client) {
            throw new Error("Database client is not connected");
        }
        const query = 'SELECT * FROM celebrations WHERE user_id = $1';
        const values = [userId];

        try {
            const result = await client.query(query, values);
            return result.rows; // Return the celebrations found
        } catch (error) {
            console.error("Error fetching celebrations:", error);
            return []; // Return an empty array in case of error
        }
    }

    // Additional methods for updating and deleting celebrations can be added here
} 