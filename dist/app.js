"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_ip_1 = __importDefault(require("request-ip"));
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const index_1 = __importDefault(require("./routes/index"));
const database_1 = require("./database");
const index_2 = require("./cron/index");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(request_ip_1.default.mw());
app.use((req, _res, next) => {
    const ip = req.clientIp || '';
    const geo = geoip_lite_1.default.lookup(ip);
    if (geo) {
        console.log(`User IP: ${ip}, Location: ${geo.city}, Timezone: ${geo.timezone}`);
        req.body.location = geo.city;
        req.body.ip = ip;
    }
    else {
        console.log(`User IP: ${ip}, Location: Unknown`);
        req.body.location = 'Unknown';
        req.body.ip = ip;
    }
    next();
});
(0, database_1.connectDB)();
(0, index_2.scheduleAnniversaryCheck)();
app.use('/api', index_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
