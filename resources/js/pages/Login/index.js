import {
  Box,
  Button,
  Form,
  FormLayout,
  Layout,
  LegacyCard,
  Link,
  Page,
  Text,
  TextField,
} from '@shopify/polaris';
import React, { useCallback, useState } from 'react';
import Wrapper from '../../layouts/Wrapper';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import AuthApi from '../../apis/AuthApi';
import { setToken } from '../../utils/auth';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../hooks/useToast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { setCurrentUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const schemaLogin = yup.object().shape({
    email: yup.string().email('The email format is incorrect, please check it again.').required(),
    password: yup.string().required().min(6),
  });

  const schemaRegister = yup.object().shape({
    name: yup.string().required('Name is required').min(2).max(100),
    email: yup.string().email('The email format is incorrect, please check it again.').required(),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    password_confirmation: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null], 'Password must match'),
  });

  const { mutate: login, isLoading: isLogging } = useMutation((data) => AuthApi.login(data), {
    onSuccess: (response) => {
      if (!response.error) {
        reset();
        console.log(response);
        setToken(response.token.access_token);
        setCurrentUser(response.user);
        showToast({
          message: 'Login successfully',
          error: false,
        });
        navigate('/');
      } else {
        console.log(response);
        showToast({
          message: response.message,
          error: true,
        });
        setValue('password', '');
      }
    },
    onError: (err) => {
      showToast({
        message: err.message,
        error: true,
      });
    },
  });

  const { mutate: register, isLoading: isRegisting } = useMutation(
    (data) => AuthApi.register(data),
    {
      onSuccess: (res) => {
        if (res.error) {
          showToast({
            message: 'This email account has existed, please sign up another account or log in.',
            error: true,
          });
        } else {
          reset();
          showToast({
            message: 'Register successfully',
            error: false,
          });
          navigate('/');
        }
      },
      onError: (err) => {
        reset();
        showToast({
          message: err.message,
          error: true,
        });
      },
    },
  );

  const { control, handleSubmit, reset, setValue } = useForm({
    resolver: yupResolver(isRegister ? schemaRegister : schemaLogin),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = useCallback(
    (data, isRegister) => {
      if (isRegister) {
        register(data);
      } else {
        login(data);
      }
    },
    [login, register],
  );

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
              <Box as='div'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Text variant='headingLg' as='h5'>
                    Raw App
                  </Text>
                </div>

                <div style={{ margin: '14px 0' }}>
                  <Text variant='bodyLg' as='p'>
                    Welcome to Raw's integration community!
                  </Text>
                </div>
                {isRegister ? (
                  <>
                    <Text variant='heading3xl' as='h2'>
                      Sign-up
                    </Text>

                    <div style={{ marginTop: '40px' }}>
                      <Form>
                        <FormLayout>
                          <Controller
                            shouldUnregister
                            control={control}
                            name='name'
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                              <TextField
                                label='Name'
                                value={value}
                                onChange={onChange}
                                error={error?.message}
                                requiredIndicator
                              />
                            )}
                          />
                          <Controller
                            shouldUnregister
                            control={control}
                            name='email'
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                              <TextField
                                label='Email'
                                value={value}
                                onChange={onChange}
                                error={error?.message}
                                requiredIndicator
                              />
                            )}
                          />

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
                                type='password'
                                autoComplete=''
                                requiredIndicator
                              />
                            )}
                          />
                          <Controller
                            shouldUnregister
                            control={control}
                            name='password_confirmation'
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                              <TextField
                                label='Confirm Password'
                                value={value}
                                onChange={onChange}
                                error={error?.message}
                                type='password'
                                autoComplete=''
                              />
                            )}
                          />

                          <Button
                            primary
                            onClick={handleSubmit((data) => {
                              onSubmit(data, true);
                            })}
                            fullWidth
                            loading={isRegisting}
                          >
                            Register
                          </Button>
                        </FormLayout>
                      </Form>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Text variant='heading3xl' as='h2'>
                        Log in
                      </Text>
                    </div>

                    <div style={{ marginTop: '40px' }}>
                      <Form>
                        <FormLayout>
                          <Controller
                            shouldUnregister
                            control={control}
                            name='email'
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                              <TextField
                                label='Email'
                                value={value}
                                onChange={onChange}
                                error={error?.message}
                                requiredIndicator
                              />
                            )}
                          />

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
                                type='password'
                                autoComplete=''
                              />
                            )}
                          />
                          <div
                            style={{
                              marginTop: '30px',
                              marginBottom: '5px',
                            }}
                          >
                            <Text variant='bodySm' as='p' fontWeight='medium'>
                              If you're not registered yet, please sign-up{' '}
                              <Link
                                onClick={() => {
                                  setIsRegister(true);
                                  reset();
                                }}
                              >
                                here.
                              </Link>
                            </Text>
                          </div>

                          <Button
                            primary
                            onClick={handleSubmit((data) => {
                              onSubmit(data, false);
                            })}
                            fullWidth
                            loading={isLogging}
                          >
                            Login
                          </Button>
                        </FormLayout>
                      </Form>
                    </div>
                  </>
                )}
              </Box>
            </div>
          </LegacyCard>
        </Layout>
      </Page>
    </Wrapper>
  );
}
