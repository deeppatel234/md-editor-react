import insane from 'insane';

export const DEFAULT_SENITIZER_OPTIONS = {
  allowedTags: [...insane.defaults.allowedTags, 'input'],
  allowedAttributes: {
    ...insane.defaults.allowedAttributes,
    span: ['class'],
    div: ['class'],
    code: ['class'],
    li: ['class'],
    input: ['class', 'checked', 'disabled', 'type'],
  },
};

export default (markedValue, sanitizerOptions) =>
  insane(markedValue, {
    ...DEFAULT_SENITIZER_OPTIONS,
    ...sanitizerOptions,
  });
