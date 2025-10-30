
import React from 'react';
import type { MovementStatus } from '../types';
import Odometer from './Odometer';

interface MeterDisplayProps {
    totalFare: number;
    distanceKm: number;
    movementStatus: MovementStatus;
}

const MeterDisplay: React.FC<MeterDisplayProps> = ({ totalFare, distanceKm, movementStatus }) => {
    const isStopped = movementStatus === 'Stopped' || movementStatus === 'Idle';
    
    return (
        <div className="w-full bg-gray-800/50 rounded-2xl p-6 text-center border border-gray-700 shadow-2xl backdrop-blur-sm">
            <div className="mb-4">
                <div className="text-8xl lg:text-9xl font-bold h-32 flex items-center justify-center transition-all duration-300">
                    {isStopped ? (
                        <Odometer value={totalFare} prefix="₹" />
                    ) : (
                        <div className="flex items-baseline text-gray-500 font-digital transition-opacity duration-300">
                             <span className="opacity-50 text-5xl">--</span>
                             <span className="text-8xl mx-2">00</span>
                             <span className="opacity-50 text-5xl">--</span>
                        </div>
                    )}
                </div>
                <p className="text-sm text-yellow-500 font-medium tracking-widest uppercase">
                    {isStopped ? 'Total Fare' : 'Moving'}
                </p>
            </div>
            
            <div className="border-t border-gray-700 pt-4">
                <p className="text-lg text-gray-400">Distance</p>
                <p className="text-3xl font-digital text-white">
                    {distanceKm.toFixed(2)} <span className="text-xl text-gray-400">km</span>
                </p>
            </div>
        </div>
    );
};

export default MeterDisplay;
