import {
  BlockStack,
  Button,
  Card,
  Grid,
  InlineStack,
  LegacyStack,
  Page,
  Text,
  Thumbnail,
} from '@shopify/polaris';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import categories from '../../data/categories';
import { useQuery } from 'react-query';
import AppApi from '../../apis/AppApi';
import AppSpinner from '../../components/AppSpinner';

export default function DetailCategoryApps() {
  const { type } = useParams();
  const collection = categories.find((category) => category.slug === type);
  const [apps, setApps] = useState([]);
  const { isFetching, refetch } = useQuery(['apps'], () => AppApi.getAllApp(collection.value), {
    onSuccess: (data) => {
      setApps(data);
    },
    onError: () => {},
    refetchOnWindowFocus: false,
  });

  const handleClickAppCard = useCallback(() => {}, []);

  useEffect(() => {
    refetch();
  }, [refetch, type]);

  if (isFetching) {
    return (
      <Page>
        <AppSpinner />
      </Page>
    );
  }
  console.log(apps);
  return (
    <Page title={collection.label}>
      <Grid>
        {apps.map((app) => {
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
    </Page>
  );
}
