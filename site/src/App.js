import React from 'react';
import { MDEditor } from 'md-editor-react';
import hljs from 'highlight.js';

import 'highlight.js/styles/github-gist.css';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/lib/codemirror.css';
import 'md-editor-react/dist/style.css';

import './style.css';

import { HeartIcon, GithubIcon } from './icons';

function App() {
  return (
    <div className="site-wrapper">
      <div class="header">
        <div className="left">
          <img src="logo.png" /> <span className="title">Markdown Editor React</span>
        </div>
        <div className="right">
          <a href="https://github.com/deeppatel234/md-editor-react" target="_blank" rel="noopener noreferrer" className="links"><GithubIcon /> Github</a>
        </div>
      </div>
      <div class="body">
        <MDEditor
          defaultValue="Hello World"
          parserOptions={{
            highlight: code => hljs.highlightAuto(code).value,
          }}
        />
      </div>
      <div className="footer">
        Made with <HeartIcon /> in India
      </div>
    </div>
  );
}

export default App;
