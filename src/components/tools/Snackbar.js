import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent'; // Import SnackbarContent
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function CustomSnackbar({ open, message, onClose, backgroundColor }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <SnackbarContent
        style={{ backgroundColor: backgroundColor }}
        message={message}
        action={
          <IconButton size="small" color="inherit" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Snackbar>
  );
}

export default CustomSnackbar;