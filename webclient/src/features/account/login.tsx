import { Box, Stack, TextField, Button, useMediaQuery } from '@mui/material'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHook';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { theme } from '../../theme';
import { decodeJwtToken, isExpired } from '../../utils/tokenUtils';
import { fetchSignIn, selectAccount } from './accountSlice';
import { ISignInDTO } from '../../types';
import React from 'react';

export const Login = () => {
  const dispatch = useAppDispatch();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const location = useLocation();
  const navigation = useNavigate();
  const acc = useAppSelector(selectAccount);
  const [signInDTO, setsignInDTO] = useState<ISignInDTO>({
    login: 'suadmin@su.qz',
    pwd: 'suadmin@su.qz',
    rem: false,
  })

  useEffect(() => {
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
  }, []);

  const handleSignIn = () => {
    const { login, pwd, rem } = signInDTO;
    dispatch(fetchSignIn({ login, pwd, rem }));
    navigation("/main");
  }

  const handleChangeInput = (e: any) => {
    setsignInDTO({
      ...signInDTO,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Box sx={{ width: '400px' }}>
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
          value={signInDTO.login}
          onChange={(e: any) => handleChangeInput(e)}
        />
      </Stack>
      <Stack direction={'row'} gap={'8px'} alignItems={'center'} margin={'8px'} width={'100%'} >
        <PasswordOutlinedIcon />
        <TextField
          id="pwd"
          name="pwd"
          className='input'
          variant="outlined"
          type='password'
          sx={{ width: '100%' }}
          value={signInDTO.pwd}
          onChange={(e: any) => handleChangeInput(e)}
        />
      </Stack>
      <Stack direction={'row'} gap={'8px'} alignItems={'center'} margin={'8px'} width={'100%'} justifyContent={'flex-end'}>
        <Button variant="outlined" sx={{ width: '120px' }} onClick={() => handleSignIn()}>Вход</Button>
      </Stack>
    </Box>
  )
}
