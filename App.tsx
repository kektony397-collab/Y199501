
import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { RideState, MovementStatus } from './types';
import { FARE_CONFIG } from './constants';
import { useGeolocation } from './hooks/useGeolocation';
import { useFareCalculator } from './hooks/useFareCalculator';
import Header from './components/Header';
import MeterDisplay from './components/MeterDisplay';
import Controls from './components/Controls';
import LocationPermissionGate from './components/LocationPermissionGate';

const INITIAL_RIDE_STATE: RideState = {
    cumulativeDistanceKm: 0,
    totalWaitingTimeSec: 0,
};

const App: React.FC = () => {
    const [isRideActive, setIsRideActive] = useState<boolean>(false);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [rideState, setRideState] = useState<RideState>(INITIAL_RIDE_STATE);
    const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);

    const waitingTimerRef = useRef<number | null>(null);

    const onLocationUpdate = useCallback((distanceKm: number) => {
        setRideState(prevState => ({
            ...prevState,
            cumulativeDistanceKm: prevState.cumulativeDistanceKm + distanceKm,
        }));
    }, []);

    const { locationData, movementStatus, startTracking, stopTracking, resetTracking } = useGeolocation({
        onLocationUpdate,
        active: isRideActive,
    });

    const { totalFare, distanceFare, timeFare } = useFareCalculator(rideState);

    const startWaitingTimer = useCallback(() => {
        if (waitingTimerRef.current) clearInterval(waitingTimerRef.current);
        waitingTimerRef.current = window.setInterval(() => {
            setRideState(prevState => ({
                ...prevState,
                totalWaitingTimeSec: prevState.totalWaitingTimeSec + 1,
            }));
        }, 1000);
    }, []);

    const stopWaitingTimer = useCallback(() => {
        if (waitingTimerRef.current) {
            clearInterval(waitingTimerRef.current);
            waitingTimerRef.current = null;
        }
    }, []);
    
    useEffect(() => {
        if (isRideActive && isWaiting && movementStatus === 'Stopped') {
            startWaitingTimer();
        } else {
            stopWaitingTimer();
        }
        return () => stopWaitingTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRideActive, isWaiting, movementStatus, startWaitingTimer, stopWaitingTimer]);

    const handleStartStop = () => {
        setIsRideActive(prev => {
            const nextState = !prev;
            if (nextState) {
                startTracking();
            } else {
                stopTracking();
                stopWaitingTimer();
            }
            return nextState;
        });
    };
    
    const handleReset = () => {
        setIsRideActive(false);
        setIsWaiting(false);
        setRideState(INITIAL_RIDE_STATE);
        stopTracking();
        resetTracking();
        stopWaitingTimer();
    };
    
    const handleWaitingToggle = (enabled: boolean) => {
        setIsWaiting(enabled);
    };

    const checkPermissions = async () => {
        try {
            const status = await navigator.permissions.query({ name: 'geolocation' });
            if (status.state === 'granted') {
                setPermissionGranted(true);
            } else if (status.state === 'prompt') {
                // Request permission by trying to get position
                navigator.geolocation.getCurrentPosition(
                    () => setPermissionGranted(true),
                    () => setPermissionGranted(false)
                );
            } else {
                setPermissionGranted(false);
            }
            status.onchange = () => {
                setPermissionGranted(status.state === 'granted');
            };
        } catch (error) {
            console.error("Permission query failed:", error);
            setPermissionGranted(false);
        }
    };

    useEffect(() => {
        checkPermissions();
    }, []);


    if (permissionGranted === null) {
        return <div className="flex items-center justify-center h-screen bg-gray-900 text-white">Loading...</div>;
    }

    if (!permissionGranted) {
        return <LocationPermissionGate />;
    }
    
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-between p-4 selection:bg-yellow-500/30">
            <Header />
            <main className="flex-grow flex flex-col items-center justify-center w-full max-w-md">
                <MeterDisplay 
                    totalFare={totalFare}
                    distanceKm={rideState.cumulativeDistanceKm}
                    movementStatus={isRideActive ? movementStatus : 'Idle'}
                />
            </main>
            <Controls 
                isRideActive={isRideActive}
                isWaiting={isWaiting}
                onStartStop={handleStartStop}
                onReset={handleReset}
                onWaitingToggle={handleWaitingToggle}
            />
        </div>
    );
};

export default App;
