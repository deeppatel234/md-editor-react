import React from 'react';
import CodeMirror from 'codemirror';

import mdParser from './lib/mdParser';
import sanitizer from './lib/sanitizer';
import { debounce, uniqueId } from './utils';

import { TableMenu, LinkMenu, ImageMenu } from './Components/Menu';

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
  TableIcon,
  LinkIcon,
  ImageIcon,
} from './Components/Icons';

import './style.scss';

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

const toolbarConfig = [
  {
    id: 'bold',
    title: 'Bold',
    icon: <BoldIcon />,
    command: editor => {
      const cursor = editor.getCursor();
      const selection = editor.getSelection();

      editor.replaceSelection(`**${selection}**`);
      if (selection === '') {
        editor.setCursor(cursor.line, cursor.ch + 2);
      }
      editor.focus();
    },
  },
  {
    id: 'italic',
    title: 'Italic',
    icon: <ItalicIcon />,
    command: editor => {
      const cursor = editor.getCursor();
      const selection = editor.getSelection();

      editor.replaceSelection(`*${selection}*`);
      if (selection === '') {
        editor.setCursor(cursor.line, cursor.ch + 1);
      }
      editor.focus();
    },
  },
  {
    id: 'strike',
    title: 'Strike',
    icon: <StrikeIcon />,
    command: editor => {
      const cursor = editor.getCursor();
      const selection = editor.getSelection();

      editor.replaceSelection(`~~${selection}~~`);
      if (selection === '') {
        editor.setCursor(cursor.line, cursor.ch + 2);
      }
      editor.focus();
    },
  },
  {
    divider: true,
  },
  {
    id: 'h1',
    title: 'H1',
    icon: <span>H1</span>,
    command: editor => headersCommand(editor, 1),
  },
  {
    id: 'h2',
    title: 'H2',
    icon: <span>H2</span>,
    command: editor => headersCommand(editor, 2),
  },
  {
    id: 'h3',
    title: 'H3',
    icon: <span>H3</span>,
    command: editor => headersCommand(editor, 3),
  },
  {
    id: 'h4',
    title: 'H4',
    icon: <span>H4</span>,
    command: editor => headersCommand(editor, 4),
  },
  {
    id: 'h5',
    title: 'H5',
    icon: <span>H5</span>,
    command: editor => headersCommand(editor, 5),
  },
  {
    id: 'h6',
    title: 'H6',
    icon: <span>H6</span>,
    command: editor => headersCommand(editor, 6),
  },
  {
    divider: true,
  },
  {
    id: 'orderlist',
    title: 'Order List',
    icon: <OrderListIcon />,
    command: editor => {
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
  },
  {
    id: 'unorderlist',
    title: 'Un Ordered List',
    icon: <UnOrderListIcon />,
    command: editor => {
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
  },
  {
    id: 'line',
    title: 'Line',
    icon: <LineIcon />,
    command: editor => {
      const cursor = editor.getCursor();
      editor.replaceSelection(
        `${cursor.ch !== 0 ? '\n\n' : '\n'}------------\n\n`,
      );
      editor.focus();
    },
  },
  {
    id: 'quote',
    title: 'Quote',
    icon: <QuoteIcon />,
    command: editor => {
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
  },
  {
    divider: true,
  },
  {
    id: 'undo',
    title: 'Undo',
    icon: <UndoIcon />,
    command: editor => editor.undo(),
  },
  {
    id: 'redo',
    title: 'Redo',
    icon: <RedoIcon />,
    command: editor => editor.redo(),
  },
  {
    divider: true,
  },
  {
    id: 'code',
    title: 'Code',
    icon: <CodeIcon />,
    command: editor => {
      const cursor = editor.getCursor();
      const selection = editor.getSelection();

      editor.replaceSelection(`\`${selection}\``);

      if (selection === '') {
        editor.setCursor(cursor.line, cursor.ch + 1);
      }
      editor.focus();
    },
  },
  {
    id: 'table',
    title: 'Table',
    icon: <TableIcon />,
    component: TableMenu,
  },
  {
    id: 'link',
    title: 'Link',
    icon: <LinkIcon />,
    component: LinkMenu,
  },
  {
    id: 'image',
    title: 'Image',
    icon: <ImageIcon />,
    component: ImageMenu,
  },
  {
    divider: true,
  },
  {
    id: 'clear',
    title: 'Clear',
    icon: <ClearIcon />,
    command: editor => editor.setValue(''),
  },
  {
    id: 'fullscreen',
    title: 'Full Screen',
    icon: <FullScreenIcon />,
    command: (e, setState, state) => {
      const { fullscreen } = state;
      setState({ fullscreen: !fullscreen });
    },
  },
  {
    id: 'watch',
    title: 'Watch',
    icon: <EyeIcon />,
    command: (e, setState, state) => {
      const { watchMode } = state;
      setState({ watchMode: !watchMode });
    },
  },
  {
    id: 'htmlview',
    title: 'HTML View',
    icon: <HTMLViewIcon />,
    command: (e, setState, state) => {
      const { htmlView } = state;
      setState({ htmlView: !htmlView });
    },
  },
];

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
      isModalVisible: false,
      modalCommandId: false,
    };

    this.parser = mdParser(props.parserOptions);

    this.onChangeEditorValue = debounce(
      this.onChangeEditorValue.bind(this),
      500,
    );

    this.editorRef = React.createRef();
    this.toolbarConfig = toolbarConfig;

    this.toolbarConfigMap = {};
    toolbarConfig.forEach(t => {
      this.toolbarConfigMap[t.id] = t;
    });

    this.exeCommand = this.exeCommand.bind(this);
    this.useAppState = this.useAppState.bind(this);
    this.onClickToolbar = this.onClickToolbar.bind(this);
    this.onClickCloseModal = this.onClickCloseModal.bind(this);
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

  onClickCloseModal() {
    this.setState({
      commandId: false,
    });
  }

  onClickCloseHTMLPreview() {
    this.setState({ htmlView: false });
  }

  getMenuComponent() {
    const { commandId } = this.state;
    const { component: Comp } = this.toolbarConfigMap[commandId];

    return <Comp close={this.onClickCloseModal} editor={this.editor} />;
  }

  exeCommand(command) {
    const tool = this.toolbarConfigMap[command];
    if (tool) {
      if (tool.command) {
        tool.command(this.editor, this.useAppState, this.state);
      }
      if (tool.component) {
        this.setState({
          commandId: command,
        });
      }
    }
  }

  useAppState(state) {
    this.setState(state);
  }

  render() {
    const {
      editorValue,
      fullscreen,
      htmlView,
      watchMode,
      commandId,
    } = this.state;

    return (
      <div className={`md-editor-wrapper ${fullscreen ? 'fullscreen' : ''}`}>
        {commandId && this.getMenuComponent()}
        <div
          className={`md-editor-toolbar-wrapper ${htmlView ? 'd-none' : ''}`}
        >
          <div className="md-editor-toolbar">
            {toolbarConfig.map(({ title, icon, id, divider }, index) => {
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
                  data-command={id}
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
