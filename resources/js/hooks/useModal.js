import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
const useModal = (edit1stReview) => {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  return {
    open,
    toggle,
    setOpen,
  };
};
useModal.propTypes = {
  edit1stReview: PropTypes.bool,
};

useModal.defaultProps = {
  edit1stReview: false,
};
export default useModal;
