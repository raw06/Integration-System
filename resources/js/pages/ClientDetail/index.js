import {
  Badge,
  Box,
  Button,
  Divider,
  DropZone,
  Form,
  FormLayout,
  InlineError,
  InlineStack,
  Layout,
  LegacyCard,
  Page,
  Text,
  TextField,
  Thumbnail,
} from '@shopify/polaris';
import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import PartnerApi from '../../apis/PartnerApi';
import { APPROVED, DEACTIVATED, PENDING, status } from '../../data/status';
import AppSpinner from '../../components/AppSpinner';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from '../../hooks/useToast';
import { makeid } from '../../utils/helper';
import LoadingApp from '../../components/LoadingApp';

export default function ClientDetail() {
  const { id } = useParams();
  const [partner, setPartner] = useState({});
  const { showToast } = useToast();

  const schema = yup.object().shape({
    name: yup.string().required('App name is required').max(191),
    description: yup.string().required('Description is required').max(191),
    app_link: yup.string().required('App link is required').url('Invalid url').max(191),
    youtube_link: yup.string().url('Invalid url').max(191),
    document_link: yup.string().url('Invalid url').max(191),
    redirect: yup.string().required('Redirect URI is required').url('Invalid url'),
    logo: yup.mixed().required('Logo is required'),
    description_image: yup.mixed().required('Description image is required'),
  });

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: partner,
  });
  const logo = watch('logo');
  const desImages = watch('description_image');

  const { isFetching, refetch } = useQuery(['parther'], () => PartnerApi.detail(id), {
    onSuccess: (res) => {
      setPartner(res.data);
    },
    refetchOnWindowFocus: false,
  });

  const { mutate, isLoading } = useMutation((data) => PartnerApi.update(id, data), {
    onSuccess: () => {
      showToast({
        error: false,
        message: 'Update sucessfully',
      });
      refetch();
    },
    onError: () => {
      showToast({
        error: true,
        message: 'Update failed',
      });
    },
  });

  const { mutate: updateStatus, isLoadingUpdate } = useMutation(
    (data) => PartnerApi.updateStatus(id, data),
    {
      onSuccess: () => {
        showToast({
          error: false,
          message: 'Update sucessfully',
        });
        refetch();
      },
      onError: () => {
        showToast({
          error: true,
          message: 'Update failed',
        });
      },
    },
  );

  const handleCopyLink = useCallback(
    (type) => {
      document.querySelector(`#${type}`).select();
      document.execCommand('copy');
      showToast({
        message: 'Copied',
        error: false,
      });
    },
    [showToast],
  );

  const handleDropLogo = useCallback(
    (_dropFiles, acceptedFiles, _rejectFiles) => {
      if (_rejectFiles[0]) {
        setError('logo', { message: 'File type must be image' });
        return;
      }
      if (acceptedFiles[0]?.size > 2000000) {
        showToast({
          error: true,
          message: 'Image size must be less than 2MB',
        });
        return;
      }
      setValue('logo', acceptedFiles[0]);
    },
    [setError, setValue, showToast],
  );
  const handleDropImageDescription = useCallback(
    (_dropFiles, acceptedFiles, _rejectFiles) => {
      if (_rejectFiles[0]) {
        setError('description_image', { message: 'File type must be image' });
        return;
      }

      if (
        (Array.isArray(acceptedFiles) && acceptedFiles.length > 4) ||
        (Array.isArray(desImages) && desImages.length >= 4) ||
        (Array.isArray(desImages) && [...desImages, ...acceptedFiles].length > 4)
      ) {
        showToast({
          error: true,
          message: 'Only upload 4 images for description image',
        });
        return;
      }
      if (Array.isArray(desImages)) {
        setValue('description_image', [...desImages, ...acceptedFiles]);
        return;
      }
      setValue('description_image', acceptedFiles);
    },
    [desImages, setError, setValue, showToast],
  );

  const handleChangeDesImages = useCallback(
    (id) => {
      setValue(
        'description_image',
        desImages.filter((x, i) => i !== id),
      );
    },
    [desImages, setValue],
  );

  const handleChangeParther = useCallback(
    (value, fieldID) => {
      setValue(fieldID, value);
    },
    [setValue],
  );

  const onSubmit = useCallback(
    (data) => {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key]) {
          if (key === 'description_image') {
            const dataC = data[key];
            if (Array.isArray(dataC) && dataC.every((file) => !(file instanceof File))) {
              formData.append('description_image', dataC);
              return;
            }
            Object.keys(dataC).forEach((keyC) => {
              if (dataC[keyC] instanceof File) {
                formData.append(`description_image_${keyC}`, dataC[keyC]);
              }
            });
            if (Array.isArray(dataC)) {
              const linkDescriptionImages = dataC.filter((file) => !(file instanceof File));
              formData.append('description_image', linkDescriptionImages.join(','));
              return;
            }
          } else {
            formData.append(key, data[key]);
          }
        }
      });
      mutate(formData);
    },
    [mutate],
  );

  const handleUpdateStatusClient = useCallback(() => {
    if (partner.status !== APPROVED) {
      if (partner.status === DEACTIVATED) {
        updateStatus({
          status: APPROVED,
        });
      }
    } else {
      updateStatus({
        status: DEACTIVATED,
        secret: makeid(40),
      });
    }
  }, [partner.status, updateStatus]);

  useEffect(() => {
    if (partner.description_image) {
      setValue('description_image', partner.description_image);
    }
  }, [partner.app_logo, partner.description_image, setValue]);

  useEffect(() => {
    if (partner.app_logo) {
      setValue('logo', partner.app_logo);
    }
  }, [partner, setValue]);

  if (isFetching) {
    return <AppSpinner />;
  }
  const statusPartner = status.find((x) => x.value === partner.status);

  const fileLogoUpload = !logo && (
    <DropZone.FileUpload actionHint='Accepts file size smaller than 2MB' />
  );

  if (isLoadingUpdate || isLoading) {
    return <LoadingApp />;
  }

  return (
    <Page
      title={partner.name}
      titleMetadata={<Badge tone={statusPartner.tone}>{statusPartner.label}</Badge>}
      primaryAction={
        <Button submit variant='primary' onClick={handleSubmit(onSubmit)} loading={isLoading}>
          Save
        </Button>
      }
      secondaryActions={
        partner.status !== PENDING && [
          {
            content: partner.status === DEACTIVATED ? 'Active' : 'Deactivate',
            onAction: handleUpdateStatusClient,
          },
        ]
      }
      backAction={{
        url: '/apps',
      }}
    >
      <Layout>
        <Layout.Section variant='fullWidth'>
          <LegacyCard title='App API'>
            <LegacyCard.Section>
              <Controller
                shouldUnregister
                name='id'
                control={control}
                render={() => (
                  <TextField
                    id='id'
                    readOnly
                    label={
                      <Text fontWeight='medium' variant='bodyMd' tone='caution'>
                        App id
                      </Text>
                    }
                    value={partner.id}
                    connectedRight={
                      <Button
                        onClick={() => {
                          handleCopyLink('id');
                        }}
                      >
                        Copy
                      </Button>
                    }
                  />
                )}
              />
            </LegacyCard.Section>
            <LegacyCard.Section>
              <Controller
                shouldUnregister
                name='secret'
                control={control}
                defaultValue={partner.secret ?? ''}
                render={({ field: { value } }) => (
                  <TextField
                    id='secret'
                    readOnly
                    value={value}
                    label={
                      <Text fontWeight='medium' variant='bodyMd' tone='caution'>
                        App secret
                      </Text>
                    }
                    connectedRight={
                      <Button
                        onClick={() => {
                          handleCopyLink('secret');
                        }}
                      >
                        Copy
                      </Button>
                    }
                  />
                )}
              />
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant='fullWidth'>
          <LegacyCard sectioned>
            <Form>
              <FormLayout>
                <Controller
                  shouldUnregister
                  name='logo'
                  control={control}
                  render={() => (
                    <DropZone
                      allowMultiple={false}
                      onDrop={handleDropLogo}
                      label='App logo'
                      errorOverlayText='File type must be png,jpg,jpeg,webp'
                      type='image'
                      accept='image/*'
                    >
                      {logo ? (
                        <Thumbnail
                          source={logo instanceof File ? URL.createObjectURL(logo) : logo}
                          alt='logo'
                          size='large'
                          transparent
                        />
                      ) : (
                        ''
                      )}
                      {fileLogoUpload}
                    </DropZone>
                  )}
                />
                {errors.logo && <InlineError message={errors.logo.message} fieldID='logo' />}
                <Controller
                  shouldUnregister
                  control={control}
                  defaultValue={partner.name}
                  name='name'
                  render={({ field: { value }, fieldState: { error } }) => (
                    <TextField
                      id='name'
                      value={value}
                      label={
                        <Text fontWeight='medium' variant='bodyMd' tone='caution'>
                          App name
                        </Text>
                      }
                      error={error?.message}
                      onChange={handleChangeParther}
                    />
                  )}
                />
                <Controller
                  shouldUnregister
                  control={control}
                  defaultValue={partner.app_link}
                  name='app_link'
                  render={({ field: { value }, fieldState: { error } }) => (
                    <TextField
                      id='app_link'
                      value={value}
                      error={error?.message}
                      label={
                        <Text fontWeight='medium' variant='bodyMd' tone='caution'>
                          App link
                        </Text>
                      }
                      onChange={handleChangeParther}
                    />
                  )}
                />
                <Controller
                  shouldUnregister
                  control={control}
                  defaultValue={partner.redirect}
                  name='redirect'
                  render={({ field: { value }, fieldState: { error } }) => (
                    <TextField
                      id='redirect'
                      value={value}
                      error={error?.message}
                      label={
                        <Text fontWeight='medium' variant='bodyMd' tone='caution'>
                          Redirect URI
                        </Text>
                      }
                      onChange={handleChangeParther}
                    />
                  )}
                />
                <Controller
                  shouldUnregister
                  control={control}
                  defaultValue={partner.description}
                  name='description'
                  render={({ field: { value }, fieldState: { error } }) => (
                    <TextField
                      id='description'
                      value={value}
                      error={error?.message}
                      label={
                        <Text fontWeight='medium' variant='bodyMd' tone='caution'>
                          Description
                        </Text>
                      }
                      onChange={handleChangeParther}
                    />
                  )}
                />
                <Controller
                  shouldUnregister
                  control={control}
                  defaultValue={partner.doc_link}
                  name='document_link'
                  render={({ field: { value }, fieldState: { error } }) => (
                    <TextField
                      id='document_link'
                      onChange={handleChangeParther}
                      value={value}
                      error={error?.message}
                      label={
                        <Text fontWeight='medium' variant='bodyMd' tone='caution'>
                          Document link
                        </Text>
                      }
                    />
                  )}
                />
                <Controller
                  shouldUnregister
                  name='youtube_link'
                  control={control}
                  defaultValue={partner.youtube_link}
                  render={({ field: { value }, fieldState: { error } }) => (
                    <TextField
                      id='youtube_link'
                      label={
                        <Text fontWeight='medium' variant='bodyMd' tone='caution'>
                          Youtube link
                        </Text>
                      }
                      onChange={handleChangeParther}
                      value={value}
                      error={error?.message}
                    />
                  )}
                />
                <Controller
                  shouldUnregister
                  name='description_image'
                  control={control}
                  render={() => (
                    <InlineStack blockAlign='end' gap={200}>
                      <div style={{ width: 114, height: 114 }}>
                        <DropZone
                          allowMultiple
                          onDrop={handleDropImageDescription}
                          label='Description image'
                          errorOverlayText='File type must be png,jpg,jpeg,webp'
                          type='image'
                          accept='image/*'
                        >
                          <DropZone.FileUpload />
                        </DropZone>
                      </div>
                      <InlineStack gap={'100'}>
                        {desImages && desImages.length > 0
                          ? desImages.map((img, key) => (
                              <Box key={key} position='relative'>
                                <Thumbnail
                                  key={key}
                                  source={img instanceof File ? URL.createObjectURL(img) : img}
                                  alt='description_image'
                                  size='large'
                                />
                                <Box position='absolute' insetBlockStart={'0'} insetInlineEnd={'0'}>
                                  <Button
                                    size='micro'
                                    onClick={() => {
                                      handleChangeDesImages(key);
                                    }}
                                  >
                                    X
                                  </Button>
                                </Box>
                              </Box>
                            ))
                          : ''}
                      </InlineStack>
                    </InlineStack>
                  )}
                />
                {errors.description_image && (
                  <InlineError
                    message={errors.description_image.message}
                    fieldID='description_image'
                  />
                )}
              </FormLayout>
            </Form>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
