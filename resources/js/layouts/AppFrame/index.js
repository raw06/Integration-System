import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Frame } from '@shopify/polaris';
import ToastProvider from '../../hooks/useToast';
import { useAuth } from '../../context/AuthContext';
import AppSpinner from '../../components/AppSpinner';
import AppLayout from '../AppLayout';
import Login from '../../pages/Login';
import Admin from '../../pages/Admin';
import Profile from '../../pages/Profile';
import ClientDetail from '../../pages/ClientDetail';
import Partner from '../../pages/Parther';
import ManagePartner from '../../pages/ManagePartner';

export default function AppFrame() {
  const { initializing, authenticated } = useAuth();

  if (initializing) {
    return <AppSpinner />;
  }
  return (
    <Frame>
      <ToastProvider>
        <Routes>
          <Route
            path='/'
            element={authenticated ? <AppLayout /> : <Navigate to='/login' replace />}
          >
            <Route path='admin' element={<Admin />} />
            <Route path='profile' element={<Profile />} />
            <Route path='detail' element={<ClientDetail />} />
            <Route path='own-app' element={<Partner />} />
            <Route path='manage-app' element={<ManagePartner />} />
          </Route>
          <Route path='/login' element={authenticated ? <Navigate to='/' replace /> : <Login />} />
        </Routes>
      </ToastProvider>
    </Frame>
  );
}
