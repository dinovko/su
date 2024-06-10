import React, { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/storeHook'
import { TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fab, Button } from '@mui/material';
import { IWaterSupplyForm, IWaterSupplyForm1, IWaterSupplyForm2 } from 'types';
import { CustomTextField } from 'components';
import { useParams } from 'react-router-dom';
import store from 'store/store';
import { fetchForm2, selectSupplyForm2, selectSupplyForm2Saved, selectSupplyForm2StreetLevel, selectSupplyForm2Village, updateForm2, updateForm2PropByName } from './supplyForm2Slice';

export const SupplyForm2 = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    // const form = useAppSelector(selectSupplyForm) as IWaterSupplyForm[];
    const curForm = useAppSelector(selectSupplyForm2) as IWaterSupplyForm2[];
    const saveEnabled = useAppSelector(selectSupplyForm2Saved) as boolean;
    const isStreetLevel = useAppSelector(selectSupplyForm2StreetLevel) as boolean;
    const isVillage = useAppSelector(selectSupplyForm2Village) as boolean;

    useEffect(() => {
        if (!id) return;
        dispatch(fetchForm2(id))
    }, [])

    /**
     * Обновление данных Формы 1
     * @param id ID supplyForm
     * @param prop nameOfProp
     * @param val valueOfProp
     */
    const handleChangePropByIdName = useCallback((id: any, prop: string, val: number) => {
        dispatch(updateForm2PropByName({ id: id, key: prop, val: val }));
    }, []);

    const updateForm = useCallback(() => {
        if (!id) return;
        let getDirectFromStore = store.getState().supplyForm2.data;
        dispatch(updateForm2({ id: id, payload: getDirectFromStore }))
    }, [])



    const TableRowItem: React.FC<IWaterSupplyForm2> = React.memo((row) => {
        return (
            <TableRow
                key={row.id}>
                {isStreetLevel && <TableCell component="th" scope="row">
                    {row.street}
                </TableCell>}
                {isStreetLevel && <TableCell component="th" scope="row" align='left'>
                    {row.homeAddress}
                </TableCell>}
                {!isVillage && <TableCell component="th" scope="row">
                    <CustomTextField
                        key={`val-${row.id}`}
                        name='coverageWater'
                        label=''
                        value={row.coverageWater}
                        onChange={(v: any) => handleChangePropByIdName(row.id, 'coverageWater', v)}
                    />
                </TableCell>}
                {!isVillage && <TableCell component="th" scope="row">
                    <CustomTextField
                        key={`val-${row.id}`}
                        name='centralizedWaterNumber'
                        label=''
                        value={row.centralizedWaterNumber}
                        onChange={(v: any) => handleChangePropByIdName(row.id, 'centralizedWaterNumber', v)}
                    />
                </TableCell>}
            </TableRow>)
    })


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {/* <TableCell>№</TableCell> */}
                        {isStreetLevel && <TableCell>Наименование улиц</TableCell>}
                        {isStreetLevel && <TableCell align="left">Адрес дома</TableCell>}
                        {!isVillage && <TableCell align="left">Охваченные централизованным водоснабжением (0-1)
                        </TableCell>}
                        <TableCell align="left">Количество населения имеющих доступ к  централизованному водоснабжению (человек)
                            {" "}
                            <Button disabled={saveEnabled} onClick={updateForm} variant="outlined">Сохранить</Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {curForm && curForm.map((row, index) => (<TableRowItem key={`f2-row-${index}`} {...row} />))}
                </TableBody>
            </Table>
        </TableContainer >
    )
}