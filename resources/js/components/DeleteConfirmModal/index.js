import { Modal, Text } from '@shopify/polaris';
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
export default function DeleteConfirmModal({ open, onClose, title, onDelete }) {
  return (
    <Modal open={open} onClose={onClose} title={title} primaryAction={onDelete}>
      <Text>This action can't undo</Text>
    </Modal>
  );
}

DeleteConfirmModal.prototype = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  onDelete: PropTypes.func,
};

DeleteConfirmModal.defaultProps = {
  open: false,
  onClose: () => {},
  title: '',
  onDelete: () => {},
};
