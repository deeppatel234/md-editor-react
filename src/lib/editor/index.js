import React from 'react';
import CodeMirror from 'codemirror';

class Editor extends React.PureComponent {
  constructor(props) {
    super(props);

    this.divRef = React.createRef();
  }

  componentDidMount() {
    const { onChange, options } = this.props;

    this.editor = CodeMirror(this.divRef.current, options);

    this.editor.on('change', () => {
      if (onChange) {
        onChange(this.editor.getValue());
      }
    });
  }

  render() {
    return <div ref={this.divRef} />;
  }
}

export default Editor;
