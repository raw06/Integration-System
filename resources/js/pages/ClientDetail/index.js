import {
  Badge,
  Button,
  DropZone,
  FormLayout,
  Layout,
  LegacyCard,
  Page,
  Text,
  TextField,
} from '@shopify/polaris';
import React from 'react';

export default function ClientDetail() {
  return (
    <Page
      title='Name of App'
      titleMetadata={<Badge tone='success'>Active</Badge>}
      primaryAction={{ content: 'Save', onAction: () => {} }}
      secondaryActions={[
        {
          id: 'active',
          content: 'Active',
          onAction: () => {},
        },
      ]}
      backAction={{
        onAction: () => {},
      }}
    >
      <Layout>
        <Layout.Section variant='oneHalf'>
          <LegacyCard title='App Info'>
            <LegacyCard.Section>
              <DropZone label='App logo' accept='image/*' type='image' dropOnPage onDrop={() => {}}>
                <Text>test</Text>
                <DropZone.FileUpload actionHint='Accept file size 3MB' />
              </DropZone>
            </LegacyCard.Section>
            <LegacyCard.Section>
              <FormLayout>
                <TextField
                  id='name'
                  label={
                    <Text fontWeight='medium' variant='bodyMd' tone='caution'>
                      App name
                    </Text>
                  }
                />
              </FormLayout>
            </LegacyCard.Section>
            <LegacyCard.Section>
              <FormLayout>
                <TextField
                  id='app_link'
                  label={
                    <Text fontWeight='medium' variant='bodyMd' tone='caution'>
                      App link
                    </Text>
                  }
                />
              </FormLayout>
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant='oneHalf'>
          <LegacyCard title='App API'>
            <LegacyCard.Section>
              <FormLayout>
                <TextField
                  id='id'
                  readOnly
                  label={
                    <Text fontWeight='medium' variant='bodyMd' tone='caution'>
                      App id
                    </Text>
                  }
                  connectedRight={<Button>Copy</Button>}
                />
              </FormLayout>
            </LegacyCard.Section>
            <LegacyCard.Section>
              <FormLayout>
                <TextField
                  id='secret'
                  readOnly
                  label={
                    <Text fontWeight='medium' variant='bodyMd' tone='caution'>
                      App secret
                    </Text>
                  }
                  connectedRight={<Button>Copy</Button>}
                />
              </FormLayout>
            </LegacyCard.Section>
          </LegacyCard>
          <LegacyCard>
            <LegacyCard.Section>
              <DropZone
                label='Description image'
                accept='image/*'
                type='image'
                dropOnPage
                onDrop={() => {}}
              >
                <Text>test</Text>
                <DropZone.FileUpload actionHint='Accept file size 3MB' />
              </DropZone>
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant='fullWidth'>
          <LegacyCard title='Advance'>
            <LegacyCard.Section>
              <TextField
                id='doc_link'
                readOnly
                label={
                  <Text fontWeight='medium' variant='bodyMd' tone='caution'>
                    Document link
                  </Text>
                }
              />
            </LegacyCard.Section>
            <LegacyCard.Section>
              <TextField
                id='youtube_link'
                readOnly
                label={
                  <Text fontWeight='medium' variant='bodyMd' tone='caution'>
                    Youtube link
                  </Text>
                }
              />
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
