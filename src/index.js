import React from 'react';
import CodeMirror from 'codemirror';

import mdParser from './lib/mdParser';
import sanitizer from './lib/sanitizer';
import { debounce, uniqueId } from './utils';

import {
  ItalicIcon,
  BoldIcon,
  UndoIcon,
  RedoIcon,
  StrikeIcon,
  OrderListIcon,
  UnOrderListIcon,
  LineIcon,
  QuoteIcon,
  CodeIcon,
  ClearIcon,
  FullScreenIcon,
  HTMLViewIcon,
  CloseIcon,
  EyeIcon,
} from './Components/Icons';

import './style.scss';

const toolbarConfig = [
  {
    title: 'Bold',
    icon: <BoldIcon />,
    command: 'bold',
  },
  {
    title: 'Italic',
    icon: <ItalicIcon />,
    command: 'italic',
  },
  {
    title: 'Strike',
    icon: <StrikeIcon />,
    command: 'strike',
  },
  {
    divider: true,
  },
  {
    title: 'H1',
    icon: <span>H1</span>,
    command: 'h1',
  },
  {
    title: 'H2',
    icon: <span>H2</span>,
    command: 'h2',
  },
  {
    title: 'H3',
    icon: <span>H3</span>,
    command: 'h3',
  },
  {
    title: 'H4',
    icon: <span>H4</span>,
    command: 'h4',
  },
  {
    title: 'H5',
    icon: <span>H5</span>,
    command: 'h5',
  },
  {
    title: 'H6',
    icon: <span>H6</span>,
    command: 'h6',
  },
  {
    divider: true,
  },
  {
    title: 'Order List',
    icon: <OrderListIcon />,
    command: 'orderlist',
  },
  {
    title: 'Un Ordered List',
    icon: <UnOrderListIcon />,
    command: 'unorderlist',
  },
  {
    title: 'Line',
    icon: <LineIcon />,
    command: 'line',
  },
  {
    title: 'Quote',
    icon: <QuoteIcon />,
    command: 'quote',
  },
  {
    divider: true,
  },
  {
    title: 'Undo',
    icon: <UndoIcon />,
    command: 'undo',
  },
  {
    title: 'Redo',
    icon: <RedoIcon />,
    command: 'redo',
  },
  {
    divider: true,
  },
  {
    title: 'Code',
    icon: <CodeIcon />,
    command: 'code',
  },
  {
    divider: true,
  },
  {
    title: 'Clear',
    icon: <ClearIcon />,
    command: 'clear',
  },
  {
    title: 'Full Screen',
    icon: <FullScreenIcon />,
    command: 'fullscreen',
  },
  {
    title: 'Watch',
    icon: <EyeIcon />,
    command: 'watch',
  },
  {
    title: 'HTML View',
    icon: <HTMLViewIcon />,
    command: 'htmlview',
  },
];

const headersCommand = (editor, h) => {
  const cursor = editor.getCursor();
  const selection = editor.getSelection();
  const text = `${[...Array(h)].map(() => '#').join('')} ${selection}`;

  if (cursor.ch !== 0) {
    editor.setCursor(cursor.line, 0);
    editor.replaceSelection(text);
    editor.setCursor(cursor.line, cursor.ch + h + 1);
  } else {
    editor.replaceSelection(text);
  }
  editor.focus();
};

