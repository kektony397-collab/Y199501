
import type { FareConfig } from './types';

export const FARE_CONFIG: FareConfig = {
    baseFare: 19.00,
    platformFee: 2.50,
    waitingRatePerMinute: 0.50,
    distanceTiers: [
        { upto: 2, rate: 0.00 }, // 0 to 2 km
        { upto: 4, rate: 4.00 }, // 2 to 4 km
        { upto: 100, rate: 6.50 }, // 4 to 100 km
    ],
};
