declare module 'geoip-lite' {
    export function lookup(ip: string): {
        country: string;
        region: string;
        city: string;
        ll: [number, number];
        metro: number;
        area: number;
        timezone: string;
    } | null;
} 