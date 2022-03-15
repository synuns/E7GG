import { Box, Button, Container, Typography } from '@mui/material'
import Vildred from '../images/vildred.gif'
import { Link } from 'react-router-dom';
import React from 'react'

const NotFound = () => {
  return (
    <Container
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={Vildred} alt="not found" height="200" />
        <Typography variant="h4" fontWeight="bold">Page Not Found!</Typography>
        <Link to="/" style={{ textDecoration: 'none', }} >
          <Button>
            back to main page
          </Button>
        </Link>
      </Box>
    </Container>
  )
}

export default NotFound