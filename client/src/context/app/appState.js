import React from 'react';
import PropTypes from 'prop-types';

export const AppGlobalState = ({ children }) => <div>{children}</div>;

AppGlobalState.propTypes = {
  children: PropTypes.node.isRequired
};
