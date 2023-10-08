import React from 'react';
import Login from '../pages/Login';
import App from '../App';

const routes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
];

export default routes;
