import { ActionList, Box, Thumbnail, TopBar } from '@shopify/polaris';
import { AppsMajor, LogOutMinor } from '@shopify/polaris-icons';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthApi from '../../apis/AuthApi';
import { useAuth } from '../../context/AuthContext';
import { useQuery } from 'react-query';
import AppApi from '../../apis/AppApi';
import useDebounce from '../../hooks/useDebounce';

export default function TopBarMarkup() {
  const history = useNavigate();
  const { currentUser, setCurrentUser, setToken } = useAuth();
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [search, setSearch] = useState('');
  const [apps, setApps] = useState([]);
  const searchDebounce = useDebounce(search, 600);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const { isFetching } = useQuery(
    ['search', { value: searchDebounce }],
    () => AppApi.search(searchDebounce),
    {
      onSuccess: (data) => {
        setApps(data);
      },
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );

  const handleLogOut = useCallback(() => {
    AuthApi.logout().then((response) => {
      if (response.message) {
        setCurrentUser(null);
        setToken(null);
        history('/login');
      }
    });
  }, [history, setCurrentUser, setToken]);

  const handleQueryValue = useCallback((value) => {
    setSearch(value);
    setIsSearchActive(value.length > 0);
  }, []);

  const handleSearchResultsDismiss = useCallback(() => {
    setIsSearchActive(false);
    setSearch('');
  }, []);

  const toggleUserMenuActive = useCallback(() => {
    setUserMenuActive((prev) => !prev);
  }, []);

  const searchResultsMarkup = (
    <ActionList
      items={
        isFetching
          ? [
              {
                content: 'All apps',
                onAction: () => {
                  history('/app-list/home');
                  setSearch('');
                  setIsSearchActive(false);
                },
              },
            ]
          : apps.length === 0
          ? [
              {
                content: 'All apps',
                onAction: () => {
                  history('/app-list/home');
                  setSearch('');
                  setIsSearchActive(false);
                },
              },
            ]
          : apps.map((app) => {
              return {
                prefix: <Thumbnail source={app.app_logo} alt={app.name} />,
                content: app.name,
                onAction: () => {
                  history(`/app-details/${app.id}`);
                  setSearch('');
                  setIsSearchActive(false);
                },
              };
            })
      }
    />
  );

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [
            currentUser.role === 0
              ? {
                  content: 'App partner',
                  icon: AppsMajor,
                  url: '/apps',
                }
              : {
                  content: 'Manage apps',
                  icon: AppsMajor,
                  url: '/admin',
                },
            {
              content: 'Log out',
              icon: LogOutMinor,
              onAction: handleLogOut,
            },
          ],
        },
      ]}
      name={currentUser.name.replaceAll(' ', '')}
      initials={currentUser.name[0]}
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );
  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleQueryValue}
      value={search}
      placeholder='Search app'
      focused={false}
    />
  );
  return (
    <TopBar
      userMenu={userMenuMarkup}
      searchResultsVisible={isSearchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
    />
  );
}
