import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNavigation } from './BottomNavigation';

export const Layout = () => {
  const [activeTab, setActiveTab] = useState('basket');
  const location = useLocation();
  const noneNavBarPaths = ['login', 'register', 'landing'];
  const showNavbar = !noneNavBarPaths.some((path) =>
    location.pathname.includes(path),
  );

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div
      style={{
        maxWidth: '430px',
        height: '100dvh',
        margin: '0 auto',
        position: 'relative',
        backgroundColor: 'white',
      }}
    >
      <Outlet />
      {showNavbar && (
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
          hasNotification={false}
        />
      )}
    </div>
  );
};
