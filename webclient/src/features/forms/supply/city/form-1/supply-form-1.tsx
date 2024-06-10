import React, { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/storeHook'
import { TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fab, Button } from '@mui/material';
import { IWaterSupplyForm, IWaterSupplyForm1 } from 'types';
import { addForm1, fetchForm1, selectSupplyForm1, selectSupplyForm1Saved, selectSupplyForm1StreetLevel, updateForm1, updateForm1PropByName } from './supplyForm1Slice';
// import { RPeriod } from 'features/refs/reporting-period';
// import { WTableCell } from './supply-form-1-style';
import { CustomTextField } from 'components';
import { useParams } from 'react-router-dom';
import store from 'store/store';

export const SupplyForm1 = () => {
    const dispatch = useAppDispatch();
    const { id, kato } = useParams();
    // const form = useAppSelector(selectSupplyForm) as IWaterSupplyForm[];
    const curForm = useAppSelector(selectSupplyForm1) as IWaterSupplyForm1[];
    const saveEnabled = useAppSelector(selectSupplyForm1Saved) as boolean;
    const streetLevel = useAppSelector(selectSupplyForm1StreetLevel) as boolean;

    useEffect(() => {
        if (!id) return;
        dispatch(fetchForm1(id))
    }, [])

    /**
     * Обновление данных Формы 1
     * @param id ID supplyForm
     * @param prop nameOfProp
     * @param val valueOfProp
     */
    const handleChangePropByIdName = useCallback((id: any, prop: string, val: number) => {
        dispatch(updateForm1PropByName({ id: id, key: prop, val: val }));
    }, []);

    const updateForm = useCallback(() => {
        if (!id) return;
        let getDirectFromStore = store.getState().supplyForm1.data;
        dispatch(updateForm1({ id: id, payload: getDirectFromStore })).then(()=>{

        })
    }, []);

    const TableRowItem: React.FC<IWaterSupplyForm1> = React.memo((row) => {
        return (
            <TableRow
                key={row.id}>
                {streetLevel && <TableCell component="th" scope="row">
                    {row.street}
                </TableCell>}
                {streetLevel && <TableCell component="th" scope="row" align='left'>
                    {row.homeAddress}
                </TableCell>}
                <TableCell component="th" scope="row">
                    <CustomTextField
                        key={`val-${row.id}`}
                        name='volume'
                        label='объем'
                        value={row.volume}
                        onChange={(v: any) => handleChangePropByIdName(row.id, 'volume', v)}
                    />
                </TableCell>
            </TableRow>)
    }, (prevProps, newxProps) => {
        return prevProps.volume !== newxProps.volume;
    })


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {/* <TableCell>№</TableCell> */}
                        {streetLevel && <TableCell>Наименование улиц</TableCell>}
                        {streetLevel && <TableCell align="left">Адрес дома</TableCell>}
                        <TableCell align="left">Количество снабжаемой воды{" "}
                            <Button disabled={saveEnabled} onClick={updateForm} variant="outlined">Сохранить</Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {curForm && curForm.map((row, index) => (<TableRowItem key={`f1-row-${index}`} {...row} />))}
                </TableBody>
            </Table>
        </TableContainer >
    )
}