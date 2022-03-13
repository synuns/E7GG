import { Alert, Snackbar, Slide } from '@mui/material'
import React, { useState } from 'react'

const ErrorAlert = () => {
  const [open, setOpen] = useState(true);

  const refresh = () => {
    setOpen(false);
    window.location.reload();
  }

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Snackbar
        open={open}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      >
        <Alert 
          variant="filled" 
          severity="error"
          width="100%"
          onClose={refresh}
        >
          Failed! Please try again.
        </Alert>
      </Snackbar>
    </Slide>
  )
}

export default ErrorAlert