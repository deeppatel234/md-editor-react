/* eslint react/no-danger: 0 */

import React from 'react';
import Editor from './lib/editor';
import mdParser from './lib/mdParser';
import sanitizer from './lib/sanitizer';
import { debounce } from './utils';

import './style.scss';

const Preview = ({ markDownValue, parser }) => {
  const markedValue = parser(markDownValue);
  const sanitizerValue = sanitizer(markedValue);

  return (
    <div
      className="md-editor-preview-wrapper"
      dangerouslySetInnerHTML={{ __html: sanitizerValue }}
    />
  );
};

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      editorValue: '',
    };

    this.parser = mdParser(props.parserOptions);

    this.onChangeEditorValue = debounce(
      this.onChangeEditorValue.bind(this),
      500,
    );
  }

  onChangeEditorValue(value) {
    this.setState({ editorValue: value });
  }

  render() {
    const { editorValue } = this.state;
    const { options } = this.props;

    return (
      <div className="md-editor-wrapper">
        <div className="md-editor-code">
          <Editor options={options} onChange={this.onChangeEditorValue} />
        </div>
        <div className="md-editor-preview">
          <Preview markDownValue={editorValue} parser={this.parser} />
        </div>
      </div>
    );
  }
}

export default App;
