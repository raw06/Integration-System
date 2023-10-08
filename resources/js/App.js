import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider, Frame } from '@shopify/polaris';
import './App.css';
import AdapterLink from './layouts/AdapterLink';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppFrame from './layouts/AppFrame';
import AuthProvider from './context/AuthContext';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <AppProvider linkComponent={AdapterLink} i18n={enTranslations}>
      <BrowserRouter>
        <Frame>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <AppFrame />
            </QueryClientProvider>
          </AuthProvider>
        </Frame>
      </BrowserRouter>
    </AppProvider>
  );
}
