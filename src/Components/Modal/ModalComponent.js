/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint class-methods-use-this: 0 */

import React from 'react';
import { CloseIcon } from '../Icons';
import { MDButton } from '../Button';

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);

    this.onCloseModal = this.onCloseModal.bind(this);
    this.onClickBody = this.onClickBody.bind(this);
  }

  onCloseModal() {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  }

  onClickBody() {
    const { maskClosable } = this.props;
    if (maskClosable) {
      this.onCloseModal();
    }
  }

  onClickModalWrapper(event) {
    event.stopPropagation();
  }

  render() {
    const { children, header, closable } = this.props;

    return (
      <div className="md-editor-modal" onClick={this.onClickBody}>
        <div className="modal-wrapper" onClick={this.onClickModalWrapper}>
          {header && (
            <div className="modal-header">
              <div>{header}</div>
              {closable && (
                <div
                  className="close-button"
                  role="button"
                  tabIndex={0}
                  onClick={this.onCloseModal}
                >
                  <CloseIcon />
                </div>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    );
  }
}

ModalComponent.Body = ({ children, className = '' }) => (
  <div className={`modal-body ${className}`}>{children}</div>
);

ModalComponent.Footer = ({ onCancel, onSuccess, className = '' }) => {
  return (
    <div className={`model-footer ${className}`}>
      <MDButton onClick={onCancel}>Cancel</MDButton>
      <MDButton onClick={onSuccess}>Okay</MDButton>
    </div>
  );
};

ModalComponent.defaultProps = {
  visible: false,
  onClose: false,
  maskClosable: true,
  closable: true,
};

export default ModalComponent;
