import React, { useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid, InputAdornment, TextField } from '@mui/material'
import { VirtualizedList } from 'components/virtualized-list';
import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import { fetchBuilding, fetchBuildingAdd, fetchStreet, fetchStreetAdd, selectRefBuildings, selectRefStreets } from './streetSlice';

type StreetFormProps = {
    katoId?: string;
}
export const StreetForm: React.FC<StreetFormProps> = ({ katoId }) => {
    const dispatch = useAppDispatch();
    const streetsList = useAppSelector(selectRefStreets);
    const addressesList = useAppSelector(selectRefBuildings);

    const [street, setstreet] = React.useState('');
    const [address, setaddress] = React.useState('');
    const [streetId, setstreetId] = React.useState(0);

    useEffect(() => {
        if (!katoId) return;
        dispatch(fetchStreet(Number.parseInt(katoId)));
    }, [, katoId])

    const handleChangeStreet = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.info(e.target.value)
        setstreet(e.target.value)
    }

    const handleAddStreet = () => {
        if (!katoId) return;
        dispatch(fetchStreetAdd({ refKatoId: Number.parseInt(katoId), nameRu: street })).then(() => {
            dispatch(fetchStreet(Number.parseInt(katoId)));
        })
    }

    useEffect(() => {
        if (streetId == 0) return;
        dispatch(fetchBuilding(streetId))
        console.info('loading addresses');
    }, [streetId])

    const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.info(e.target.value)
        setaddress(e.target.value)
    }

    const handleAddAddress = () => {
        if (!katoId) return;
        dispatch(fetchBuildingAdd({ refStreetId: streetId, nameRu: address, building: address })).then(() => {
            dispatch(fetchBuilding(streetId));
        })
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth id="outlined-basic"
                        label="Название улицы"
                        variant="outlined"
                        value={street}
                        onChange={handleChangeStreet}
                        InputProps={{
                            endAdornment: <InputAdornment
                                position="start">
                                <Button
                                    disabled={street.length == 0}
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={handleAddStreet}>
                                    Добавить
                                </Button></InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth id="outlined-basic"
                        label="Адрес"
                        variant="outlined"
                        value={address}
                        onChange={handleChangeAddress}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">
                                <Button
                                    disabled={address.length == 0 || streetId == 0}
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={handleAddAddress}>
                                    Добавить
                                </Button></InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    улицы
                    <VirtualizedList key={'streets-list'} items={streetsList || []} onSelectItem={setstreetId} streetName={null} />
                </Grid>
                <Grid item xs={6}>
                    адреса
                    <VirtualizedList key={'addresses-list'} items={addressesList || []} onSelectItem={() => { }} streetName={streetsList.find(x => x.id == streetId)?.nameRu} />
                </Grid>
            </Grid>
        </Box>
    )
}
