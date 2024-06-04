import React, { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/storeHook'
import { TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fab, Button } from '@mui/material';
import { IWaterSupplyForm, IWaterSupplyForm1, IWaterSupplyForm2, IWaterSupplyForm3, IWaterSupplyForm4, IWaterSupplyForm5 } from 'types';
import { CustomTextField } from 'components';
import { useParams } from 'react-router-dom';
import store from 'store/store';
import { fetchForm5, selectSupplyForm5, selectSupplyForm5Saved, updateForm5, updateForm5PropByName } from './supplyForm5Slice';

export const SupplyForm5 = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const curForm = useAppSelector(selectSupplyForm5) as IWaterSupplyForm5[];
    const saveEnabled = useAppSelector(selectSupplyForm5Saved) as boolean;

    useEffect(() => {
        if (!id) return;
        dispatch(fetchForm5(id))
    }, [])

    /**
     * Обновление данных Формы 1
     * @param id ID supplyForm
     * @param prop nameOfProp
     * @param val valueOfProp
     */
    const handleChangePropByIdName = useCallback((id: any, prop: string, val: number) => {
        dispatch(updateForm5PropByName({ id: id, key: prop, val: val }));
    }, []);

    const updateForm = useCallback(() => {
        if (!id) return;
        let getDirectFromStore = store.getState().supplyForm5.data;
        dispatch(updateForm5({ id: id, payload: getDirectFromStore }))
    }, [])

    // const rowValue = (formId?: any) => {
    //     let row = curForm.find(x => x.formId == formId) || null;
    //     return row;
    // };

    const TableRowItem: React.FC<IWaterSupplyForm5> = React.memo((row) => {
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
                        name='scadaWaterIntake'
                        label=''
                        value={row.scadaWaterIntake}
                        onChange={(v: any) => handleChangePropByIdName(row.id, 'scadaWaterIntake', v)}
                    />
                </TableCell>
                <TableCell component="th" scope="row">
                    <CustomTextField
                        key={`val-${row.id}`}
                        name='scadaWaterTreatment'
                        label=''
                        value={row.scadaWaterTreatment}
                        onChange={(v: any) => handleChangePropByIdName(row.id, 'scadaWaterTreatment', v)}
                    />
                </TableCell>
                <TableCell component="th" scope="row">
                    <CustomTextField
                        key={`val-${row.id}`}
                        name='scadaStations'
                        label=''
                        value={row.scadaStations}
                        onChange={(v: any) => handleChangePropByIdName(row.id, 'scadaStations', v)}
                    />
                </TableCell>
                <TableCell component="th" scope="row">
                    <CustomTextField
                        key={`val-${row.id}`}
                        name='scadaSupplyNetworks'
                        label=''
                        value={row.scadaSupplyNetworks}
                        onChange={(v: any) => handleChangePropByIdName(row.id, 'scadaSupplyNetworks', v)}
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
                        <TableCell align="left">Водозабор (0 или 1)</TableCell>
                        <TableCell align="left">Водоподготовка (0 или 1)</TableCell>
                        <TableCell align="left">Насосные станции (0 или 1)</TableCell>
                        <TableCell align="left">Сети водоснабжения (0 или 1)
                            {" "}
                            <Button disabled={saveEnabled} onClick={updateForm} variant="outlined">Сохранить</Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {curForm && curForm.map((row, index) => (<TableRowItem key={`f4-row-${index}`} {...row} />))}
                </TableBody>
            </Table>
        </TableContainer >
    )
}