import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import AppApi from '../../apis/AppApi';
import {
  BlockStack,
  Box,
  Button,
  Grid,
  InlineStack,
  Layout,
  Page,
  Text,
  Thumbnail,
} from '@shopify/polaris';
import AppSpinner from '../../components/AppSpinner';
import { collections } from '../../data/collections';
import categories from '../../data/categories';

export default function AppDetail() {
  const { id } = useParams();
  const [app, setApp] = useState({});
  const navigate = useNavigate();
  const { isFetching } = useQuery(['detail'], () => AppApi.detailApp(id), {
    onSuccess: (data) => {
      setApp(data);
    },
    onError: () => {},
    refetchOnWindowFocus: false,
  });

  const handleRedirectCategory = useCallback(() => {
    const url = categories.find((x) => x.value === app.collection_id).url;
    navigate(url);
  }, [app.collection_id, navigate]);

  if (isFetching) {
    return (
      <Page>
        <AppSpinner />
      </Page>
    );
  }

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Box padding='1000' paddingInlineStart='3200' paddingInlineEnd='3200'>
            <Grid columns={{ sm: 3 }}>
              <Grid.Cell columnSpan={{ lg: 3 }}>
                <BlockStack gap='800'>
                  <InlineStack blockAlign='center' gap='400' wrap={false}>
                    <Thumbnail size='large' source={app.app_logo} />
                    <Text as='h2' variant='headingXl'>
                      {app.name}
                    </Text>
                  </InlineStack>
                  <Text as='p' variant='headingLg' fontWeight='regular'>
                    {app.rick_text}
                  </Text>
                </BlockStack>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ lg: 7 }}>
                {app.youtube_link ? (
                  <iframe
                    width='100%'
                    height='450'
                    src={app.youtube_link}
                    title='YouTube video player'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    allowFullScreen
                    style={{
                      borderRadius: 'var(--p-border-radius-200)',
                    }}
                  ></iframe>
                ) : (
                  <img
                    width='100%'
                    height='450'
                    style={{
                      borderRadius: 'var(--p-border-radius-200)',
                    }}
                    src={app.description_image[0].url}
                  />
                )}
              </Grid.Cell>
              <Grid.Cell columnSpan={{ lg: 2 }}>
                <BlockStack gap='400'>
                  {app.youtube_link
                    ? app.description_image.map((image) => {
                        return (
                          <img
                            key={image.id}
                            style={{
                              borderRadius: 'var(--p-border-radius-200)',
                            }}
                            src={image.url}
                          />
                        );
                      })
                    : app.description_image.slice(0, -1).map((image) => {
                        return (
                          <img
                            key={image.id}
                            style={{
                              borderRadius: 'var(--p-border-radius-200)',
                            }}
                            src={image.url}
                          />
                        );
                      })}
                </BlockStack>
              </Grid.Cell>
            </Grid>
          </Box>
        </Layout.Section>
        <Layout.Section>
          <Box
            padding='1000'
            paddingInlineStart='3200'
            paddingInlineEnd='3200'
            background='bg-surface'
          >
            <Grid columns={{ sm: 3 }}>
              <Grid.Cell columnSpan={{ lg: 3 }}>
                <BlockStack gap={400} inlineAlign='start'>
                  <Text as='h3' variant='headingLg'>
                    Collection
                  </Text>
                  <Button variant='plain' onClick={handleRedirectCategory}>
                    <Text as='p' variant='bodyLg' tone='subdued'>
                      {collections.find((x) => x.value === app.collection_id).label}
                    </Text>
                  </Button>
                </BlockStack>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ lg: 9 }}>
                <BlockStack gap={400}>
                  <Text as='h2' variant='headingXl'>
                    Description
                  </Text>
                  <Text as='h3' variant='headingLg' fontWeight='regular' tone='subdued'>
                    {app.description}
                  </Text>
                </BlockStack>
              </Grid.Cell>
            </Grid>
          </Box>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
