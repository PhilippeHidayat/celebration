import { Router } from 'express';
import { insertUser, updateUser, deleteUser, getUserDetailsById } from '../controllers/user';

const router = Router();

// Define routes for user operations
router.post('/users', insertUser); // Insert a new user
router.put('/users/:id', updateUser); // Update an existing user
router.delete('/users/:id', deleteUser); // Soft delete a user
router.get('/users/:id', getUserDetailsById); // Get user details by ID

export default router;