const commands = {
  bold: editor => {
    const cursor = editor.getCursor();
    const selection = editor.getSelection();

    editor.replaceSelection(`**${selection}**`);
    if (selection === '') {
      editor.setCursor(cursor.line, cursor.ch + 2);
    }
    editor.focus();
  },
  italic: editor => {
    const cursor = editor.getCursor();
    const selection = editor.getSelection();

    editor.replaceSelection(`*${selection}*`);
    if (selection === '') {
      editor.setCursor(cursor.line, cursor.ch + 1);
    }
    editor.focus();
  },
  strike: editor => {
    const cursor = editor.getCursor();
    const selection = editor.getSelection();

    editor.replaceSelection(`~~${selection}~~`);
    if (selection === '') {
      editor.setCursor(cursor.line, cursor.ch + 2);
    }
    editor.focus();
  },
  h1: editor => headersCommand(editor, 1),
  h2: editor => headersCommand(editor, 2),
  h3: editor => headersCommand(editor, 3),
  h4: editor => headersCommand(editor, 4),
  h5: editor => headersCommand(editor, 5),
  h6: editor => headersCommand(editor, 6),
  orderlist: editor => {
    const selection = editor.getSelection();

    if (selection === '') {
      editor.replaceSelection(`1. ${selection}`);
    } else {
      const selectionText = selection
        .split('\n')
        .map((s, i) => (s === '' ? '' : `${i + 1}. ${s}`));

      editor.replaceSelection(selectionText.join('\n'));
    }
    editor.focus();
  },
  unorderlist: editor => {
    const selection = editor.getSelection();

    if (selection === '') {
      editor.replaceSelection(`- ${selection}`);
    } else {
      const selectionText = selection
        .split('\n')
        .map(s => (s === '' ? '' : `- ${s}`));

      editor.replaceSelection(selectionText.join('\n'));
    }
    editor.focus();
  },
  line: editor => {
    const cursor = editor.getCursor();
    editor.replaceSelection(
      `${cursor.ch !== 0 ? '\n\n' : '\n'}------------\n\n`,
    );
    editor.focus();
  },
  quote: editor => {
    const cursor = editor.getCursor();
    const selection = editor.getSelection();
    const text = `> ${selection}`;

    if (cursor.ch !== 0) {
      editor.setCursor(cursor.line, 0);
      editor.replaceSelection(text);
      editor.setCursor(cursor.line, cursor.ch + 2);
    } else {
      editor.replaceSelection(text);
    }
    editor.focus();
  },
  undo: editor => editor.undo(),
  redo: editor => editor.redo(),
  code: editor => {
    const cursor = editor.getCursor();
    const selection = editor.getSelection();

    editor.replaceSelection(`\`${selection}\``);

    if (selection === '') {
      editor.setCursor(cursor.line, cursor.ch + 1);
    }
    editor.focus();
  },
  clear: editor => editor.setValue(''),
  fullscreen: (e, setState, state) => {
    const { fullscreen } = state;
    setState({ fullscreen: !fullscreen });
  },
  htmlview: (e, setState, state) => {
    const { htmlView } = state;
    setState({ htmlView: !htmlView });
  },
  watch: (e, setState, state) => {
    const { watchMode } = state;
    setState({ watchMode: !watchMode });
  },
};

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
      fullscreen: false,
      htmlView: false,
      watchMode: true,
    };

    this.parser = mdParser(props.parserOptions);

    this.onChangeEditorValue = debounce(
      this.onChangeEditorValue.bind(this),
      500,
    );

    this.editorRef = React.createRef();
    this.commands = commands;

    this.exeCommand = this.exeCommand.bind(this);
    this.useAppState = this.useAppState.bind(this);
    this.onClickToolbar = this.onClickToolbar.bind(this);
    this.onClickCloseHTMLPreview = this.onClickCloseHTMLPreview.bind(this);
  }

  componentDidMount() {
    const { options } = this.props;

    this.editor = CodeMirror(this.editorRef.current, options);

    this.editor.on('change', () => {
      this.onChangeEditorValue(this.editor.getValue());
    });
  }

  onChangeEditorValue(value) {
    const { onChange } = this.props;
    this.setState({ editorValue: value });
    if (onChange) {
      onChange(value);
    }
  }

  onClickToolbar(event) {
    const { dataset } = event.currentTarget;
    const command = dataset && dataset.command;
    this.exeCommand(command);
  }

  onClickCloseHTMLPreview() {
    this.setState({ htmlView: false });
  }

  exeCommand(command) {
    this.commands[command](this.editor, this.useAppState, this.state);
  }

  useAppState(state) {
    this.setState(state);
  }

  render() {
    const { editorValue, fullscreen, htmlView, watchMode } = this.state;

    return (
      <div className={`md-editor-wrapper ${fullscreen ? 'fullscreen' : ''}`}>
        <div
          className={`md-editor-toolbar-wrapper ${htmlView ? 'd-none' : ''}`}
        >
          <div className="md-editor-toolbar">
            {toolbarConfig.map(({ title, icon, command, divider }, index) => {
              if (divider) {
                return (
                  <div key={uniqueId('divider')} className="divider">
                    |
                  </div>
                );
              }
              return (
                <div
                  key={title}
                  title={title}
                  role="button"
                  tabIndex={index + 1}
                  data-command={command}
                  onClick={this.onClickToolbar}
                >
                  {icon}
                </div>
              );
            })}
          </div>
        </div>
        <div className="md-editor-area">
          <div
            className={`md-editor-code ${htmlView ? 'd-none' : ''}`}
            ref={this.editorRef}
          />
          {watchMode && (
            <div className="md-editor-preview">
              {htmlView && (
                <div
                  role="button"
                  className="close"
                  tabIndex="0"
                  onClick={this.onClickCloseHTMLPreview}
                >
                  <CloseIcon />
                </div>
              )}
              <Preview markDownValue={editorValue} parser={this.parser} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
