import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BuyerSide from './BuyerSide'

const BuyerLayout = ({ children, updateLoggedIn }) => {
  const location = useLocation();
  const [dashboardType, setDashboardType] = useState('buyer'); // Set the initial dashboard type

  // Check if the current location matches the dashboard path
  const isDashboard = location.pathname.startsWith('/buyerdashboard');

  return (
    <div className="flex h-screen text-center">
      {isDashboard && (
        <div className="w-1/5 bg-gray-200">
        <BuyerSide updateLoggedIn={updateLoggedIn} dashboardType={dashboardType} />
        </div>
      )}
      <div className="w-4/5 flex-grow overflow-y-auto bg-gray-100">
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default BuyerLayout;