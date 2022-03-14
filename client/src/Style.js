import { createTheme } from '@mui/material/styles';


export const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5b5b9a',
    },
    nav: {
      main: '#ffffff',
    },
  },
});


export const light = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5b5b9a',
    },
    background: {
      default: '#e7ebf0',
    },
    nav: {
      main: '#ffffff',
    }
  },
});