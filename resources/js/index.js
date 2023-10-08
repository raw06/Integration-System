import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './routes/routes';
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';

const container = document.getElementById('root');

const root = createRoot(container);

const router = createBrowserRouter(routes);

root.render(
  <AppProvider i18n={enTranslations}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </AppProvider>,
);
