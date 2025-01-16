// import fetch from 'node-fetch';
import { Temporal } from '@js-temporal/polyfill';

interface TimezoneData {
    timezone: string; 
}

export async function getTimezoneByIp(ip: string): Promise<string> {
    try {
        // Fetch IP-based timezone data
        const response = await fetch(`http://ip-api.com/json/${ip}`);

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = (await response.json()) as TimezoneData; // Type the data

        if (data && data.timezone) {
            // Convert UTC offset to GMT format
            const offset = Temporal.Now.instant().toZonedDateTimeISO(data.timezone).offset; // e.g., "+07:00"
            const hours = offset === '00:00' ? '0' : offset.slice(0, 3); // Convert to +7, -7, or 0
            // const gmtString = `GMT${hours}`;
            return hours;
        } else {
            return '0';
        }
    } catch (error) {
        console.error('Error fetching timezone:', error);
        return 'Error fetching timezone';
    }
}

// export async function getTimezoneByIp(ip: string): Promise<string | null> {
//     try {
//       // Use a free IP geolocation API, e.g., ipapi
//       const apiKey = "your_api_key"; // Some APIs require an API key
//       const url = `http://ip-api.com/json/${ip}?fields=timezone`;
  
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`Error fetching data: ${response.statusText}`);
//       }
  
//       const data = await response.json();
//       return data.timezone || null;
//     } catch (error) {
//       console.error("Error getting timezone:", error);
//       return null;
//     }
//   }