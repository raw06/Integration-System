import { Modal } from '@shopify/polaris';
import React from 'react';
import PropTypes from 'prop-types';

export default function ModalClient({ open, onClose }) {
  console.log(open);
  return (
    <Modal title='App test' open={open} onClose={onClose}>
      cc
    </Modal>
  );
}

ModalClient.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

ModalClient.defaultProps = {
  open: false,
  onClose: () => {},
};
