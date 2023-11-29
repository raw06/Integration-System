import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import AppApi from '../../apis/AppApi';
import { BlockStack, Card, InlineStack, Layout, Page, Text, Thumbnail } from '@shopify/polaris';
import AppSpinner from '../../components/AppSpinner';
import ImageLoadable from '../../components/ImageLoadable';

export default function AppDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState({});
  const { isFetching } = useQuery(['detail'], () => AppApi.detailApp(id), {
    onSuccess: (data) => {
      setApp(data);
    },
    onError: () => {},
  });

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  if (isFetching) {
    <Page>
      <AppSpinner />
    </Page>;
  }
  return (
    <Page
      title={<Thumbnail size='small' source={app.app_logo} />}
      backAction={{ onAction: handleBack }}
    >
      <Layout>
        <Layout.Section variant='oneHalf'>
          <Card>
            <ImageLoadable alt={app.name} src={app.app_logo} />
          </Card>
        </Layout.Section>
        <Layout.Section variant='oneHalf'></Layout.Section>
        <Layout.Section variant='fullWidth'></Layout.Section>
      </Layout>
    </Page>
  );
}
