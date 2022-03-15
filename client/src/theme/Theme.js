import { createTheme } from '@mui/material/styles';


export const darkTheme = createTheme({
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


export const lightTheme = createTheme({
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