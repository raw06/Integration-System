import {
  Badge,
  Button,
  Card,
  ChoiceList,
  Filters,
  Icon,
  Page,
  Pagination,
  Popover,
  ResourceItem,
  ResourceList,
  Text,
} from '@shopify/polaris';
import { FilterMajor } from '@shopify/polaris-icons';
import React, { useCallback, useState } from 'react';
import { optionList, statusClient } from '../../data/collections';
import { useQuery } from 'react-query';
import PartnerApi from '../../apis/PartnerApi';

export default function ManagePartner() {
  const [clients, setClients] = useState([]);
  const [page, setPage] = useState(1);
  const [popoverActive, setPopoverActive] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [option, setOption] = useState(optionList.map((x) => x.value));
  const [hasNext, setHasNext] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const { refetch } = useQuery(
    ['getClients', page, searchString, option],
    () => PartnerApi.get(page, searchString, option),
    {
      onSuccess: (res) => {
        setClients(res.data);
        setHasNext(res.next_page_url);
      },
      keepPreviousData: true,
    },
  );

  const togglePopoverActive = useCallback(() => setPopoverActive((popActive) => !popActive), []);
  const handleRemoveSearchString = useCallback(() => {
    setSearchString('');
  }, []);

  const handleChangeOption = useCallback((value) => {
    if (Array.isArray(value) && value.length === 0) {
      setOption(optionList.map((x) => x.value));
      return;
    }
    if (
      Array.isArray(value) &&
      value.some((x) => x === 'all' && value[value.length - 1] === 'all')
    ) {
      setOption(optionList.map((x) => x.value));
    } else {
      setOption(value);
    }
  }, []);

  const handleNextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const handleBackPage = useCallback(() => {
    setPage((prev) => prev - 1);
  }, []);

  const activator = <Button onClick={togglePopoverActive} icon={<Icon source={FilterMajor} />} />;

  return (
    <Page title={<Text variant='heading3xl'>App management</Text>} fullWidth>
      <Card>
        <div style={{ height: '55vh' }}>
          <ResourceList
            items={clients}
            showHeader
            filterControl={
              <Filters
                queryValue={searchString}
                filters={[]}
                onQueryChange={setSearchString}
                onQueryClear={handleRemoveSearchString}
                queryPlaceholder='Search your app name'
              >
                <div style={{ paddingLeft: '8px' }}>
                  <Popover
                    activator={activator}
                    active={popoverActive}
                    onClose={togglePopoverActive}
                    preferredAlignment='right'
                    preferredPosition='below'
                  >
                    <div style={{ padding: '12px' }}>
                      <ChoiceList
                        allowMultiple
                        title='Sort by'
                        choices={optionList}
                        selected={option}
                        onChange={handleChangeOption}
                      />
                    </div>
                  </Popover>
                </div>
              </Filters>
            }
            renderItem={(item) => {
              const { id, name, status } = item;
              const clientElement = statusClient.find((element) => element.key === status);
              return (
                <ResourceItem id={id} url={`/apps/${id}`}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text fontWeight='medium' variant='bodyLg'>
                      {name}
                    </Text>
                    <Badge tone={clientElement.status}>{clientElement.value}</Badge>
                  </div>
                </ResourceItem>
              );
            }}
          />
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
    </Page>
  );
}
