import { Navigation } from '@shopify/polaris';
import { AppsMajor, CollectionsMajor, FolderMajor } from '@shopify/polaris-icons';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function NavigationMarkup() {
  const location = useLocation();
  const { currentUser } = useAuth();

  const navItemsAdmin = [
    {
      url: '/admin',
      label: 'App Partner for Admin',
      icon: AppsMajor,
    },
  ];

  const navMarketPlace = [
    {
      url: '/apps',
      label: 'Collections',
      icon: CollectionsMajor,
      subNavigationItems: [
        {
          url: '/reviews',
          disabled: false,
          label: 'Reviews',
          badge: '15',
        },
        {
          url: '/emails',
          disabled: false,
          label: 'Email Capture',
        },
        {
          url: '/advertisement',
          disabled: false,
          label: 'Advertising',
        },
        {
          url: '/loyalty',
          disabled: false,
          label: 'Loyalty & Rewards',
        },
        {
          url: '/shipping',
          disabled: false,
          label: 'Shipping & Logistics',
        },
        {
          url: '/cus-support',
          disabled: false,
          label: 'Customer support',
        },
      ],
    },
  ];

  const navCreateApp = [
    {
      url: '/create-app',
      label: 'Build your own app',
      icon: FolderMajor,
    },
  ];

  return (
    <Navigation location={location.pathname}>
      {currentUser.role === 1 && <Navigation.Section items={navItemsAdmin} />}
      {currentUser.role === 0 && (
        <>
          <Navigation.Section items={navMarketPlace} />
          <Navigation.Section items={navCreateApp} />
        </>
      )}
    </Navigation>
  );
}
