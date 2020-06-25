import React from 'react';
import PropTypes from 'prop-types';

import Background from './Background';

const PublicRoute = ({ children }) => (
  <Background>
    {children}
  </Background>
);

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
