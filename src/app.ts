import express, {Express, Request, Response, NextFunction} from 'express';
import requestIp from 'request-ip';
import geoip from 'geoip-lite';

import routes from './routes/index';
import { connectDB } from './database';
import { scheduleAnniversaryCheck } from './cron/index';

const app : Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(requestIp.mw());

app.use((req: Request, _res: Response, next: NextFunction) => {
    const ip: string = req.clientIp || '';
    const geo = geoip.lookup(ip);

    if (geo) {
        console.log(`User IP: ${ip}, Location: ${geo.city}, Timezone: ${geo.timezone}`);
        req.body.location = geo.city;
        req.body.ip = ip;
    } else {
        console.log(`User IP: ${ip}, Location: Unknown`);
        req.body.location = 'Unknown';
        req.body.ip = ip;
    }
    
    next();
});
connectDB();

scheduleAnniversaryCheck();

app.use('/api', routes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});