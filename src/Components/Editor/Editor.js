import React from 'react';
import CodeMirror from 'codemirror';

import { MDPreview } from '../Preview';
import { CloseIcon } from '../Icons';

import menuConfig from './menuConfig';
import { debounce, uniqueId } from '../../utils';

import '../../scss/style.scss';
import '../../scss/md-view.scss';

const DEFAULT_OPTIONS = {
  mode: 'gfm',
  lineNumbers: true,
};

class Editor extends React.PureComponent {
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

    this.onChangeEditorValue = debounce(
      this.onChangeEditorValue.bind(this),
      500,
    );

    this.editorRef = React.createRef();
    this.menubarConfig = menuConfig;

    this.menubarConfigMap = {};
    menuConfig.forEach(t => {
      this.menubarConfigMap[t.id] = t;
    });

    this.exeCommand = this.exeCommand.bind(this);
    this.useAppState = this.useAppState.bind(this);
    this.onClickToolbar = this.onClickToolbar.bind(this);
    this.onClickCloseModal = this.onClickCloseModal.bind(this);
    this.onClickCloseHTMLPreview = this.onClickCloseHTMLPreview.bind(this);
  }

  componentDidMount() {
    const { options = {} } = this.props;

    this.editor = CodeMirror(this.editorRef.current, {
      ...DEFAULT_OPTIONS,
      ...options,
    });

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
    const { component: Comp } = this.menubarConfigMap[commandId];

    return <Comp close={this.onClickCloseModal} editor={this.editor} />;
  }

  exeCommand(command) {
    const tool = this.menubarConfigMap[command];
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
    const { parserOptions } = this.props;

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
        <div className={`md-editor-menubar ${htmlView ? 'd-none' : ''}`}>
          <div className="md-editor-menu">
            {this.menubarConfig.map(({ title, icon, id, divider }, index) => {
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
              <MDPreview
                markDownValue={editorValue}
                parserOptions={parserOptions}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Editor;
