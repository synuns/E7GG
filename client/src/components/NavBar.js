import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import Coffee from "../images/coffee.png";
import Defense from "../images/battle_pvp_icon_def.png";
import Offense from "../images/battle_pvp_icon_win.png";
import GuildCrest from "../images/guildcrest.png";
import ScrollTopBtn from "./ScrollTopBtn";
import InfoModal from './InfoModal';

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed">
      <InfoModal open={open} handleClose={handleCloseModal} />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <img src={GuildCrest} alt="guild" height="35"/>
            E7GG
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
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
                <Link to="/">
                  <Typography 
                    color="nav"
                    textAlign="center" 
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <img src={Defense} alt="Defense" height="25"/>
                    Defense
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem key="offense" onClick={handleCloseNavMenu}>
                <Typography 
                  color="nav"
                  textAlign="center" 
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Link to="/offense">
                    <img src={Offense} alt="Offense" height="25"/>
                      Offense
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem 
                key="info" 
                onClick={() => {
                  handleCloseNavMenu();
                  handleOpenModal();
                }}
              >
                <Typography 
                  textAlign="center" 
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <InfoIcon sx={{ mr: 0.5 }} />
                  Info
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img src={GuildCrest} alt="" height="35"/>
            E7GG
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                key="defense"
                color="nav"
                component={Link} to="/"
                onClick={handleCloseNavMenu}
                align="center"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}
              >
                <img src={Defense} alt="Defense" height="30"/>
                Defense
              </Button>
              <Button
                key="offense"
                color="nav"
                component={Link} to="/offense"
                onClick={handleCloseNavMenu}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}
              >
                <img src={Offense} alt="Offense" height="30"/>
                <Typography>
                  Offense
                </Typography>
              </Button>
              <Button
                key="info"
                color="nav"
                onClick={() => {
                  handleCloseNavMenu();
                  handleOpenModal();
                }}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}
              >
                <InfoIcon sx={{ mr: 1 }} />
                <Typography>
                  Info
                </Typography>
              </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }} onClick={() => {window.open("https://www.buymeacoffee.com/fribbels")}}>
            <Tooltip title="Buy me a Coffee">
              <img src={Coffee} alt="Buy me a Coffee" height="40" />
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
      <ScrollTopBtn />
    </AppBar>
  );
};

export default NavBar;