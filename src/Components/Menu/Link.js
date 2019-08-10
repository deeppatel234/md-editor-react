import React from 'react';

import Modal from '../Modal';
import Input from '../Input';

class LinkMenu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      title: '',
    };

    this.onClickSuccess = this.onClickSuccess.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onClickSuccess() {
    const { address, title } = this.state;
    const { editor, close } = this.props;

    if (address) {
      let linkString = `[${title}](${address} "${title}")`;

      if (!title) {
        linkString = `[${address}](${address})`;
      }
      editor.replaceSelection(linkString);
      close();
    }
  }

  onChangeInput(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { close } = this.props;
    const { address, title } = this.state;

    return (
      <Modal visible closable header="Link" onClose={close}>
        <Modal.Body className="menu-modal">
          <table className="input-table">
            <tr>
              <td>
                <span>Address</span>
              </td>
              <td>
                <Input
                  value={address}
                  name="address"
                  onChange={this.onChangeInput}
                />
              </td>
            </tr>
            <tr>
              <td>
                <span>Title</span>
              </td>
              <td>
                <Input
                  value={title}
                  name="title"
                  onChange={this.onChangeInput}
                />
              </td>
            </tr>
          </table>
        </Modal.Body>
        <Modal.Footer onSuccess={this.onClickSuccess} onCancel={close} />
      </Modal>
    );
  }
}

export default LinkMenu;
