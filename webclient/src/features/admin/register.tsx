import { Box, Stack, TextField, Button, useMediaQuery, ThemeProvider, Container, CssBaseline, Avatar, Typography, Grid, FormControlLabel, Checkbox } from '@mui/material'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import { useLocation, useNavigate, Navigate, Link } from 'react-router-dom';
import { theme } from 'theme';
import { decodeJwtToken, isExpired } from 'utils/tokenUtils';
//import { fetchSignIn, selectAccount } from './accountSlice';
import { IRole, ISignInDTO, ISignUpDTO } from 'types';
import { fetchSignIn, selectAccount } from 'features/account/accountSlice';
import { Copyright } from '@mui/icons-material';
import { fetchSignUp, selectAdmin } from './adminSlice';
import ax from 'utils/axios';

export const Register = () => {
  const dispatch = useAppDispatch();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const location = useLocation();
  const navigation = useNavigate();
  const adm = useAppSelector(selectAdmin);
  const [signUpDTO, setsignUpDTO] = useState<ISignUpDTO>({
    login: '',
    katoCode: 0,
    password: '',
    roles: []
  })
  const rolesList = ax.get<IRole>('/Refs/GetRefList');

  /* useEffect(() => {
    console.info('acc.isAuth', acc.isAuth)
    if (acc.isAuth) {
      let tokenExp = null;
      let jwtFromSessionStorage = sessionStorage.getItem('X-TOKEN');
      console.info('jwtFromSessionStorage', jwtFromSessionStorage)
      if (jwtFromSessionStorage) {
        tokenExp = decodeJwtToken(jwtFromSessionStorage);
        if (tokenExp) {
          console.info('!isExpired(tokenExp.exp)', isExpired(tokenExp.exp))
        }
      }
      navigation("/reports", { replace: true });
      // <Navigate to="/reports" state={{ from: location }} replace />
    }
  }, []); */

  const handleSignUp = () => {
    const { login, password, katoCode } = signUpDTO;
    const roles = [{id: 1, label: 'Базовая роль'},{id: 1, label: 'Базовая роль'}]
    /* console.log(login) */
    dispatch(fetchSignUp({ login, password, katoCode, roles}));
    navigation("/main");
  }

  const handleChangeInput = (e: any) => {
    setsignUpDTO({
      ...signUpDTO,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };

  return (    
    
     <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="login"
                name="login"
                required
                fullWidth
                id="login"
                label="Логин"
                autoFocus
                onChange={(e: any) => handleChangeInput(e)}
              />
            </Grid>            
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="katoCode"
                label="КАТО"
                name="katoCode"
                autoComplete="katoCode"
                type="number"
                onChange={(e: any) => handleChangeInput(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e: any) => handleChangeInput(e)}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Регистрация
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>     
      /* <Box sx={{ width: '400px' }}>
      <div className="header">
        <div className="text"></div>
        <div className="underline"></div>
      </div>
      <Stack direction={'row'} gap={'8px'} alignItems={'center'} margin={'8px'} width={'100%'} >
        <PersonOutlinedIcon />
        <TextField
          id="login"
          name="login"
          variant="outlined"
          sx={{ width: '100%' }}
          onChange={(e: any) => handleChangeInput(e)}
        />
      </Stack>
      <Stack direction={'row'} gap={'8px'} alignItems={'center'} margin={'8px'} width={'100%'} >
        <PasswordOutlinedIcon />
        <TextField
          id="password"
          name="password"
          className='input'
          variant="outlined"
          type='password'
          sx={{ width: '100%' }}
          onChange={(e: any) => handleChangeInput(e)}
        />
      </Stack>
      <Stack direction={'row'} gap={'8px'} alignItems={'center'} margin={'8px'} width={'100%'} >
        <PersonOutlinedIcon />
        <TextField
          id="katoCode"
          name="katoCode"
          variant="outlined"
          sx={{ width: '100%' }}
          type='number'
          onChange={(e: any) => handleChangeInput(e)}
        />
      </Stack>
      <Stack direction={'row'} gap={'8px'} alignItems={'center'} margin={'8px'} width={'100%'} justifyContent={'flex-end'}>
        <Button variant="outlined" sx={{ width: '120px' }} onClick={() => handleSignUp()}>Вход</Button>
      </Stack>
    </Box> */
  )
}
