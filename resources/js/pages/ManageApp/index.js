import {
  BlockStack,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Icon,
  InlineStack,
  OptionList,
  Page,
  Text,
  Thumbnail,
} from '@shopify/polaris';
import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import AppApi from '../../apis/AppApi';
import AppSpinner from '../../components/AppSpinner';
import categories from '../../data/categories';
import { ChevronRightMinor, FolderMajor } from '@shopify/polaris-icons';
import { useNavigate, useParams } from 'react-router-dom';
import options from '../../data/options';

export default function ManageApp() {
  const { type: collection } = useParams();
  const [apps, setApps] = useState([]);
  const [type, setType] = useState([]);
  const navigate = useNavigate();
  const { isFetching } = useQuery(['apps'], () => AppApi.getAllApp(), {
    onSuccess: (data) => {
      setApps(data);
    },
    onError: () => {},
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const handleClickBuildOwnApp = useCallback(() => {
    navigate('/create-app');
  }, [navigate]);

  useEffect(() => {
    navigate(type[0]);
  }, [navigate, type]);

  useEffect(() => {
    if (collection) {
      setType([`/app-list/collection/${collection}`]);
    } else {
      setType(['/app-list/home']);
    }
  }, [collection]);

  if (isFetching) {
    return (
      <Page>
        <AppSpinner />
      </Page>
    );
  }
  console.log(collection);
  return (
    <Page fullWidth>
      <Box>
        <Grid columns={{ sm: 3 }}>
          <Grid.Cell columnSpan={{ lg: 2 }}>
            <BlockStack>
              <OptionList
                title='Collections'
                onChange={setType}
                options={options}
                selected={type}
              />
              <Divider />
              <Box paddingInlineStart={'300'} paddingBlockStart={300}>
                <InlineStack align='start'>
                  <Text>
                    <Icon source={FolderMajor} />
                  </Text>
                  <Button variant='plain' onClick={handleClickBuildOwnApp}>
                    Build your own app
                  </Button>
                </InlineStack>
              </Box>
            </BlockStack>
          </Grid.Cell>
          {!collection ? (
            <Grid.Cell columnSpan={{ lg: 10 }}>
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
                            const { id, app_logo: appLogo, rick_text: rickText, name } = app;
                            return (
                              <Grid.Cell
                                key={id}
                                columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}
                              >
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
                      </BlockStack>
                    </Box>
                  );
                }
              })}
            </Grid.Cell>
          ) : (
            <Grid.Cell columnSpan={{ lg: 10 }}>
              <Page title={categories.find((x) => x.slug === collection).label} fullWidth>
                <Grid>
                  {apps
                    .filter(
                      (x) =>
                        x.collection_id === categories.find((x) => x.slug === collection).value,
                    )
                    .map((app) => {
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
            </Grid.Cell>
          )}
        </Grid>
      </Box>
    </Page>
  );
}
