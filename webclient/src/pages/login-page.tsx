import { Box, Button, Container, CssBaseline, Grid, Paper, Stack, TextField, ThemeProvider, Typography, createTheme, useMediaQuery } from '@mui/material'
import { Login } from 'features'
import { selectAccount } from 'features/account/accountSlice'
import { useAppSelector } from 'hooks/storeHook'
import React, { useEffect } from 'react'
import { Navigate, useLocation, useNavigate, useNavigation } from 'react-router-dom'
import { decodeJwtToken, isExpired } from 'utils/tokenUtils'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';

const theme = createTheme({
  typography: {
    h5: {
      fontSize: '1.5rem',
      '@media (min-width:600px)': {
        fontSize: '2rem',
      },
    },
  },
});

export const LoginPage = () => {
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const location = useLocation();
  const navigation = useNavigate();
  const acc = useAppSelector(selectAccount);

  useEffect(() => {
    // console.info('acc.isAuth', acc.isAuth)
    // if (acc.isAuth) {
    //   let tokenExp = null;
    //   let jwtFromSessionStorage = sessionStorage.getItem('X-TOKEN');
    //   console.info('jwtFromSessionStorage', jwtFromSessionStorage)
    //   if (jwtFromSessionStorage) {
    //     tokenExp = decodeJwtToken(jwtFromSessionStorage);
    //     if (tokenExp) {
    //       console.info('!isExpired(tokenExp.exp)', isExpired(tokenExp.exp))
    //     }
    //   }
    //   navigation("/reports", { replace: true });
    // navigation("/forms");
    // <Navigate to="/forms" state={{ from: location }} replace />
    // }
  }, []);

  const handleSignIn = () => {
    navigation("/main");
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      height: '95vh',
    }}>
      <Box sx={{ width: '400px' }}>
        <div className="header">
          <div className="text"></div>
          <div className="underline"></div>
        </div>
        <Stack direction={'row'} gap={'8px'} alignItems={'center'} margin={'8px'} width={'100%'} >
          <PersonOutlinedIcon />
          <TextField variant="outlined" sx={{ width: '100%' }} />
        </Stack>
        <Stack direction={'row'} gap={'8px'} alignItems={'center'} margin={'8px'} width={'100%'} >
          <PasswordOutlinedIcon />
          <TextField className='input' variant="outlined" type='password' sx={{ width: '100%' }} />
        </Stack>
        <Stack direction={'row'} gap={'8px'} alignItems={'center'} margin={'8px'} width={'100%'} justifyContent={'flex-end'}>
          <Button variant="outlined" sx={{ width: '120px' }} onClick={()=>handleSignIn()}>Вход</Button>
        </Stack>
      </Box>
    </Box>
    // <ThemeProvider theme={theme}>
    //   <CssBaseline />
    //   <Container component="main" maxWidth="md">
    //     <Grid container spacing={2} style={{ minHeight: '100vh' }}>
    //       <Grid
    //         item
    //         xs={12}
    //         sm={6}
    //         container
    //         direction="column"
    //         justifyContent="center"
    //         alignItems="center"
    //       >
    //         <Box
    //           display="flex"
    //           flexDirection="column"
    //           alignItems="center"
    //           padding={matches ? 8 : 2}
    //         >
    //           <Typography component="h1" variant="h5">
    //             Вход
    //           </Typography>
    //           <form noValidate style={{ width: '100%', marginTop: theme.spacing(1) }}>
    //             <TextField
    //               variant="outlined"
    //               margin="normal"
    //               required
    //               fullWidth
    //               id="email"
    //               label="Логин"
    //               name="email"
    //               value="test@test.kz"
    //               autoComplete="email"
    //               autoFocus
    //             />
    //             <TextField
    //               variant="outlined"
    //               margin="normal"
    //               required
    //               fullWidth
    //               name="password"
    //               value="test@test.kz"
    //               label="Пароль"
    //               type="password"
    //               id="password"
    //               autoComplete="current-password"
    //             />
    //             <Button
    //               // type="submit"
    //               fullWidth
    //               variant="contained"
    //               color="primary"
    //               style={{ margin: theme.spacing(3, 0, 2) }}
    //               onClick={()=>handleSignIn()}
    //             >
    //               Войти
    //             </Button>
    //           </form>
    //         </Box>
    //       </Grid>
    //       <Grid
    //         item
    //         xs={12}
    //         sm={6}
    //         style={{
    //           backgroundImage: 'url(https://source.unsplash.com/random)',
    //           backgroundRepeat: 'no-repeat',
    //           backgroundSize: 'cover',
    //           backgroundPosition: 'center',
    //         }}
    //       />
    //     </Grid>
    //   </Container>
    // </ThemeProvider>
  )
}
