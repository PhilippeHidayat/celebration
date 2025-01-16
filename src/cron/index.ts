import cron from 'node-cron';
import { fetchAnniversaries } from '../controllers/cron/checkAnniversary';


// Schedule a cron job to check for anniversaries every day at midnight
export const scheduleAnniversaryCheck = () => {
    cron.schedule('0 * * * *', () => {
        try {
            fetchAnniversaries();
            console.log('Anniversaries checked:');
            // Additional logic for handling anniversaries can be added here
        } catch (error) {
            console.error('Error checking anniversaries:', error);
        }
    });
};