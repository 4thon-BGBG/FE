import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div
      style={{
        maxWidth: '430px',
        height: '100dvh',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <Outlet />
    </div>
  );
};
