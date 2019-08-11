import DOMPurify from 'dompurify';

export default (markedValue, sanitizerOptions) =>
  DOMPurify.sanitize(markedValue, sanitizerOptions);
