import React from 'react';

import './style.scss';

const Button = ({ children, ...props }) => (
  <button className="md-editor-button" type="button" {...props}>
    {children}
  </button>
);

export default Button;
