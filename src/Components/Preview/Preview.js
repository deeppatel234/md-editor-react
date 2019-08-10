import React from 'react';
import sanitizer from '../../lib/sanitizer';
import mdParser from '../../lib/mdParser';

const Preview = ({ markDownValue, parserOptions }) => {
  const markedValue = mdParser(parserOptions)(markDownValue);
  const sanitizerValue = sanitizer(markedValue);

  return (
    <div
      className="md-editor-preview-wrapper"
      dangerouslySetInnerHTML={{ __html: sanitizerValue }}
    />
  );
};

export default Preview;
