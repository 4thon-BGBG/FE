import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { OnBoardingPage } from './pages/OnBoardingPage/OnBoardingPage';
import { InventoryPage } from './pages/InventoryPage/InventoryPage';
import { LoginPage } from './pages/auth/LoginPage/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage/RegisterPage';
import { MyPage } from './pages/MyPage/MyPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 모바일 레이아웃 설정 */}
        {/* TODO 추후 인증 로직 추가 */}
        <Route element={<Layout />}>
          <Route path="/landing" element={<OnBoardingPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
