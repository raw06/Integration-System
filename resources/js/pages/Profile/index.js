import { Card, Layout, Page, Text } from '@shopify/polaris';
import React from 'react';

export default function Profile() {
  return (
    <Page
      primaryAction={{
        content: 'Save',
        onAction: () => {},
      }}
      secondaryActions={[
        {
          content: 'Change password',
          onAction: () => {},
        },
      ]}
    >
      <Layout>
        <Layout.Section variant='oneHalf'>
          <Card>
            <Text>
              <Text as='span' fontWeight='medium'>
                Name:{' '}
              </Text>
              <Text as='span'>Raw</Text>
            </Text>
            <Text>
              <Text as='span'>Link to home page:</Text>
              <Text as='span'>https://google.com</Text>
            </Text>
          </Card>
        </Layout.Section>
        <Layout.Section variant='oneHalf'>
          <Card>1</Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
