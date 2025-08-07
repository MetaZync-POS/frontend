import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

const ConfirmDialog = ({ open, onClose, onConfirm, message }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{message}</DialogTitle>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button variant="contained" color="error" onClick={onConfirm}>Yes</Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
