import React from 'react';
import sanitizer from '../../lib/sanitizer';
import mdParser from '../../lib/mdParser';

import '../../scss/md-view.scss';

const Preview = ({ value, parserOptions, sanitizerOptions }) => {
  const markedValue = mdParser(parserOptions)(value);
  const sanitizerValue = sanitizer(markedValue, sanitizerOptions);

  return (
    <div
      className="md-editor-preview-wrapper"
      dangerouslySetInnerHTML={{ __html: sanitizerValue }}
    />
  );
};

Preview.defaultProps = {
  parserOptions: {},
  value: '',
  sanitizerOptions: {},
};

export default Preview;
