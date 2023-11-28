import {
  BlockStack,
  Box,
  Button,
  Card,
  Grid,
  Icon,
  InlineStack,
  Layout,
  LegacyStack,
  Page,
  Text,
  Thumbnail,
} from '@shopify/polaris';
import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import AppApi from '../../apis/AppApi';
import AppSpinner from '../../components/AppSpinner';
import categories from '../../data/categories';
import { ChevronRightMinor } from '@shopify/polaris-icons';

export default function ManageApp() {
  const [apps, setApps] = useState([]);
  const { isFetching } = useQuery(['apps'], () => AppApi.getAllApp(), {
    onSuccess: (data) => {
      setApps(data);
    },
    onError: () => {},
    keepPreviousData: true,
  });

  const handleClickAppCard = useCallback(() => {}, []);

  if (isFetching) {
    return (
      <Page>
        <AppSpinner />
      </Page>
    );
  }

  return (
    <Page title='All apps'>
      {categories.map((category) => {
        const appsByCategory = apps
          .filter((app) => app.collection_id === category.value)
          .slice(0, 2);
        if (appsByCategory.length !== 0) {
          return (
            <Box key={category.value} paddingBlockEnd={'1000'}>
              <BlockStack gap={400}>
                <BlockStack>
                  <InlineStack align='space-between' blockAlign='center'>
                    <Text variant='headingMd'>{category.label}</Text>
                    <Button url={category.url} variant='plain'>
                      <InlineStack>
                        <Text tone='success'>View all apps</Text>
                        <Icon source={ChevronRightMinor} tone='success' />
                      </InlineStack>
                    </Button>
                  </InlineStack>
                  <Text variant='bodyMd' tone='subdued'>
                    {category.des}
                  </Text>
                </BlockStack>
                <Grid>
                  {appsByCategory.map((app) => {
                    const { id, app_logo: appLogo, description, name } = app;
                    return (
                      <Grid.Cell key={id} columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                        <Card>
                          <LegacyStack blockAlign='center'>
                            <LegacyStack.Item>
                              <Thumbnail source={appLogo} alt={name} size='small' />
                            </LegacyStack.Item>
                            <LegacyStack.Item fill>
                              <BlockStack gap={100}>
                                <InlineStack blockAlign='center' align='space-between'>
                                  <Text variant='headingMd'>{name}</Text>
                                  <Button size='micro' onClick={handleClickAppCard}>
                                    Detail
                                  </Button>
                                </InlineStack>
                                <Text tone='subdued' variant='bodySm'>
                                  {description}
                                </Text>
                              </BlockStack>
                            </LegacyStack.Item>
                          </LegacyStack>
                        </Card>
                      </Grid.Cell>
                    );
                  })}
                </Grid>
              </BlockStack>
            </Box>
          );
        }
      })}
    </Page>
  );
}
