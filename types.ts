
export type MovementStatus = 'Moving' | 'Stopped' | 'Idle';

export interface LocationData {
    latitude: number;
    longitude: number;
    speed: number | null;
    accuracy: number;
}

export interface RideState {
    cumulativeDistanceKm: number;
    totalWaitingTimeSec: number;
}

export interface FareConfig {
    baseFare: number;
    platformFee: number;
    waitingRatePerMinute: number;
    distanceTiers: {
        upto: number;
        rate: number;
    }[];
}
