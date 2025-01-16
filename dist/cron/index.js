"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleAnniversaryCheck = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const checkAnniversary_1 = require("../controllers/cron/checkAnniversary");
// Schedule a cron job to check for anniversaries every day at midnight
const scheduleAnniversaryCheck = () => {
    node_cron_1.default.schedule('0 * * * *', () => {
        try {
            (0, checkAnniversary_1.fetchAnniversaries)();
            console.log('Anniversaries checked:');
            // Additional logic for handling anniversaries can be added here
        }
        catch (error) {
            console.error('Error checking anniversaries:', error);
        }
    });
};
exports.scheduleAnniversaryCheck = scheduleAnniversaryCheck;
