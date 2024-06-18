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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

/* const options:IRole[] =  [
  {
    id: 1,
    label: "USER_ADMIN"
  },
  {
    id: 2,
    label: "SUPER_ADMIN"
  },
  {
    id: 3,
    label: "user_akimat_worker"
  }
] */

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


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
  console.table(adminRoles)
  const [localRoles, setLocalRoles] = React.useState<IRole[]>([]);
 

  /* const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  }; */

  
  
  

  const handleSignUp = () => {
    console.log(localRoles)
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
            {/* <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
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
