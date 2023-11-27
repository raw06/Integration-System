import { Card, Layout, Page, Text } from '@shopify/polaris';
import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { currentUser } = useAuth();
  console.log(currentUser);
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
            <Text variant='headingMd'>
              <Text as='span' fontWeight='medium' variant='bodyMd'>
                Name:{' '}
              </Text>
              <Text as='span'>{currentUser.name}</Text>
            </Text>
          </Card>
        </Layout.Section>
        <Layout.Section variant='oneHalf'>
          <Card>
            <Text>
              <Text as='span'>Email: </Text>
              <Text as='span'>{currentUser.email}</Text>
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
