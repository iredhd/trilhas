import React from 'react';
import PropTypes from 'prop-types';

import Watermark from './Watermark';
import Menu from './Menu';

const PrivateRoute = ({ children }) => (
  <Watermark>
    <Menu />
    {children}
  </Watermark>
);

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
