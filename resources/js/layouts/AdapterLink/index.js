import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function AdapterLink({ children, url, ...rest }) {
  const to = typeof url === 'undefined' ? '' : url;

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return (
      <a
        href={to}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        target='_blank'
        rel='noopener noreferrer'
        // eslint-disable-next-line react/no-unknown-property
        external='true'
      >
        {children}
      </a>
    );
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
}

AdapterLink.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.node,
};

AdapterLink.defaultProps = {
  children: <></>,
};
