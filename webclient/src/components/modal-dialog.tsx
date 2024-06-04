import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface ModalDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ModalDialog: React.FC<ModalDialogProps> = ({ open, onClose, title, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-dialog-title"
      aria-describedby="modal-dialog-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          outline: 'none'
        }}
      >
        <Typography id="modal-dialog-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Box id="modal-dialog-description" sx={{ mt: 2 }}>
          {children}
        </Box>
        <Button onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalDialog;