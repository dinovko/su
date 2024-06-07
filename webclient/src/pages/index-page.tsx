import { CssBaseline, AppBar, Toolbar, Typography, Button, Container, createTheme, ThemeProvider, Box } from '@mui/material';
import { MapComponent } from 'features';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import Container from '@material-ui/core/Container';
// import Box from '@material-ui/core/Box';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import { makeStyles } from '@material-ui/core/styles';
import './index-page.css'

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
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1b4672'
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          flexDirection: 'column',
          '@media (min-width:600px)': {
            flexDirection: 'row',
            minHeight: '50px',
          },
          justifyContent: 'space-evenly',
          alignItems: 'center',
          minHeight: '50px',
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
  const mapContainerRef = useRef(null);
  const [showFullScreenBtn, setsetshowFullScreenBtn] = useState(false)

  let goToForms = () => history('/login')

  // <Button variant="contained" onClick={goToForms}>перейти к формам</Button>
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <AppBar position="static">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '50px' }}>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Мой Сайт
            </Typography>
            <Button color="inherit" onClick={goToForms} >Вход</Button>
          </Toolbar>
        </AppBar>
        <main>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
            {/* <Typography component="h1" variant="h2" color="textPrimary" gutterBottom>
                Главная Страница
              </Typography> */}
            {/* <Typography variant="h5" color="textSecondary" paragraph>
                Описание деятельности компании или сайта.
              </Typography> */}
            <div>
              <span>Информация о потреблении воды</span>
            </div>
            <div style={{ display: 'flex' }}>
              <div className={`open-map-fullscreen-btn ${showFullScreenBtn ? 'show' : 'hidden'}`}>
                <div className={`${showFullScreenBtn ? 'show' : 'hidden'}`}>Раскрыть карту</div>
              </div>
              <div
                className="map-container"
                onMouseEnter={() => setsetshowFullScreenBtn(true)}
                onMouseLeave={() => setsetshowFullScreenBtn(false)}
                ref={mapContainerRef}
                style={{ minWidth: '100px', minHeight: '100px', border: '8px' }}
              >
                <MapComponent />
              </div>
            </div>
          </div>
        </main>
        <footer
          style={{
            padding: theme.spacing(2),
            textAlign: 'center',
            backgroundColor: '#1b4672',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '50px',
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
