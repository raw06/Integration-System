import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
const useModal = () => {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  return {
    open,
    toggle,
  };
};
useModal.propTypes = {
  edit1stReview: PropTypes.bool,
};

export default useModal;
