import { TopBar } from '@shopify/polaris';
import { LogOutMinor, ProfileMinor } from '@shopify/polaris-icons';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthApi from '../../apis/AuthApi';
import { useAuth } from '../../context/AuthContext';

export default function TopBarMarkup() {
  const history = useNavigate();
  const { currentUser, setCurrentUser, setToken } = useAuth();
  const [userMenuActive, setUserMenuActive] = useState(false);

  const handleLogOut = useCallback(() => {
    AuthApi.logout().then((response) => {
      if (response.message) {
        setCurrentUser(null);
        setToken(null);
        history('/login');
      }
    });
  }, [history, setCurrentUser, setToken]);

  const toggleUserMenuActive = useCallback(() => {
    setUserMenuActive((prev) => !prev);
  }, []);

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [
            {
              content: 'Profile',
              icon: ProfileMinor,
              url: '/profile',
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
  return <TopBar userMenu={userMenuMarkup} />;
}
