import React, { useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';

import { CloseIcon } from '../Icons';

const Modal = ({
  visible,
  children,
  onClose,
  maskClosable,
  header,
  closable,
  setUnMounted,
}) => {
  const onCloseModal = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, []);

  const onClickBody = useCallback(() => {
    if (maskClosable) {
      onCloseModal();
    }
  }, []);

  const onClickModalWrapper = useCallback(event => {
    event.stopPropagation();
  }, []);

  return (
    <CSSTransition in={visible} timeout={300} classNames="md-editor-modal">
      <div
        role="button"
        tabIndex="0"
        className="md-editor-modal"
        onClick={onClickBody}
      >
        <CSSTransition
          in={visible}
          timeout={300}
          classNames="modal-wrapper"
          onExited={() => setUnMounted(true)}
        >
          <div
            role="button"
            tabIndex="0"
            className="modal-wrapper"
            onClick={onClickModalWrapper}
          >
            {header && (
              <div className="modal-header">
                <div>{header}</div>
                {closable && (
                  <div
                    className="close-button"
                    role="button"
                    tabIndex={0}
                    onClick={onCloseModal}
                  >
                    <CloseIcon />
                  </div>
                )}
              </div>
            )}
            {children}
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
};

Modal.defaultProps = {
  visible: false,
  onClose: false,
  maskClosable: true,
  closable: true,
};

export default Modal;
