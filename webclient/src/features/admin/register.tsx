import { Box, Stack, TextField, Button, useMediaQuery, ThemeProvider, Container, CssBaseline, Avatar, Typography, Grid, FormControlLabel, Checkbox } from '@mui/material'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHook';
import { useLocation, useNavigate, Navigate, Link } from 'react-router-dom';
import { theme } from '../../theme';
import { decodeJwtToken, isExpired } from '../../utils/tokenUtils';
//import { fetchSignIn, selectAccount } from './accountSlice';
import { IRole, ISignInDTO, ISignUpDTO } from '../../types';
import { fetchSignIn, selectAccount } from '../../features/account/accountSlice';
import { Copyright } from '@mui/icons-material';
import { fetchSignUp, selectAdmin } from './adminSlice';
import ax from '../../utils/axios';
import React from 'react';

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

  const fetchRolesList = async () => {
    try {
      const response = await ax.get<IRole>('/Refs/GetRefList');
      const roles = response.data;
      // Handle the rolesList data here
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error('Error fetching roles list:', error);
    }
  };
  
  fetchRolesList();

  const handleSignUp = () => {
    const { login, password, katoCode, roles } = signUpDTO;
    
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
  )
}
