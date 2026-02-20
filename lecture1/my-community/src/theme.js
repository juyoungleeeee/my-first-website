import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B35',
      light: '#FF8C5A',
      dark: '#E55A27',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FFC947',
      light: '#FFD670',
      dark: '#E6B030',
      contrastText: '#000000',
    },
    background: {
      default: '#FFF8F5',
      paper: '#ffffff',
    },
    text: {
      primary: '#2D2D2D',
      secondary: '#6B6B6B',
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

export default theme;
