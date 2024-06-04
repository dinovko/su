import React from 'react'
import { Box, FormGroup, FormControlLabel, Toolbar, IconButton, Typography, Menu, MenuItem, Switch, AppBar, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import { logout, selectAccount } from 'features/account/accountSlice';
import { IMenu } from 'types';
import { useNavigate } from 'react-router-dom';

const pages: IMenu[] = [
    { title: 'Пользователи', navUrl: '/users' },
    { title: 'Като', navUrl: '/refs/kato', },
    { title: 'Формы', navUrl: '/reports' },
];
export const MainBar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const acc = useAppSelector(selectAccount);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorElRefs, setAnchorElRefs] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElRefs(event.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorElRefs(null);
    }

    const handleNavigate = (page:IMenu) => {
        navigate(page.navUrl!)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        [Заголовок сайта]
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.navUrl}
                                onClick={()=>handleNavigate(page)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.title}
                            </Button>
                        ))}
                        {/* {pages && (<Menu
                            id="menu-appbar"
                            anchorEl={anchorElRefs}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElRefs)}
                            onClose={handleCloseMenu}
                        >
                            <MenuItem onClick={handleCloseMenu}>Като</MenuItem>
                            <MenuItem onClick={handleCloseMenu}>Адреса</MenuItem>
                        </Menu>)} */}
                    </Box>
                    {acc.isAuth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={() => dispatch(logout(true))}>Выход</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}
