import React from 'react';
import ReactDOM from 'react-dom';

const Backdrop = (props) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
      }}
      onClick={props.onClose}
    />
  );
};

const ModalOverlay = (props) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '20vh',
        left: '5%',
        width: '90%',
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '14px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
        zIndex: 30,
        animation: '$slide-down 300ms ease-out forwards',
      }}
    >
      <div>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </>
  );
};

export default Modal;
