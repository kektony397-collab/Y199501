
import React from 'react';

interface IconButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    label: string;
    className?: string;
    disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, children, label, className = '', disabled = false }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            className={`flex flex-col items-center justify-center space-y-1 text-center group transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            <div className="flex items-center justify-center w-16 h-16 bg-gray-700 rounded-full group-hover:bg-gray-600 group-active:bg-gray-500 transition-colors duration-200 shadow-lg">
                {children}
            </div>
            <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors duration-200">{label}</span>
        </button>
    );
};

export default IconButton;
