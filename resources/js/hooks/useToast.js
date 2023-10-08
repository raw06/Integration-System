import { Toast } from '@shopify/polaris';
import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const ToastContext = React.createContext({
  showToast: () => {},
  closeToast: () => {},
});

const ToastProvider = ({ children }) => {
  const [{ active, message, error }, setToast] = useState({
    active: false,
    message: null,
    error: false,
  });

  const showToast = useCallback((settings) => {
    setToast({
      active: true,
      message: settings?.message,
      error: settings?.error,
    });
  }, []);

  const closeToast = useCallback(() => setToast((prev) => ({ ...prev, active: !prev.active })), []);

  const toastMarkup = active ? (
    <Toast content={message} onDismiss={closeToast} error={error} duration={3000} />
  ) : null;

  return (
    <ToastContext.Provider
      value={{
        showToast,
        closeToast,
      }}
    >
      {toastMarkup}
      {children}
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

const useToast = () => {
  const toastHelpers = useContext(ToastContext);

  return toastHelpers;
};
export { ToastContext, useToast };
export default ToastProvider;
