import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { OnBoardingPage } from './pages/OnBoardingPage/OnBoardingPage';
import { LoginPage } from './pages/LoginPage/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 모바일 레이아웃 설정 */}
        {/* TODO 추후 인증 로직 추가 */}
        <Route element={<Layout />}>
          <Route path="/landing" element={<OnBoardingPage />} />;
          <Route path="/login" element={<LoginPage />} />;
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
