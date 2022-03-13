import { Alert, Slide, Snackbar } from '@mui/material';
import React, { useState, useEffect } from 'react'

const NoDataAlert = (prop) => {
  const [open, setOpen] = useState(prop.open);

  useEffect(() => {
    setOpen(prop.open);
  }, [prop]);

  return (
    <Snackbar
        open={open}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      >
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Alert 
          variant="filled" 
          severity="warning"
          width="100%"
          onClose={() => setOpen(false)}
        >
          No data exist to display.
        </Alert>
      </Slide>
    </Snackbar>
  )
}

export default NoDataAlert