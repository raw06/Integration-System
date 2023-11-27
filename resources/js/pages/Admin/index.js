import {
  Avatar,
  Page,
  Pagination,
  ResourceItem,
  ResourceList,
  Tabs,
  Text,
  LegacyFilters,
  Layout,
  Card,
  InlineStack,
  Badge,
} from '@shopify/polaris';
import React, { useCallback, useMemo, useState } from 'react';
import useModal from '../../hooks/useModal';
import ModalClient from '../../components/ModalClient';
import { useMutation, useQuery } from 'react-query';
import PartnerApi from '../../apis/PartnerApi';
import { APPROVED, PENDING, REJECTED, status } from '../../data/status';
import { useToast } from '../../hooks/useToast';

export default function Admin() {
  const [tabIndex, setTabIndex] = useState(0);
  const [clients, setClients] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [searchString, setSearchString] = useState('');

  const [client, setClient] = useState({});
  const { showToast } = useToast();

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
      {
        id: 'deactivated',
        content: 'Deactivated',
        panelID: 'deactivated',
      },
    ],
    [],
  );

  // eslint-disable-next-line no-unused-vars
  const { refetch, isFetching } = useQuery(
    ['getPartnersForAdmin', page, searchString, tabs[tabIndex].id],
    () => PartnerApi.getForAdmin(page, searchString, tabs[tabIndex].id),
    {
      onSuccess: (res) => {
        setClients(res.data);
        setHasNext(res.next_page_url);
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  );

  const updateStatus = useMutation((data) => PartnerApi.updateForAdmin(client.id, data), {
    onSuccess: (res) => {
      if (!res.error) {
        showToast({
          message: res.message,
          error: false,
        });
        toggleClientModal();
        refetch();
      } else {
        showToast({
          message: res.message,
          error: true,
        });
      }
    },
    onError: (err) => {
      showToast({
        message: err.message,
        error: true,
      });
    },
  });

  const handleQueryClear = useCallback(() => {
    setSearchString('');
  }, []);

  const handleNextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const handleBackPage = useCallback(() => {
    setPage((prev) => prev - 1);
  }, []);

  const handleChangeTabIndex = useCallback((index) => {
    setTabIndex(index);
    setPage(1);
  }, []);

  const handleToggleClient = useCallback(() => {
    toggleClientModal();
  }, [toggleClientModal]);

  const handleUpdateStatus = useCallback(() => {
    if (client.status === PENDING || client.status === REJECTED) {
      updateStatus.mutate({ status: APPROVED });
    } else {
      updateStatus.mutate({ status: REJECTED });
    }
  }, [client.status, updateStatus]);

  const filterControl = (
    <LegacyFilters
      queryValue={searchString}
      filters={[]}
      onQueryChange={setSearchString}
      queryPlaceholder='Search by app name'
      onQueryClear={handleQueryClear}
    />
  );
  return (
    <Page fullWidth>
      <ModalClient
        client={client}
        open={openClientModal}
        onClose={handleToggleClient}
        onUpdate={handleUpdateStatus}
      />
      <Layout sectioned>
        <Card>
          <div style={{ height: '55vh' }}>
            <Tabs tabs={tabs} selected={tabIndex} onSelect={handleChangeTabIndex}>
              <ResourceList
                resourceName={{ singular: 'client', plural: 'clients' }}
                showHeader
                items={clients}
                filterControl={filterControl}
                loading={isFetching}
                renderItem={(item) => {
                  const { id, name, status: statusPartner, app_logo: logo } = item;
                  const media = <Avatar customer size='md' name={name} source={logo} />;

                  return (
                    <ResourceItem
                      id={id}
                      media={media}
                      accessibilityLabel={`View details for ${name}`}
                      onClick={() => {
                        setClient(item);
                        toggleClientModal();
                      }}
                    >
                      <InlineStack align='space-between'>
                        <Text variant='bodyMd' fontWeight='bold' as='h3'>
                          {name}
                        </Text>
                        <Badge tone={status.find((x) => x.value === statusPartner).tone}>
                          {status.find((x) => x.value === statusPartner).label}
                        </Badge>
                      </InlineStack>
                    </ResourceItem>
                  );
                }}
              />
            </Tabs>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <Pagination
              hasPrevious={page > 1}
              onPrevious={handleBackPage}
              hasNext={hasNext}
              onNext={handleNextPage}
            />
          </div>
        </Card>
      </Layout>
    </Page>
  );
}
