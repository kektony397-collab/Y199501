
import React from 'react';

interface ToggleSwitchProps {
    label: string;
    enabled: boolean;
    onToggle: (enabled: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, enabled, onToggle }) => {
    return (
        <div className="flex flex-col items-center justify-center space-y-1 text-center">
            <button
                role="switch"
                aria-checked={enabled}
                onClick={() => onToggle(!enabled)}
                className={`${
                    enabled ? 'bg-yellow-500' : 'bg-gray-600'
                } relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-500`}
            >
                <span
                    className={`${
                        enabled ? 'translate-x-9' : 'translate-x-1'
                    } inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ease-in-out`}
                />
            </button>
             <span className="text-xs text-gray-400">{label}</span>
        </div>
    );
};

export default ToggleSwitch;
