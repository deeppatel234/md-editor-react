import insane from 'insane';

const options = {
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

export default markedValue => insane(markedValue, options);
