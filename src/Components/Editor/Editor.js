import React from 'react';
import CodeMirror from 'codemirror';

import { MDPreview } from '../Preview';
import { CloseIcon } from '../Icons';

import defaultMenuConfig from './menuConfig';
import {
  debounce,
  uniqueId,
  shallowCompare,
  compareMenuList,
} from '../../utils';

import '../../scss/style.scss';

const DEFAULT_OPTIONS = {
  mode: 'gfm',
  lineNumbers: true,
};

class Editor extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      editorValue: props.defaultValue,
      menuConfigList: this.prepareMenu(props.menuConfig),
      fullscreen: props.fullScreen,
      watchMode: props.watchMode,
      htmlView: false,
      isModalVisible: false,
      modalCommandId: false,
    };

    this.editorRef = React.createRef();

    this.onChangeEditorValue = debounce(
      this.onChangeEditorValue.bind(this),
      props.delay,
    );
    this.useAppState = this.useAppState.bind(this);
    this.onClickToolbar = this.onClickToolbar.bind(this);
    this.onClickCloseModal = this.onClickCloseModal.bind(this);
    this.onClickCloseHTMLPreview = this.onClickCloseHTMLPreview.bind(this);
  }

  componentDidMount() {
    const { options } = this.props;
    const { editorValue } = this.state;

    this.editor = CodeMirror(this.editorRef.current, {
      ...DEFAULT_OPTIONS,
      ...options,
    });

    this.editor.setValue(editorValue);
    this.editor.on('change', () => {
      this.onChangeEditorValue(this.editor.getValue());
    });
  }

  componentDidUpdate(prevProps) {
    const { options, menuConfig } = this.props;
    if (!shallowCompare(prevProps.options, options)) {
      Object.keys(options).forEach(key => {
        this.editor.setOption(key, options[key]);
      });
    }
    if (!compareMenuList(prevProps.menuConfig, menuConfig)) {
      this.updateMenu();
    }
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
    const { component: Comp } = this.menuConfigMap[commandId];

    return <Comp close={this.onClickCloseModal} editor={this.editor} />;
  }

  exeCommand(command) {
    const tool = this.menuConfigMap[command];
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

  prepareMenu(propMenuConfig) {
    this.menuConfigMap = {};
    const menuConfigList = [];
    const forEachCB = t => {
      const id = t.id || 'divider';
      this.menuConfigMap[id] = t;
      if (t.position) {
        menuConfigList.splice(t.position - 1, 0, id);
      } else {
        menuConfigList.push(id);
      }
    };
    defaultMenuConfig.forEach(forEachCB);
    propMenuConfig.forEach(forEachCB);
    return menuConfigList;
  }

  updateMenu() {
    const { menuConfig } = this.props;
    this.setState({ menuConfigList: this.prepareMenu(menuConfig) });
  }

  render() {
    const { parserOptions, className } = this.props;

    const {
      editorValue,
      fullscreen,
      htmlView,
      watchMode,
      commandId,
      menuConfigList,
    } = this.state;

    return (
      <div
        className={`md-editor-wrapper ${className} ${
          fullscreen ? 'fullscreen' : ''
        }`}
      >
        {commandId && this.getMenuComponent()}
        <div className={`md-editor-menubar ${htmlView ? 'd-none' : ''}`}>
          <div className="md-editor-menu">
            {menuConfigList.map((key, index) => {
              const { title, icon, id, divider } = this.menuConfigMap[key];
              if (divider) {
                return (
                  <div key={uniqueId('divider')} className="divider">
                    |
                  </div>
                );
              }
              return (
                <div
                  key={id}
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
              <MDPreview value={editorValue} parserOptions={parserOptions} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

Editor.defaultProps = {
  delay: 300,
  fullScreen: false,
  watchMode: true,
  className: '',
  options: {},
  menuConfig: [],
  defaultValue: '',
  parserOptions: {},
};

export default Editor;
