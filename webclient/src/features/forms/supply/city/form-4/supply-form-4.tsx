import React, { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/storeHook'
import { TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fab, Button } from '@mui/material';
import { IWaterSupplyForm, IWaterSupplyForm1, IWaterSupplyForm2, IWaterSupplyForm3, IWaterSupplyForm4 } from 'types';
import { CustomTextField } from 'components';
import { useParams } from 'react-router-dom';
import store from 'store/store';
import { fetchForm4, selectSupplyForm4, selectSupplyForm4Saved, updateForm4, updateForm4PropByName } from './supplyForm4Slice';

export const SupplyForm4 = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const curForm = useAppSelector(selectSupplyForm4) as IWaterSupplyForm4[];
    const saveEnabled = useAppSelector(selectSupplyForm4Saved) as boolean;

    useEffect(() => {
        if (!id) return;
        dispatch(fetchForm4(id))
    }, [])

    /**
     * Обновление данных Формы 1
     * @param id ID supplyForm
     * @param prop nameOfProp
     * @param val valueOfProp
     */
    const handleChangePropByIdName = useCallback((id: any, prop: string, val: number) => {
        dispatch(updateForm4PropByName({ id: id, key: prop, val: val }));
    }, []);

    const updateForm = useCallback(() => {
        if (!id) return;
        let getDirectFromStore = store.getState().supplyForm4.data;
        dispatch(updateForm4({ id: id, payload: getDirectFromStore }))
    }, [])

    // const rowValue = (formId?: any) => {
    //     let row = curForm.find(x => x.formId == formId) || null;
    //     return row;
    // };

    const TableRowItem: React.FC<IWaterSupplyForm4> = React.memo((row) => {
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
                        name='coverageHouseholdNeedNumberBuildings'
                        label=''
                        value={row.coverageHouseholdNeedNumberBuildings}
                        onChange={(v: any) => handleChangePropByIdName(row.id, 'coverageHouseholdNeedNumberBuildings', v)}
                    />
                </TableCell>
                <TableCell component="th" scope="row">
                    <CustomTextField
                        key={`val-${row.id}`}
                        name='coverageHouseholdInstalledBuildings'
                        label=''
                        value={row.coverageHouseholdInstalledBuildings}
                        onChange={(v: any) => handleChangePropByIdName(row.id, 'coverageHouseholdInstalledBuildings', v)}
                    />
                </TableCell>
                <TableCell component="th" scope="row">
                    <CustomTextField
                        key={`val-${row.id}`}
                        name='coverageHouseholdInstalledCount'
                        label=''
                        value={row.coverageHouseholdInstalledCount}
                        onChange={(v: any) => handleChangePropByIdName(row.id, 'coverageHouseholdInstalledCount', v)}
                    />
                </TableCell>
                <TableCell component="th" scope="row">
                    <CustomTextField
                        key={`val-${row.id}`}
                        name='coverageHouseholdRemoteData'
                        label=''
                        value={row.coverageHouseholdRemoteData}
                        onChange={(v: any) => handleChangePropByIdName(row.id, 'coverageHouseholdRemoteData', v)}
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
                        <TableCell align="left">Количество зданий и сооружений, подлежащих к установке общедомовых приборов учета (единиц)</TableCell>
                        <TableCell align="left">Количество зданий и сооружений с установленными общедомовыми приборами учета (единиц)</TableCell>
                        <TableCell align="left">Количество установленных общедомовых приборов учета (единиц)</TableCell>
                        <TableCell align="left">в том числе с дистанционной передачей данных в АСУЭ обслуживающего предприятия (единиц)
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