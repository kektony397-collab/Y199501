
import { useMemo } from 'react';
import type { RideState } from '../types';
import { FARE_CONFIG } from '../constants';

export const useFareCalculator = (rideState: RideState) => {
    const { cumulativeDistanceKm, totalWaitingTimeSec } = rideState;

    const { distanceFare, timeFare, totalFare } = useMemo(() => {
        // Calculate distance fare based on tiers
        let calculatedDistanceFare = 0;
        let distanceRemaining = cumulativeDistanceKm;
        let lastTierUpto = 0;

        for (const tier of FARE_CONFIG.distanceTiers) {
            if (distanceRemaining <= 0) break;

            const distanceInTier = Math.min(distanceRemaining, tier.upto - lastTierUpto);
            calculatedDistanceFare += distanceInTier * tier.rate;
            distanceRemaining -= distanceInTier;
            lastTierUpto = tier.upto;
        }

        // Calculate time fare
        const totalWaitingTimeMinutes = totalWaitingTimeSec / 60;
        const calculatedTimeFare = totalWaitingTimeMinutes * FARE_CONFIG.waitingRatePerMinute;

        const subTotal = calculatedDistanceFare + calculatedTimeFare;
        
        let calculatedTotalFare = 0;

        // Base and platform fees are only added if there's any activity
        if (cumulativeDistanceKm > 0 || totalWaitingTimeSec > 0) {
            calculatedTotalFare = FARE_CONFIG.baseFare + FARE_CONFIG.platformFee + subTotal;
        }

        // Enforce minimum fare
        const minimumFare = FARE_CONFIG.baseFare + FARE_CONFIG.platformFee;
        if (calculatedTotalFare > 0 && calculatedTotalFare < minimumFare) {
             calculatedTotalFare = minimumFare;
        }

        return {
            distanceFare: calculatedDistanceFare,
            timeFare: calculatedTimeFare,
            totalFare: calculatedTotalFare,
        };
    }, [cumulativeDistanceKm, totalWaitingTimeSec]);

    return { totalFare, distanceFare, timeFare };
};
