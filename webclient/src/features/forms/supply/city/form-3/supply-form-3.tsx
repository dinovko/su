import React, { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/storeHook'
import { TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fab, Button } from '@mui/material';
import { IWaterSupplyForm, IWaterSupplyForm1, IWaterSupplyForm2, IWaterSupplyForm3 } from 'types';
import { CustomTextField } from 'components';
import { useParams } from 'react-router-dom';
import store from 'store/store';
import { fetchForm3, selectSupplyForm3, selectSupplyForm3Saved, updateForm3, updateForm3PropByName } from './supplyForm3Slice';

export const SupplyForm3 = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const curForm = useAppSelector(selectSupplyForm3) as IWaterSupplyForm3[];
    const saveEnabled = useAppSelector(selectSupplyForm3Saved) as boolean;

    useEffect(() => {
        if (!id) return;
        dispatch(fetchForm3(id))
    }, [])

    /**
     * Обновление данных Формы 1
     * @param id ID supplyForm
     * @param prop nameOfProp
     * @param val valueOfProp
     */
    const handleChangePropByIdName = useCallback((id: any, prop: string, val: number) => {
        dispatch(updateForm3PropByName({ id: id, key: prop, val: val }));
    }, []);

    const updateForm = useCallback(() => {
        if (!id) return;
        let getDirectFromStore = store.getState().supplyForm3.data;
        dispatch(updateForm3({ id: id, payload: getDirectFromStore }))
    }, [])

    // const rowValue = (formId?: any) => {
    //     let row = curForm.find(x => x.formId == formId) || null;
    //     return row;
    // };

    const TableRowItem: React.FC<IWaterSupplyForm3> = React.memo((row) => {
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
                        name='coverageMetersTotalCumulative'
                        label=''
                        value={row.coverageMetersTotalCumulative}
                        onChange={(v: any) => handleChangePropByIdName(row.id, 'coverageMetersTotalCumulative', v)}
                    />
                </TableCell>
                <TableCell component="th" scope="row">
                    <CustomTextField
                        key={`val-${row.id}`}
                        name='coverageMetersRemoteData'
                        label=''
                        value={row.coverageMetersRemoteData}
                        onChange={(v: any) => handleChangePropByIdName(row.id, 'coverageMetersRemoteData', v)}
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
                        <TableCell align="left">всего с нарастающим (единиц)
                        </TableCell>
                        <TableCell align="left">в том числе с дистанционной передачей данных в АСУЭ обслуживающего предприятия (единиц)
                            {" "}
                            <Button disabled={saveEnabled} onClick={updateForm} variant="outlined">Сохранить</Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {curForm && curForm.map((row, index) => (<TableRowItem key={`f3-row-${index}`} {...row} />))}
                </TableBody>
            </Table>
        </TableContainer >
    )
}