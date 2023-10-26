import {
  Avatar,
  Divider,
  LegacyCard,
  Page,
  Pagination,
  ResourceItem,
  ResourceList,
  Tabs,
  Text,
  LegacyFilters,
  Layout,
} from '@shopify/polaris';
import React, { useCallback, useMemo, useState } from 'react';
import useModal from '../../hooks/useModal';
import ModalClient from '../../components/ModalClient';

export default function Admin() {
  const [tabIndex, setTabIndex] = useState(0);
  const [queryValue, setQueryValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const { open: openClientModal, toggle: toggleClientModal } = useModal();

  const tabs = useMemo(
    () => [
      {
        id: 'all',
        content: 'All',
        panelID: 'all',
      },
      {
        id: 'approved',
        content: 'Approved',
        panelID: 'approved',
      },
      {
        id: 'pending',
        content: 'Pending',
        panelID: 'pending',
      },
      {
        id: 'rejected',
        content: 'Rejected',
        panelID: 'rejected',
      },
    ],
    [],
  );

  const handleSearchChange = useCallback(() => {
    setQueryValue();
  }, []);

  const handleQueryClear = useCallback(() => {
    setQueryValue('');
  }, []);

  const handleToggleClient = useCallback(() => {
    toggleClientModal();
  }, [toggleClientModal]);

  const filterControl = (
    <LegacyFilters
      queryValue={queryValue}
      filters={[]}
      onQueryChange={handleSearchChange}
      queryPlaceholder='Search by app name'
      onQueryClear={handleQueryClear}
    />
  );
  return (
    <Page fullWidth>
      <ModalClient open={openClientModal} onClose={handleToggleClient} />
      <Layout sectioned>
        <LegacyCard>
          <Tabs tabs={tabs} selected={tabIndex} onSelect={setTabIndex}>
            <ResourceList
              selectable
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              resourceName={{ singular: 'client', plural: 'clients' }}
              showHeader
              items={[
                {
                  id: '100',
                  url: '#',
                  name: 'Mae Jemison',
                  location: 'Decatur, USA',
                },
                {
                  id: '200',
                  url: '#',
                  name: 'Ellen Ochoa',
                  location: 'Los Angeles, USA',
                },
              ]}
              filterControl={filterControl}
              promotedBulkActions={[
                {
                  id: 'approve',
                  content: 'Approve',
                  onAction: () => {},
                },
                {
                  id: 'reject',
                  content: 'Reject',
                  onAction: () => {},
                },
              ]}
              loading={false}
              renderItem={(item) => {
                const { id, url, name, location } = item;
                const media = <Avatar customer size='md' name={name} />;

                return (
                  <ResourceItem
                    id={id}
                    url={url}
                    media={media}
                    accessibilityLabel={`View details for ${name}`}
                    onClick={() => {}}
                  >
                    <Text variant='bodyMd' fontWeight='bold' as='h3'>
                      {name}
                    </Text>
                    <div>{location}</div>
                  </ResourceItem>
                );
              }}
            />
            <Divider />

            <LegacyCard.Section>
              <Pagination />
            </LegacyCard.Section>
          </Tabs>
        </LegacyCard>
      </Layout>
    </Page>
  );
}
