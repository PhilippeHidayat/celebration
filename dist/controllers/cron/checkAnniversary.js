"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAnniversaries = void 0;
const checkAnniversary_1 = require("../../models/cron/checkAnniversary");
const checkAnniversaryModel = new checkAnniversary_1.CheckAnniversaryModel();
const fetchAnniversaries = async () => {
    try {
        const anniversaries = await checkAnniversaryModel.getAnniversaries();
        const fetchPromises = anniversaries.map(async (anniversary) => {
            const { firstName, lastName, email, celebrationType } = anniversary;
            const response = await fetch('https://email-service.digitalenvision.com.au/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    message: `Hey, ${firstName} ${lastName} it's your ${celebrationType}`
                }),
            });
            return response.json();
        });
        await Promise.all(fetchPromises);
        console.log(anniversaries);
    }
    catch (error) {
        console.error("Error fetching anniversaries:", error);
    }
};
exports.fetchAnniversaries = fetchAnniversaries;
