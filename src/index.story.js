import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import hljs from 'highlight.js';

import 'highlight.js/styles/github-gist.css';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/lib/codemirror.css';

import { MDEditor } from './index';

const stories = storiesOf('Markdown', module);

stories.addDecorator(withKnobs);

stories.add(
  'editor',
  withInfo()(() => (
    <MDEditor
      parserOptions={{
        highlight: code => hljs.highlightAuto(code).value,
      }}
    />
  )),
);
