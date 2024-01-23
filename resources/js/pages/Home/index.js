import React, { useState } from 'react';
import './Home.css';
import {
  BlockStack,
  Box,
  Button,
  Grid,
  InlineStack,
  Link,
  Text,
  Thumbnail,
} from '@shopify/polaris';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import AppApi from '../../apis/AppApi';
import AppSpinner from '../../components/AppSpinner';

export default function Home() {
  const [apps, setApps] = useState([]);
  const navigate = useNavigate();
  const { isFetching } = useQuery(['apps'], () => AppApi.getAllApp(), {
    onSuccess: (data) => {
      setApps(data);
    },
    onError: () => {},
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <AppSpinner />;
  }
  return (
    <div style={{ background: '#fff', height: '100vh' }}>
      <div className='wrapper'>
        <div style={{ padding: '64px' }}>
          <InlineStack align='start'>
            <Box>
              <p className='title'>Make integration</p>
              <p className='title'>with ours</p>
            </Box>
          </InlineStack>
        </div>
      </div>
      <div style={{ padding: '48px 64px' }}>
        <BlockStack gap={'1000'}>
          <Text as='h1' variant='heading3xl' fontWeight='medium'>
            Featured apps
          </Text>
          <Grid>
            <Grid.Cell columnSpan={{ lg: 4 }}>
              <BlockStack gap={400} align='start' inlineAlign='start'>
                <Box>
                  <Text as='h2' variant='heading2xl' fontWeight='medium'>
                    Reviews
                  </Text>
                  <Text as='h4' variant='bodyLg' tone='subdued'>
                    Go beyond built-in options with added pages and features.
                  </Text>
                </Box>
                <Link monochrome url='app-list/collection/reviews'>
                  <Text variant='bodyLg' as='h4'>
                    Get apps
                  </Text>
                </Link>
              </BlockStack>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ lg: 8 }}>
              <Grid columns={2} gap={400}>
                {apps
                  .filter((app) => app.collection_id === 2)
                  .map((app) => {
                    return (
                      <Grid.Cell columnSpan={{ lg: 6 }} key={app.id}>
                        <Box
                          style={{ marginBottom: '40px', cursor: 'pointer' }}
                          onClick={() => {
                            navigate(`app-details/${app.id}`);
                          }}
                        >
                          <InlineStack align='start' blockAlign='start' gap={300} wrap={false}>
                            <Thumbnail source={app.app_logo} transparent />
                            <BlockStack align='space-between' inlineAlign='start' gap={200}>
                              <Text as='p' variant='headingLg'>
                                {app.name}
                              </Text>
                              <Box width='400px'>
                                <Text as='p' variant='bodyLg' tone='subdued'>
                                  {app.rick_text}
                                </Text>
                              </Box>
                            </BlockStack>
                          </InlineStack>
                        </Box>
                      </Grid.Cell>
                    );
                  })}
              </Grid>
            </Grid.Cell>
          </Grid>
          <Grid>
            <Grid.Cell columnSpan={{ lg: 4 }}>
              <BlockStack gap={400} align='start' inlineAlign='start'>
                <Box>
                  <Text as='h2' variant='heading2xl' fontWeight='medium'>
                    Emails
                  </Text>
                  <Text as='h4' variant='bodyLg' tone='subdued'>
                    Go beyond built-in options with added pages and features.
                  </Text>
                </Box>
                <Link monochrome url='app-list/collection/reviews'>
                  <Text variant='bodyLg' as='h4'>
                    Get apps
                  </Text>
                </Link>
              </BlockStack>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ lg: 8 }}>
              <Grid columns={2} gap={400}>
                {apps
                  .filter((app) => app.collection_id === 3)
                  .map((app) => {
                    return (
                      <Grid.Cell columnSpan={{ lg: 6 }} key={app.id}>
                        <Box
                          style={{ marginBottom: '40px', cursor: 'pointer' }}
                          onClick={() => {
                            navigate(`app-details/${app.id}`);
                          }}
                        >
                          <InlineStack align='start' blockAlign='start' gap={300} wrap={false}>
                            <Thumbnail source={app.app_logo} transparent />
                            <BlockStack align='space-between' inlineAlign='start' gap={200}>
                              <Text as='p' variant='headingLg'>
                                {app.name}
                              </Text>
                              <Box width='400px'>
                                <Text as='p' variant='bodyLg' tone='subdued'>
                                  {app.rick_text}
                                </Text>
                              </Box>
                            </BlockStack>
                          </InlineStack>
                        </Box>
                      </Grid.Cell>
                    );
                  })}
              </Grid>
            </Grid.Cell>
          </Grid>
        </BlockStack>
      </div>
    </div>
  );
}
