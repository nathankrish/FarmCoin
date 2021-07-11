import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Form_Bank from './Form_Bank';

const ModalDialog = ({ open, handleClose }) => {
  return (
    // props received from App.js
    <Dialog open={open} onClose={handleClose}>
      <Form_Bank handleClose={handleClose} />
    </Dialog>
  );
};

export {ModalDialog};