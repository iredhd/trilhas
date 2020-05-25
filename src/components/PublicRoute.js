import React from 'react';
import PropTypes from 'prop-types';

import Watermark from './Watermark';

const PublicScreen = ({ children }) => (
  <Watermark>
    {children}
  </Watermark>
);

PublicScreen.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicScreen;
