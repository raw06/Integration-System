import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from '../../routes/routes';
import { Frame } from '@shopify/polaris';
import ToastProvider from '../../hooks/useToast';

export default function AppFrame() {
  return (
    <Frame>
      <ToastProvider>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </ToastProvider>
    </Frame>
  );
}
