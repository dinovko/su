import { CssBaseline, AppBar, Toolbar, Typography, Button, Container, createTheme, ThemeProvider, Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import Container from '@material-ui/core/Container';
// import Box from '@material-ui/core/Box';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import { makeStyles } from '@material-ui/core/styles';
// import 'main-page.css'

const theme = createTheme({
  typography: {
    h2: {
      fontSize: '2rem',
      '@media (min-width:600px)': {
        fontSize: '3rem',
      },
    },
    h5: {
      fontSize: '1rem',
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
    },
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          flexDirection: 'column',
          '@media (min-width:600px)': {
            flexDirection: 'row',
          },
          justifyContent:'space-evenly',
          alignItems:'center'
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginTop: '10px',
          '@media (min-width:600px)': {
            marginTop: '0',
          },
        },
      },
    },
  },
});


export const IndexPage = () => {
  const history = useNavigate();

  let goToForms = () => history('/login')

  // <Button variant="contained" onClick={goToForms}>перейти к формам</Button>
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <AppBar position="static">
          <Toolbar sx={{display:'flex',justifyContent:'space-around'}}>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Мой Сайт
            </Typography>
            <Button color="inherit" onClick={goToForms} >Вход</Button>
            <Button color="inherit" onClick={goToForms} >Вход</Button>
          </Toolbar>
        </AppBar>
        <main>
          <Box
            component="div"
            sx={{ padding: theme.spacing(8, 0, 6), textAlign: 'center' }}
          >
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" color="textPrimary" gutterBottom>
                Главная Страница
              </Typography>
              <Typography variant="h5" color="textSecondary" paragraph>
                Описание деятельности компании или сайта.
              </Typography>
              <div>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <li style={{ padding: theme.spacing(1, 0) }}>Пункт 1</li>
                  <li style={{ padding: theme.spacing(1, 0) }}>Пункт 2</li>
                  <li style={{ padding: theme.spacing(1, 0) }}>Пункт 3</li>
                  <li style={{ padding: theme.spacing(1, 0) }}>Пункт 4</li>
                  <li style={{ padding: theme.spacing(1, 0) }}>Пункт 5</li>
                </ul>
              </div>
            </Container>
          </Box>
        </main>
        <footer
          style={{
            padding: theme.spacing(6),
            textAlign: 'center',
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="subtitle1" color="textSecondary" component="p">
              Контакты: example@example.com
            </Typography>
          </Container>
        </footer>
      </div>
    </ThemeProvider>
  )
}
