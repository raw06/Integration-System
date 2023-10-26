/* eslint-disable react/prop-types */
import { Navigation } from '@shopify/polaris';
import { AppsMajor, LogOutMinor } from '@shopify/polaris-icons';
import React, { useCallback } from 'react';
import { useMutation } from 'react-query';
import AuthApi from '../../apis/AuthApi';
import { useToast } from '../../hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../utils/auth';

export default function SideBar({ user }) {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { mutate: logout } = useMutation(() => AuthApi.logout(), {
    onSuccess: () => {
      showToast({
        message: 'Log out successfully',
        error: false,
      });
      removeToken();
      navigate('/login');
    },
    onError: (err) => {
      showToast({
        message: err.message,
        error: true,
      });
    },
  });

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);
  return (
    <Navigation location='/'>
      <Navigation.Section
        items={
          !user.role
            ? [
                {
                  url: '/admin',
                  label: 'App',
                  icon: AppsMajor,
                },
                {
                  label: 'Log out',
                  icon: LogOutMinor,
                  onClick: handleLogout,
                },
              ]
            : [
                {
                  url: '#',
                  label: 'App',
                  icon: AppsMajor,
                },
                {
                  label: 'Log out',
                  icon: LogOutMinor,
                  onClick: handleLogout,
                },
              ]
        }
      />
    </Navigation>
  );
}
