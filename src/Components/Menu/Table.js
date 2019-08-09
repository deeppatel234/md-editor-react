import React from 'react';

import Modal from '../Modal';
import Input from '../Input';

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
      <Modal visible closable header="Tables" onClose={close}>
        <Modal.Body className="table-modal">
          <div className="input-items">
            <span>Rows</span>
            <Input value={rows} name="rows" onChange={this.onChangeInput} />
          </div>
          <div className="input-items">
            <span>Cols</span>
            <Input value={cols} name="cols" onChange={this.onChangeInput} />
          </div>
        </Modal.Body>
        <Modal.Footer onSuccess={this.onClickSuccess} onCancel={close} />
      </Modal>
    );
  }
}

export default TableMenu;
