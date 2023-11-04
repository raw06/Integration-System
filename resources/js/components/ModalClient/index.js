import {
  DropZone,
  Form,
  FormLayout,
  InlineStack,
  Modal,
  TextField,
  Thumbnail,
} from '@shopify/polaris';
import React from 'react';
import PropTypes from 'prop-types';
import { PENDING, REJECTED } from '../../data/status';

export default function ModalClient({ client, open, onClose, onUpdate }) {
  return (
    <Modal
      title='App Partner'
      open={open}
      onClose={onClose}
      primaryAction={{
        content: client.status === PENDING || client.status === REJECTED ? 'Approve' : 'Reject',
        onAction: onUpdate,
      }}
    >
      <Modal.Section>
        <Form>
          <FormLayout>
            <TextField label='App name' value={client.name} />
            <TextField label='App link' value={client.app_link} />
            <TextField label='Description' value={client.description} />
            <TextField label='Redirect URI' value={client.redirect} />
            <TextField label='App ID' value={client.id} />
            <TextField label='App Secret' value={client.secret} />
            <TextField label='Document link' value={client.doc_link} />
            <TextField label='Youtube link' value={client.youtube_link} />
            <DropZone label='App logo' disabled>
              <Thumbnail alt='logo' size='large' source={client.app_logo} />
            </DropZone>
            <DropZone label='Description image' disabled>
              <InlineStack gap={'100'}>
                {client.description_image && client.description_image.length > 0
                  ? client.description_image.map((img, key) => (
                      <Thumbnail key={key} source={img} alt='description_image' size='large' />
                    ))
                  : ''}
              </InlineStack>
            </DropZone>
          </FormLayout>
        </Form>
      </Modal.Section>
    </Modal>
  );
}

ModalClient.propTypes = {
  client: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onUpdate: PropTypes.func,
};

ModalClient.defaultProps = {
  client: {},
  open: false,
  onClose: () => {},
  onUpdate: () => {},
};
