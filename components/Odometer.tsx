
import React from 'react';

interface OdometerProps {
    value: number;
    prefix?: string;
    className?: string;
}

const Odometer: React.FC<OdometerProps> = ({ value, prefix, className }) => {
    const formattedValue = value.toFixed(2);
    
    return (
        <div className={`flex items-baseline font-digital transition-all duration-300 ${className}`}>
            {prefix && <span className="text-4xl lg:text-5xl opacity-70 mr-2">{prefix}</span>}
            <span className="tabular-nums">
                {formattedValue}
            </span>
        </div>
    );
};

export default Odometer;
