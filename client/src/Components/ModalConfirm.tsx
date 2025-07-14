import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

interface Props {
  open: boolean;
  title: string;
  onConfirm(): void;
  onCancel(): void;
}

export const ModalConfirm: React.FC<Props> = ({ open, title, onConfirm, onCancel }) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>{title}</DialogTitle>
    <DialogActions>
      <Button onClick={onCancel}>Отмена</Button>
      <Button onClick={onConfirm} variant="contained">Да</Button>
    </DialogActions>
  </Dialog>
);
