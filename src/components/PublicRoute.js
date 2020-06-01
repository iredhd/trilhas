import React from 'react';
import PropTypes from 'prop-types';

import Watermark from './Watermark';

const PublicRoute = ({ children }) => (
  <Watermark>
    {children}
  </Watermark>
);

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
