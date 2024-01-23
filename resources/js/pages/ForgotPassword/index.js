import React, { useCallback, useEffect } from 'react';
import Wrapper from '../../layouts/Wrapper';
import {
  Box,
  Button,
  Form,
  FormLayout,
  Layout,
  LegacyCard,
  Page,
  Text,
  TextField,
} from '@shopify/polaris';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthApi from '../../apis/AuthApi';
import { useMutation } from 'react-query';
import { useToast } from '../../hooks/useToast';
import AppSpinner from '../../components/AppSpinner';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const { showToast } = useToast();

  const schemaResetPassword = yup.object().shape({
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    password_confirmation: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null], 'Password must match'),
  });

  const { mutate: resetPassword, isLoading: isReseting } = useMutation(
    (data) => AuthApi.reset(data, token),
    {
      onSuccess: (response) => {
        if (!response.error) {
          showToast({
            message: 'Reset successfully',
            error: false,
          });
          navigate('/login');
        } else {
          showToast({
            message: response.message,
            error: true,
          });
        }
      },
      onError: (err) => {
        showToast({
          message: err.message,
          error: true,
        });
      },
    },
  );

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schemaResetPassword),
    defaultValues: {
      password: '',
      password_confirmation: '',
    },
  });

  const onSubmit = useCallback(
    (data) => {
      resetPassword({ password: data.password });
    },
    [resetPassword],
  );

  if (!token) {
    return (
      <Wrapper>
        <Page fullWidth>
          <AppSpinner />
        </Page>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Page fullWidth>
        <Layout>
          <LegacyCard sectioned>
            <div
              style={{
                width: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Text variant='headingLg' as='h5'>
                    Oauth App
                  </Text>
                </div>
                <div style={{ margin: '14px 0' }}>
                  <Text variant='bodyLg' as='p'>
                    Welcome to Oauth App's integration community!
                  </Text>
                </div>
                <div>
                  <Text variant='heading3xl' as='h2'>
                    Reset password
                  </Text>
                </div>

                <Form>
                  <FormLayout>
                    <Controller
                      shouldUnregister
                      control={control}
                      name='password'
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                          label='Password'
                          value={value}
                          onChange={onChange}
                          error={error?.message}
                          requiredIndicator
                          type='password'
                        />
                      )}
                    />
                    <Controller
                      shouldUnregister
                      control={control}
                      name='password_confirmation'
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                          label='Confirm password'
                          value={value}
                          onChange={onChange}
                          error={error?.message}
                          requiredIndicator
                          type='password'
                        />
                      )}
                    />

                    <Button
                      variant='primary'
                      fullWidth
                      loading={isReseting}
                      onClick={handleSubmit((data) => {
                        onSubmit(data);
                      })}
                    >
                      Submit
                    </Button>
                  </FormLayout>
                </Form>
              </Box>
            </div>
          </LegacyCard>
        </Layout>
      </Page>
    </Wrapper>
  );
}
