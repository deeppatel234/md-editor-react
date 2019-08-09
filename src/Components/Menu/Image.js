import React from 'react';

import Modal from '../Modal';
import Input from '../Input';

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
      <Modal visible closable header="Image" onClose={close}>
        <Modal.Body className="image-modal">
          <div className="input-items">
            <span>Address</span>
            <Input
              value={address}
              name="address"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="input-items">
            <span>Title</span>
            <Input value={title} name="title" onChange={this.onChangeInput} />
          </div>
          <div className="input-items">
            <span>Link</span>
            <Input value={link} name="link" onChange={this.onChangeInput} />
          </div>
        </Modal.Body>
        <Modal.Footer onSuccess={this.onClickSuccess} onCancel={close} />
      </Modal>
    );
  }
}

export default ImageMenu;
