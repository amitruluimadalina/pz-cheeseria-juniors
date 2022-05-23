import * as React from 'react';
// Components
import { Snackbar, IconButton } from '@material-ui/core';
// Icons
import CloseIcon from '@material-ui/icons/Close';
// Types
import { NotificationProps } from '../types';

const Notification: React.FC<NotificationProps> = ({ openNotification, handleClose, message }) => {
  const action = (
    <IconButton
      size="medium"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      open={openNotification}
      autoHideDuration={3000}
      onClose={handleClose}
      message={message}
      action={action}
    />
  );
}

export default Notification;
