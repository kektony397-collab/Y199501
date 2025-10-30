
import { useState, useEffect, useRef, useCallback } from 'react';
import type { LocationData, MovementStatus } from '../types';

interface GeolocationProps {
    onLocationUpdate: (distanceKm: number) => void;
    active: boolean;
}

const STOP_DELAY_MS = 5000; // 5 seconds to be considered stopped

export const useGeolocation = ({ onLocationUpdate, active }: GeolocationProps) => {
    const [locationData, setLocationData] = useState<LocationData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [movementStatus, setMovementStatus] = useState<MovementStatus>('Idle');

    const watchIdRef = useRef<number | null>(null);
    const lastPositionRef = useRef<LocationData | null>(null);
    const stopTimerRef = useRef<number | null>(null);

    const haversineDistance = (coords1: LocationData, coords2: LocationData): number => {
        const toRad = (x: number) => (x * Math.PI) / 180;
        const R = 6371; // Earth radius in km

        const dLat = toRad(coords2.latitude - coords1.latitude);
        const dLon = toRad(coords2.longitude - coords1.longitude);
        const lat1 = toRad(coords1.latitude);
        const lat2 = toRad(coords2.latitude);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    };

    const handlePositionUpdate = useCallback((position: GeolocationPosition) => {
        const { latitude, longitude, speed, accuracy } = position.coords;
        const newLocationData: LocationData = { latitude, longitude, speed, accuracy };
        
        setLocationData(newLocationData);
        setMovementStatus('Moving');
        
        if (stopTimerRef.current) {
            clearTimeout(stopTimerRef.current);
        }
        stopTimerRef.current = window.setTimeout(() => {
            setMovementStatus('Stopped');
        }, STOP_DELAY_MS);
        
        if (lastPositionRef.current) {
            // Only calculate distance if accuracy is reasonable
            if (accuracy < 50) {
                 const distance = haversineDistance(lastPositionRef.current, newLocationData);
                 // Only add distance if it's a meaningful move to filter out GPS jitter
                 if (distance > 0.005) { // more than 5 meters
                    onLocationUpdate(distance);
                 }
            }
        }
        lastPositionRef.current = newLocationData;
    }, [onLocationUpdate]);

    const handleError = (err: GeolocationPositionError) => {
        setError(err.message);
    };

    const startTracking = useCallback(() => {
        if (navigator.geolocation && watchIdRef.current === null) {
            lastPositionRef.current = null; // Reset last position on start
            setMovementStatus('Stopped');
            watchIdRef.current = navigator.geolocation.watchPosition(
                handlePositionUpdate,
                handleError,
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        }
    }, [handlePositionUpdate]);

    const stopTracking = useCallback(() => {
        if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
        }
        if (stopTimerRef.current) {
            clearTimeout(stopTimerRef.current);
        }
        setMovementStatus('Idle');
    }, []);
    
    const resetTracking = useCallback(() => {
        lastPositionRef.current = null;
    }, []);

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            stopTracking();
        };
    }, [stopTracking]);

    return { locationData, error, movementStatus, startTracking, stopTracking, resetTracking };
};
