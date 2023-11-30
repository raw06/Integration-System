import { Frame } from '@shopify/polaris';
import React from 'react';
import { Outlet } from 'react-router-dom';
// import NavigationMarkup from '../NavigationMarkup';
import TopBarMarkup from '../TopBarMarkup';

export default function AppLayout() {
  const logo = {
    width: 50,
    topBarSource:
      'https://cdn.shopify.com/app-store/listing_images/2445590e1563d688025d1e3553b3e9cd/icon/CKXp9quxh_wCEAE=.jpeg',
    contextualSaveBarSource:
      'https://cdn.shopify.com/app-store/listing_images/2445590e1563d688025d1e3553b3e9cd/icon/CKXp9quxh_wCEAE=.jpeg',
    url: '/',
    accessibilityLabel: 'Integration System',
  };
  return (
    <Frame logo={logo} topBar={<TopBarMarkup />}>
      <Outlet />
    </Frame>
  );
}
