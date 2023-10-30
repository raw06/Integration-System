import {
  Box,
  Button,
  DropZone,
  Form,
  FormLayout,
  InlineStack,
  LegacyCard,
  Page,
  TextField,
  Thumbnail,
} from '@shopify/polaris';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from '../../hooks/useToast';

export default function Partner() {
  const { showToast } = useToast();

  const schema = yup.object().shape({
    name: yup.string().required('App name is required').max(191),
    description: yup.string().required('Description is required').max(191),
    app_link: yup.string().required('App link is required').url('Invalid url').max(191),
    youtube_link: yup.string().url('Invalid url').max(191),
    document_link: yup.string().url('Invalid url').max(191),
    redirect: yup.string().required('Redirect URI is required').url('Invalid url'),
  });

  const { handleSubmit, control, setValue, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const logo = watch('logo');
  const desImages = watch('description_image');

  const onSubmit = useCallback((data) => {
    console.log(data);
  }, []);

  const handleDropLogo = useCallback(
    (_dropFiles, acceptedFiles) => {
      if (acceptedFiles[0]?.size > 2000000) {
        showToast({
          error: true,
          message: 'Image size must be less than 2MB',
        });
        return;
      }
      setValue('logo', acceptedFiles[0]);
    },
    [setValue, showToast],
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

  const handleDropImageDescription = useCallback(
    (_dropFiles, acceptedFiles) => {
      if (
        (Array.isArray(acceptedFiles) && acceptedFiles.length > 4) ||
        (Array.isArray(desImages) && desImages.length >= 4)
      ) {
        showToast({
          error: true,
          meesage: 'Only upload 4 images for description image',
        });
        return;
      }
      if (Array.isArray(desImages)) {
        setValue('description_image', [...desImages, ...acceptedFiles]);
        return;
      }
      setValue('description_image', acceptedFiles);
    },
    [desImages, setValue, showToast],
  );

  const fileLogoUpload = !logo && (
    <DropZone.FileUpload actionHint='Accepts file size smaller than 2MB' />
  );
  return (
    <Page>
      <LegacyCard>
        <LegacyCard.Section>
          <Form>
            <FormLayout>
              <Controller
                shouldUnregister
                control={control}
                name='name'
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    label='App name'
                    value={value}
                    onChange={onChange}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                shouldUnregister
                name='app_link'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    label='App link'
                    onChange={onChange}
                    value={value}
                    error={error?.message}
                    placeholder='https://your_website.com'
                  />
                )}
              />
              <Controller
                shouldUnregister
                name='description'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    label='Description'
                    onChange={onChange}
                    value={value}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                shouldUnregister
                name='redirect'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    label='Redirect URI'
                    onChange={onChange}
                    value={value}
                    error={error?.message}
                    placeholder='https://example/oauth'
                  />
                )}
              />
              <Controller
                shouldUnregister
                name='document_link'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    label='Document link'
                    onChange={onChange}
                    value={value}
                    error={error?.message}
                    placeholder='https://document_link.com'
                  />
                )}
              />
              <Controller
                shouldUnregister
                name='youtube_link'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    label='Youtube link'
                    onChange={onChange}
                    value={value}
                    error={error?.message}
                    placeholder='https://youtube_link.com'
                  />
                )}
              />
              <Controller
                shouldUnregister
                name='logo'
                control={control}
                render={({ fieldState: { error } }) => (
                  <DropZone
                    allowMultiple={false}
                    onDrop={handleDropLogo}
                    label='App logo'
                    errorOverlayText='File type must be png,jpg,jpeg,webp'
                    type='image'
                    accept='image/*'
                    error={error?.logo}
                  >
                    {logo ? (
                      <Thumbnail
                        source={URL.createObjectURL(logo)}
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
              <Controller
                shouldUnregister
                name='description_image'
                control={control}
                render={({ fieldState: { error } }) => (
                  <InlineStack blockAlign='end' gap={200}>
                    <div style={{ width: 114, height: 114 }}>
                      <DropZone
                        allowMultiple
                        onDrop={handleDropImageDescription}
                        label='Description image'
                        errorOverlayText='File type must be png,jpg,jpeg,webp'
                        type='image'
                        accept='image/*'
                        error={error?.description_image}
                      >
                        <DropZone.FileUpload />
                      </DropZone>
                    </div>
                    <InlineStack gap={'100'}>
                      {desImages && desImages.length > 0
                        ? desImages.map((img, key) => (
                            <Box key={img} position='relative'>
                              <Thumbnail
                                key={img}
                                source={URL.createObjectURL(img)}
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
            </FormLayout>
          </Form>
        </LegacyCard.Section>
        <LegacyCard.Section>
          <InlineStack align='end'>
            <Button variant='primary' submit onClick={handleSubmit(onSubmit)}>
              Create Partner
            </Button>
          </InlineStack>
        </LegacyCard.Section>
      </LegacyCard>
    </Page>
  );
}
