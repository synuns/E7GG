import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import Coffee from "./images/coffee.png";
import Defense from "./images/battle_pvp_icon_def.png";
import Offense from "./images/battle_pvp_icon_win.png";

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            E7 Guild War Meta Tracker
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem key="defense" onClick={handleCloseNavMenu}>
                <Link to="/" style={{ textDecoration: 'none', }}>
                  <Typography 
                    textAlign="center" 
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'}}>
                    <img src={Defense} alt="Defense" height="25"/>
                    Defense
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem key="offense" onClick={handleCloseNavMenu}>
                <Link to="/offense" style={{ textDecoration: 'none' }}>
                  <Typography 
                    textAlign="center" 
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'}}>
                    <img src={Offense} alt="Defense" height="25"/>
                    Offense
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            E7 GW Meta Tracker
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                key="defense"
                component={Link} to="/"
                onClick={handleCloseNavMenu}
                align="center"
                sx={{ my: 2, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
              >
                <img src={Defense} alt="Defense" height="30"/>
                Defense
              </Button>
              <Button
                key="offense"
                component={Link} to="/offense"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
              >
                <img src={Offense} alt="Offense" height="30"/>
                Offense
              </Button>
              <Button
                key="info"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
              >
                <InfoIcon sx={{ mr: 1 }} />
                Info
              </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Buy me a Coffee">
              <img src={Coffee} alt="Buy me a Coffee" height="40" />
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;