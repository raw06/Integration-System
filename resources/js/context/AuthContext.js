import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken, setToken } from '../utils/auth';
import AuthApi from '../apis/AuthApi';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const authenticated = useMemo(() => !!currentUser, [currentUser]);
  const navigate = useNavigate();

  const initAuth = async () => {
    return getToken() ? AuthApi.getUser() : Promise.resolve(null);
  };
  useEffect(() => {
    initAuth()
      .then((response) => {
        if (!response.user) {
          removeToken();
          navigate('/login');
        } else {
          setCurrentUser(response.user);
        }
        setInitializing(false);
      })
      .catch(() => {
        setInitializing(false);
        removeToken();
        navigate('/login');
      });
  }, [navigate]);
  return (
    <AuthContext.Provider
      value={{
        initializing,
        authenticated,
        currentUser,
        setToken,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;
export { useAuth };
