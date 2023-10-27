import { DropZone, Form, FormLayout, Modal, TextField, Thumbnail } from '@shopify/polaris';
import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export default function ModalClient({ open, onClose, onPrimaryAction }) {
  const schema = yup.object().shape({
    name: yup.string().required('App name is required').max(191),
    app_link: yup.string().required('App link is required').url('Invalid url').max(191),
    redirect: yup.string().required('Redirect URI is required').url('Invalid url'),
  });
  const { handleSubmit, control, setValue, watch } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <Modal
      title='Create app partner'
      open={open}
      onClose={onClose}
      primaryAction={{
        content: 'Create',
        onAction: onPrimaryAction,
      }}
    >
      <Modal.Section>
        <Form>
          <FormLayout>
            <TextField label='App name' />
            <TextField label='App link' />
            <TextField label='Description' />
            <TextField label='Redirect URI' />
            <TextField label='Document link' />
            <TextField label='Youtube link' />
            <DropZone
              allowMultiple={false}
              onDrop={() => {}}
              label='App logo'
              errorOverlayText='File type must be png,jpg,jpeg,webp'
              type='image'
            >
              <Thumbnail alt='logo' size='large' />
            </DropZone>
            <DropZone
              allowMultiple={false}
              onDrop={() => {}}
              label='Description image'
              errorOverlayText='File type must be png,jpg,jpeg,webp'
              type='image'
            >
              <Thumbnail alt='logo' size='large' />
            </DropZone>
          </FormLayout>
        </Form>
      </Modal.Section>
    </Modal>
  );
}

ModalClient.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  isUpdate: PropTypes.bool,
  onPrimaryAction: PropTypes.func,
};

ModalClient.defaultProps = {
  open: false,
  onClose: () => {},
  isUpdate: false,
  onPrimaryAction: () => {},
};
