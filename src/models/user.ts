import { connectDB, disconnectDB, client } from '../database'; // Import the database connection and client
import { Celebration } from './celebration'; // Update the import to use Celebration

export interface User {
    id: number; // Primary key for the user
    email: string;
    firstName: string;
    lastName: string;
    location: string;
    locationTimeZone: string;
    deletedAt?: Date | null; // Optional field for soft delete
}

export class UserModel {

    // Method to insert a new user into the database
    public async insertUser(user: User): Promise<number> {
        await connectDB(); // Ensure the database is connected
        if (!client) {
            throw new Error("Database client is not connected");
        }
        const query = 'INSERT INTO users(email, first_name, last_name, location, location_timezone) VALUES($1, $2, $3, $4, $5) RETURNING id';
        const values = [user.email, user.firstName, user.lastName, user.location, user.locationTimeZone];

        try {
            console.log(query, values);
            const result = await client.query(query, values);
            console.log("User inserted successfully with ID:", result.rows[0].id);
            return result.rows[0].id;
        } catch (error) {
            console.error("Error inserting user:", error);
            throw error; // Rethrow the error for handling in the controller
        }
        // No need to disconnect here; the client will be reused
    }

    // Method to update an existing user in the database
    public async updateUser(id: number, user: User): Promise<void> {
        await connectDB(); // Ensure the database is connected
        if (!client) {
            throw new Error("Database client is not connected");
        }
        const query = 'UPDATE users SET email = $1, first_name = $2, last_name = $3, location = $4, location_timezone = $5 WHERE id = $6 AND deletedAt IS NULL';
        const values = [user.email, user.firstName, user.lastName, user.location, user.locationTimeZone, id];

        try {
            const result = await client.query(query, values);
            if (result.rowCount === 0) {
                throw new Error("User not found or has been deleted");
            }
            console.log("User updated successfully");
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    }

    // Method to soft delete a user in the database
    public async deleteUser(id: number): Promise<void> {
        await connectDB(); // Ensure the database is connected
        if (!client) {
            throw new Error("Database client is not connected");
        }
        const query = 'UPDATE users SET deleted_at = $1 WHERE id = $2';
        const values = [new Date(), id]; // Set deletedAt to the current date

        try {
            const result = await client.query(query, values);
            if (result.rowCount === 0) {
                throw new Error("User not found");
            }
            console.log("User soft deleted successfully");
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    }

    // Method to get user details by ID, excluding the deletedAt column
    public async getUserDetailsById(id: number): Promise<Omit<User, 'deletedAt'> | null> {
        await connectDB(); // Ensure the database is connected
        if (!client) {
            throw new Error("Database client is not connected");
        }
        const query = 'SELECT id, email, first_name, last_name, location, location_timezone FROM users WHERE id = $1 AND deletedAt IS NULL';
        const values = [id];

        try {
            const result = await client.query(query, values);
            if (result.rowCount === 0) {
                return null; // User not found
            }
            const user = result.rows[0];
            return {
                id: user.id,
                email: user.email,
                firstName: user.firstname,
                lastName: user.lastname,
                location: user.location,
                locationTimeZone: user.locationtimezone,
            };
        } catch (error) {
            console.error("Error fetching user details:", error);
            return null; // Return null in case of error
        }
    }
}
