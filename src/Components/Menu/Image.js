import React from 'react';

import { MDModal } from '../Modal';
import { MDInput } from '../Input';

class ImageMenu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      title: '',
      link: '',
    };

    this.onClickSuccess = this.onClickSuccess.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onClickSuccess() {
    const { address, title, link } = this.state;
    const { editor, close } = this.props;

    if (address || title || link) {
      const altAttr = title ? `"${title}"` : '';
      let imageString = '';
      if (!link) {
        imageString = `![${title}](${address} {altAttr})`;
      } else {
        imageString = `[![${title}](${link} ${altAttr})](${link} ${altAttr})`;
      }
      editor.replaceSelection(imageString);
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
    const { address, title, link } = this.state;

    return (
      <MDModal visible closable header="Image" onClose={close}>
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
              <tr>
                <td>
                  <span>Link</span>
                </td>
                <td>
                  <MDInput
                    value={link}
                    name="link"
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

export default ImageMenu;
