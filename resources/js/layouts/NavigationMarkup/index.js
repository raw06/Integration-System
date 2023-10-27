import { Divider, Navigation } from '@shopify/polaris';
import { AppsMajor, CollectionsMajor, FolderMajor } from '@shopify/polaris-icons';
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function NavigationMarkup() {
  const location = useLocation();

  const navItemsAdmin = [
    {
      url: '/admin',
      label: 'App Partner for Admin',
      icon: AppsMajor,
    },
  ];

  const navMarketPlace = [
    {
      url: '/',
      label: 'Collections',
      icon: CollectionsMajor,
      subNavigationItems: [
        {
          url: '#',
          disabled: false,
          label: 'Reviews',
          badge: '15',
        },
        {
          url: '#',
          disabled: false,
          label: 'Email Capture',
        },
        {
          url: '#',
          disabled: false,
          label: 'Advertising',
        },
        {
          url: '#',
          disabled: false,
          label: 'Loyalty & Rewards',
        },
        {
          url: '#',
          disabled: false,
          label: 'Shipping & Logistics',
        },
        {
          url: '#',
          disabled: false,
          label: 'Customer support',
        },
      ],
    },
  ];

  const navOwnApp = [
    {
      url: '/own-app',
      label: 'Build your own app',
      icon: FolderMajor,
    },
  ];

  return (
    <Navigation location={location.pathname}>
      <Navigation.Section items={navMarketPlace} />
      <Navigation.Section items={navOwnApp} />
    </Navigation>
  );
}
