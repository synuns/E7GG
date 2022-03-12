import React from 'react'
import { Box, Button, Modal, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  minWidth: 400,
  maxWidth: 700,
  bgcolor: 'background.paper',
  color: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const InfoModal = ({ open, handleClose }) => {
  const handleClick = () => {
    window.open('https://fribbels.github.io/e7/gw-meta.html');
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography 
            id="modal-title" 
            variant="h6" 
            component="h2"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            E7GG Info
            <InfoIcon /> 
          </Typography>
          <Box id="modal-description" sx={{ mt: 2 }}>
            <Typography>
              This app tracks data in global server ŸØATHŸ's top 30 ranked guild war matchups. 
              The dataset consists of the full offense and defense history of ŸØATHŸ guild and all opponents over the past few weeks.
            </Typography>
            <Typography sx={{ mt: 1 }}>
              E7GG is clone app of the Fribbels E7 Guild War Meta Tracker. It was made for no commercial purpose and all of the meta data is owned by Fribbels.
            </Typography>
            <Box 
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 2,
                fontSize: 10,
              }} 
            >
              <Button onClick={handleClick}>
                Original Link
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default InfoModal