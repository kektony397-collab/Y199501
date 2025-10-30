
import React from 'react';
import IconButton from './IconButton';
import ToggleSwitch from './ToggleSwitch';
import PlayIcon from './icons/PlayIcon';
import StopIcon from './icons/StopIcon';
import ResetIcon from './icons/ResetIcon';

interface ControlsProps {
    isRideActive: boolean;
    isWaiting: boolean;
    onStartStop: () => void;
    onReset: () => void;
    onWaitingToggle: (enabled: boolean) => void;
}

const Controls: React.FC<ControlsProps> = ({ isRideActive, isWaiting, onStartStop, onReset, onWaitingToggle }) => {
    return (
        <footer className="w-full max-w-md bg-gray-800/50 rounded-2xl p-4 mt-8 border border-gray-700 shadow-lg backdrop-blur-sm">
            <div className="flex justify-around items-center">
                <IconButton onClick={onReset} label="Reset">
                    <ResetIcon />
                </IconButton>

                <button
                    onClick={onStartStop}
                    className={`w-24 h-24 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-2xl
                        ${isRideActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                    aria-label={isRideActive ? 'Stop Ride' : 'Start Ride'}
                >
                    {isRideActive ? <StopIcon /> : <PlayIcon />}
                </button>
                
                <ToggleSwitch 
                    label="Waiting"
                    enabled={isWaiting}
                    onToggle={onWaitingToggle}
                />
            </div>
        </footer>
    );
};

export default Controls;
