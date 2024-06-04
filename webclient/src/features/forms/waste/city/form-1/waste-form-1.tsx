import React, { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/storeHook'
import { TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fab, Button } from '@mui/material';
import { IWaterSupplyForm, IWaterSupplyForm1, IWaterWasteForm1 } from 'types';
import { fetchWasteCityForm1, selectWasteCityForm1, selectWasteCityForm1Saved, updateForm1PropByName, updateWasteCityForm1 } from './wasteForm1Slice';
import { CustomTextField } from 'components';
import { useParams } from 'react-router-dom';
import store from 'store/store';

export const WasteForm1 = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    // const form = useAppSelector(selectSupplyForm) as IWaterSupplyForm[];
    const curForm = useAppSelector(selectWasteCityForm1) as IWaterWasteForm1[];
    const saveEnabled = useAppSelector(selectWasteCityForm1Saved) as boolean;

    useEffect(() => {
        if (!id) return;
        dispatch(fetchWasteCityForm1(id))
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
        let getDirectFromStore = store.getState().wasteForm1.data;
        dispatch(updateWasteCityForm1({ id: id, payload: getDirectFromStore }))
    }, [])

    // const rowValue = (formId?: any) => {
    //     let row = curForm.find(x => x.formId == formId) || null;
    //     return row;
    // };

    const TableRowItem: React.FC<IWaterWasteForm1> = React.memo((row) => {
        return (
            <TableRow
                key={row.id}>
                {/* <TableCell component="th" scope="row">
                    {row.no}
                </TableCell> */}
                <TableCell component="th" scope="row">
                    {row.street}
                </TableCell>
                <TableCell component="th" scope="row" align='left'>
                    {row.homeAddress}
                </TableCell>
                <TableCell component="th" scope="row">
                    <CustomTextField
                        key={`val-${row.id}`}
                        name='waterVolume'
                        label='объем'
                        value={row.waterVolume}
                        onChange={(v: any) => handleChangePropByIdName(row.id, 'waterVolume', v)}
                    />
                </TableCell>
            </TableRow>)
    })


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {/* <TableCell>№</TableCell> */}
                        <TableCell>Наименование улиц</TableCell>
                        <TableCell align="left">Адрес дома</TableCell>
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