import React from 'react';
import { MDEditor } from 'md-editor-react';
import hljs from 'highlight.js';

import 'highlight.js/styles/github-gist.css';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/lib/codemirror.css';
import 'md-editor-react/dist/style.css';

function App() {
  return (
    <MDEditor
      defaultValue=""
      parserOptions={{
        highlight: code => hljs.highlightAuto(code).value,
      }}
    />
  );
}

export default App;
