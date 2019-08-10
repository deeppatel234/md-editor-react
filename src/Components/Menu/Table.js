import React from 'react';

import { MDModal } from '../Modal';
import { MDInput } from '../Input';

class TableMenu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rows: 3,
      cols: 3,
    };

    this.onClickSuccess = this.onClickSuccess.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onClickSuccess() {
    const { rows, cols } = this.state;
    const { editor, close } = this.props;

    if (rows > 1 && cols > 0) {
      let colsString = '|';
      let hrString = '|';
      let tableString = '';
      for (let i = 0; i < cols; i += 1) {
        colsString += '   |';
        hrString += ' ------ |';
      }
      for (let i = 0; i < rows; i += 1) {
        tableString += `${colsString}\n`;
        if (i === 0) {
          tableString += `${hrString}\n`;
        }
      }
      editor.replaceSelection(tableString);
      close();
    }
  }

  onChangeInput(event) {
    const { name, value } = event.target;
    if (/^[0-9]*$/.test(value)) {
      this.setState({
        [name]: value,
      });
    }
  }

  render() {
    const { close } = this.props;
    const { rows, cols } = this.state;

    return (
      <MDModal visible closable header="Tables" onClose={close}>
        <MDModal.Body className="menu-modal">
          <table className="input-table">
            <tbody>
              <tr>
                <td>
                  <span>Rows</span>
                </td>
                <td>
                  <MDInput
                    value={rows}
                    name="rows"
                    onChange={this.onChangeInput}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <span>Cols</span>
                </td>
                <td>
                  <MDInput
                    value={cols}
                    name="cols"
                    onChange={this.onChangeInput}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </MDModal.Body>
        <MDModal.Footer onSuccess={this.onClickSuccess} onCancel={close} />
      </MDModal>
    );
  }
}

export default TableMenu;
