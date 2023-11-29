import { Spinner } from '@shopify/polaris';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import React from 'react';

const ImageLoadable = ({ alt, src, defaultSrc, className, style, ...props }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoaded = useCallback(() => {
    setLoading(false);
  }, []);

  const loadableStyle = {
    opacity: loading ? 0 : 1,
  };

  return (
    <>
      {loading && (
        <div className='text-center'>
          <Spinner />
        </div>
      )}
      <img
        alt={alt}
        src={src || defaultSrc}
        className={className}
        loading='lazy'
        onLoad={handleImageLoaded}
        style={{ ...style, ...loadableStyle }}
        align='center'
        border='0'
        {...props}
      />
    </>
  );
};

ImageLoadable.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
  className: PropTypes.string,
  defaultSrc: PropTypes.string,
  style: PropTypes.any,
};

ImageLoadable.defaultProps = {
  alt: '',
  src: '',
  className: '',
  defaultSrc: '',
  style: {},
};

export default ImageLoadable;
