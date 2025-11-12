import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNavigation } from './BottomNavigation';

export const Layout = () => {
  const [activeTab, setActiveTab] = useState('basket');

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
        backgroundColor: "white",
      }}
    >
      <div style={{ paddingBottom: '70px', height: '100%', overflowY: 'auto' }}>
        <Outlet />
      </div>
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} hasNotification={false} />
    </div>
  );
};
