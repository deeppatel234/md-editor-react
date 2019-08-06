import React from 'react';
import Editor from 'md-editor-react';
import hljs from 'highlight.js';

import 'highlight.js/styles/github-gist.css';
import 'md-editor-react/dist/style.css';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/lib/codemirror.css';

function App() {
  return (
    <div>
      <Editor
        options={{
          mode: "gfm",
          lineNumbers: true
        }}
        parserOptions={{
          highlight: code => hljs.highlightAuto(code).value,
        }}
      />
    </div>
  );
}

export default App;
