import { Card, EmptyState, Page } from '@shopify/polaris';
import React from 'react';

export default function NotFound() {
  return (
    <Page>
      <Card>
        <EmptyState
          heading='404 Not Found'
          secondaryAction={{
            content: 'Back',
            url: '/',
          }}
          image='https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png'
        >
          <p>Please click back button to redirect home page.</p>
        </EmptyState>
      </Card>
    </Page>
  );
}
