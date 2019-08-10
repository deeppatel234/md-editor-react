import React from 'react';
import ReactDOM from 'react-dom';

import ModalComponent from './ModalComponent';

import './style.scss';

const modalRoot = document.body;

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    const { visible, ...rest } = this.props;
    if (!visible) {
      return null;
    }

    return ReactDOM.createPortal(<ModalComponent {...rest} />, this.el);
  }
}

Modal.Body = ModalComponent.Body;

Modal.Footer = ModalComponent.Footer;

export default Modal;
