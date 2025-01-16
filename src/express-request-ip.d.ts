import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            clientIp?: string; // Add the clientIp property
        }
    }
}
