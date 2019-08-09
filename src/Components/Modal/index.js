import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import ModalComponent from './Modal';
import Button from '../Button';

import './style.scss';

const modalRoot = document.body;

const Modal = ({ visible, ...rest }) => {
  const [unMounted, setUnMounted] = useState(true);
  const eleRef = useRef(document.createElement('div'));

  useEffect(() => {
    modalRoot.appendChild(eleRef.current);
    return () => {
      modalRoot.removeChild(eleRef.current);
    };
  }, []);

  useEffect(() => {
    if (visible) {
      setUnMounted(false);
    }
  }, [visible]);

  if (unMounted) {
    return null;
  }

  return ReactDOM.createPortal(
    <ModalComponent setUnMounted={setUnMounted} visible={visible} {...rest} />,
    eleRef.current,
  );
};

Modal.Body = ({ children, className = '' }) => (
  <div className={`modal-body ${className}`}>{children}</div>
);

Modal.Footer = ({ onCancel, onSuccess, className = '' }) => {
  return (
    <div className={`model-footer ${className}`}>
      <Button onClick={onCancel}>Cancel</Button>
      <Button onClick={onSuccess}>Okay</Button>
    </div>
  );
};

export default Modal;
