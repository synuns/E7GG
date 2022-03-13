import { Box } from '@mui/material';
import React from 'react';
import Aither from '../images/aither.gif';

const Loading = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: '-50px 0 0 -50px',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <img src={Aither} alt="loading..." height="100"/>
    </Box>
  )
}

export default Loading