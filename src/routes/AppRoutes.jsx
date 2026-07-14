import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage.jsx';
import MainPage from '../pages/MainPage.jsx';
import DetailPage from '../pages/DetailPage.jsx';
import MyPage from '../pages/MyPage.jsx';
import ProtectedRoute from './ProtectedRoute';
import SignUpPage from '../pages/SignUpPage.jsx';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route
      path="/"
      element={
         <ProtectedRoute>
          <MainPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/festivals/:festivalId"
      element={
        <ProtectedRoute>
          <DetailPage />
         </ProtectedRoute>
      }
    />
    <Route
      path="/mypage"
      element={
         <ProtectedRoute>
          <MyPage />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
