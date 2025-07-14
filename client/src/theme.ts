// client/src/theme.ts
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#512da8',        // глубокий пурпурный
    },
    secondary: {
      main: '#ffca28',        // насыщенный янтарный
    },
    background: {
      default: '#f5f5f5',     // светлый фон
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: { fontWeight: 500 },
    subtitle1: { fontWeight: 500 },
    body2: { color: '#555' },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: 'none' }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s',
          '&:hover': { transform: 'translateY(-4px)' }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
      }
    },
    MuiSlider: {
      styleOverrides: {
        thumb: { color: '#512da8' },
        track: { color: '#512da8' },
        rail: { color: '#ccc' }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: { color: '#512da8' }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 12 }
      }
    }
  }
})
