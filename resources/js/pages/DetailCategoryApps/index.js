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
import React, { useEffect, useState } from 'react';
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
  return (
    <Page title={collection.label}>
      <Grid>
        {apps.map((app) => {
          const { id, app_logo: appLogo, rick_text: rickText, name } = app;
          return (
            <Grid.Cell key={id} columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <Card>
                <BlockStack blockAlign='center' align='space-between' gap={100}>
                  <Thumbnail source={appLogo} alt={name} size='small' />
                  <BlockStack gap={100}>
                    <InlineStack blockAlign='center' align='space-between'>
                      <Text variant='headingMd'>{name}</Text>
                      <Button size='micro' url={`/app-details/${id}`}>
                        Detail
                      </Button>
                    </InlineStack>
                    <Text tone='subdued' variant='bodySm' truncate>
                      {rickText}
                    </Text>
                  </BlockStack>
                </BlockStack>
              </Card>
            </Grid.Cell>
          );
        })}
      </Grid>
    </Page>
  );
}
