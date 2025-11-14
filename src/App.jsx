import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

import { MainPage } from './pages/main/MainPage';
import { OnBoardingPage } from './pages/OnBoardingPage/OnBoardingPage';
import { InventoryPage } from './pages/InventoryPage/InventoryPage';
import { LoginPage } from './pages/auth/LoginPage/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage/RegisterPage';
import { MyPage } from './pages/MyPage/MyPage';
import ProtectedRoute from './components/layout/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 모바일 레이아웃 설정 */}
        <Route element={<Layout />}>
          <Route path="/landing" element={<OnBoardingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/main" element={<MainPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/mypage" element={<MyPage />} />
          {/* </Route> */}
          <Route path="*" element={<Navigate to="/landing" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
