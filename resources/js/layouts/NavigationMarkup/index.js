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
      url: '/app-list/home',
      label: 'Collections',
      icon: CollectionsMajor,
      subNavigationItems: [
        {
          url: '/app-list/collection/files',
          disabled: false,
          label: 'Files',
          badge: '15',
        },
        {
          url: '/app-list/collection/reviews',
          disabled: false,
          label: 'Reviews',
          badge: '15',
        },
        {
          url: '/app-list/collection/emails',
          disabled: false,
          label: 'Email Capture',
        },
        {
          url: '/app-list/collection/ads',
          disabled: false,
          label: 'Advertising',
        },
        {
          url: '/app-list/collection/loyalty',
          disabled: false,
          label: 'Loyalty & Rewards',
        },
        {
          url: '/app-list/collection/shipping',
          disabled: false,
          label: 'Shipping & Logistics',
        },
        {
          url: '/app-list/collection/engage',
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
