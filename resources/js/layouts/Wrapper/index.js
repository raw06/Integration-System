import React from 'react';
import PropTypes from 'prop-types';
import '../../App.css';

// eslint-disable-next-line react/prop-types
export default function Wrapper({ children }) {
  return <div className='wrapper-layout'>{children}</div>;
}

Wrapper.protoTypes = {
  children: PropTypes.element.isRequired,
};

Wrapper.defaultProps = {
  children: <></>,
};
