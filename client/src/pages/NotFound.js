import { Box, Button, Container, Typography } from '@mui/material'
import Vildred from '../images/vildred.gif'
import { Link } from 'react-router-dom';
import React from 'react'

const NotFound = () => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: "100vw",
          height: "95vh",
          maxWidth: '100%',
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