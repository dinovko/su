import { createTheme, ThemeProvider } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '16px', // Укажите нужный размер шрифта
        },
      },
    },
  },
});

// export default theme;
