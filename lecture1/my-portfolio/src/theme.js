import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A1A1A',
      light: '#333333',
      dark: '#000000',
    },
    secondary: {
      main: '#5B9BD5',
      dark: '#4A90D9',
    },
    background: {
      default: '#F5F0E8',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#888888',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#1A1A1A',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#1A1A1A',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#1A1A1A',
    },
    body1: {
      fontSize: '1rem',
      color: '#1A1A1A',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#888888',
    },
  },
  spacing: 8,
});

export default theme;
