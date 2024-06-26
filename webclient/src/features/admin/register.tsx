import { Box, Stack, TextField, Button, useMediaQuery, ThemeProvider, Container, CssBaseline, Avatar, Typography, Grid, FormControlLabel, Checkbox, useTheme, SelectChangeEvent, FormControl, InputLabel, Select, Chip, MenuItem, OutlinedInput, Theme, Autocomplete } from '@mui/material'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHook';
import { useLocation, useNavigate, Navigate, Link } from 'react-router-dom';
import { decodeJwtToken, isExpired } from '../../utils/tokenUtils';
//import { fetchSignIn, selectAccount } from './accountSlice';
import { IRole, ISignInDTO, ISignUpDTO } from '../../types';
import { fetchSignIn, selectAccount } from '../../features/account/accountSlice';
import { Copyright } from '@mui/icons-material';
import { fetchRolesList, fetchSignUp, selectAdmin, selectRoles } from './adminSlice';
import ax from '../../utils/axios';
import React from 'react';


export const Register = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  useEffect(()=>{dispatch(fetchRolesList())}, [])
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
  const adminRoles = useAppSelector(selectRoles);
  const [localRoles, setLocalRoles] = React.useState<IRole[]>([]);
 
  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { login, password, katoCode } = signUpDTO;    

    dispatch(fetchSignUp({ login, password, katoCode, roles: extractId(localRoles)}));
    //navigation("/main");
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

  const extractId = (list: IRole[]):number[] =>{    
    return list.map(x=>x.id)
  }

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
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="select-with-chips"
                options={adminRoles}
                getOptionLabel={(option) => option.label}
                value={localRoles}
                onChange={(event, newValue) => {
                  setLocalRoles(newValue);
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option.label}
                      {...getTagProps({ index })}
                      key={option.id}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select"
                    placeholder="Select options"
                  />
                )}
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
