
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="w-full max-w-md text-center mb-8">
            <h1 className="text-3xl font-bold text-yellow-400 tracking-wider">
                Rapido Meter
            </h1>
            <p className="text-sm text-gray-400">Your Real-time Fare Calculator</p>
        </header>
    );
};

export default Header;
