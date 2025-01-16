import { RequestHandler } from 'express';

declare module 'request-ip' {
    export function mw(): RequestHandler;
} 