import { Navigation } from '@shopify/polaris';
import { AppsMajor } from '@shopify/polaris-icons';
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function NavigationMarkup() {
  const location = useLocation();

  const navItemsAdmin = [
    {
      url: '/admin',
      label: 'App',
      icon: AppsMajor,
    },
  ];

  return (
    <Navigation location={location.pathname}>
      <Navigation.Section items={navItemsAdmin} />
    </Navigation>
  );
}
