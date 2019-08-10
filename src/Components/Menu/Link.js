import React from 'react';

import { MDModal } from '../Modal';
import { MDInput } from '../Input';

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
      <MDModal visible closable header="Link" onClose={close}>
        <MDModal.Body className="menu-modal">
          <table className="input-table">
            <tbody>
              <tr>
                <td>
                  <span>Address</span>
                </td>
                <td>
                  <MDInput
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
                  <MDInput
                    value={title}
                    name="title"
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

export default LinkMenu;
