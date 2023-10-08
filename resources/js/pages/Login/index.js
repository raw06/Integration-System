import { Form, FormLayout, LegacyCard, Page, TextField } from '@shopify/polaris';
import React from 'react';

export default function Login() {
  return (
    <Page>
      <LegacyCard>
        <FormLayout>
          <Form>
            <TextField />
          </Form>
          <Form>
            <TextField />
          </Form>
        </FormLayout>
      </LegacyCard>
    </Page>
  );
}
