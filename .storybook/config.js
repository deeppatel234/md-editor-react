import React from 'react';

import { configure, addDecorator, addParameters } from '@storybook/react';

import customTheme from "./customTheme";

addParameters({
  options: {
    theme: customTheme
  }
});

const req = require.context('../src', true, /\.story\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => (
  <div style={{ height: 500, padding: 20 }}>
    {story()}
  </div>
));

configure(loadStories, module);
