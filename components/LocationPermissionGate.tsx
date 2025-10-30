
import React from 'react';

const LocationPermissionGate: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6 text-center">
      <div className="max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6.364-6.364l-1.414-1.414M21 12h-2m-1.414-6.364l-1.414 1.414M12 3v2m-6.364 6.364L7.05 7.05M12 21a9 9 0 110-18 9 9 0 010 18z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01" />
           <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 17.657l-1.414-1.414" />
        </svg>
        <h1 className="text-2xl font-bold text-yellow-400 mb-2">Location Access Required</h1>
        <p className="text-gray-300 mb-6">
          Rapido Meter needs access to your location to calculate distance and fare accurately. Please enable location services for this app in your device settings.
        </p>
        <div className="bg-gray-800 p-4 rounded-lg text-left text-sm text-gray-400">
          <p className="font-semibold mb-2">To enable permissions:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Open your browser/device settings.</li>
            <li>Go to "Privacy" or "Site Settings".</li>
            <li>Find "Location" and ensure it is allowed for this site.</li>
            <li>You may need to refresh the page after changing the setting.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default LocationPermissionGate;
