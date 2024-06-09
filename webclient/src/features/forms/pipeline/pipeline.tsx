import React, { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/storeHook'
import { TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fab, Button } from '@mui/material';
import { IPipeline, IWaterSupplyForm, IWaterSupplyForm1, IWaterSupplyForm2 } from 'types';
import { CustomTextField } from 'components';
import { useParams } from 'react-router-dom';
import store from 'store/store';
import { fetchPipline, selectPipeline, selectPipelineSaved, updatePipelinePropByName, updatePipline } from './pipelineSlice';

const exclusions: Array<string> = ['id', 'formId', 'rperiodId', 'street', 'homeAddress'];

export const Pipeline = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    // const form = useAppSelector(selectSupplyForm) as IWaterSupplyForm[];
    const curForm = useAppSelector(selectPipeline) as IPipeline[];
    const saveEnabled = useAppSelector(selectPipelineSaved) as boolean;

    useEffect(() => {
        if (!id) return;
        dispatch(fetchPipline(id))
    }, [])

    /**
     * Обновление данных Формы 1
     * @param id ID supplyForm
     * @param prop nameOfProp
     * @param val valueOfProp
     */
    const handleChangePropByIdName = useCallback((id: any, prop: string, val: number) => {
        dispatch(updatePipelinePropByName({ id: id, key: prop, val: val }));
    }, []);

    const updateForm = useCallback(() => {
        if (!id) return;
        let getDirectFromStore = store.getState().pipe.data;
        dispatch(updatePipline({ id: id, payload: getDirectFromStore }))
    }, []);

    function filterFields(obj: any): IPipeline {
        return Object.keys(obj)
            .filter(key => !exclusions.includes(key))
            .reduce((obj2: any, key: string) => {
                obj2[key] = obj[key];
                return obj2;
            }, {});
    }

    const TableColItem: React.FC<IPipeline> = React.memo((row) => {
        const rows = Object.entries(filterFields(row)).map((item) => {
            return (<TableCell component="th" scope="row">
                <CustomTextField
                    key={`val-${row.id}`}
                    name={item[0]}
                    label=''
                    value={item[1]}
                    onChange={(v: any) => handleChangePropByIdName(row.id, item[0], v)}
                />
            </TableCell>)
        });
        console.info(rows);
        return <></>
    })

    const TableRowItem: React.FC<IPipeline> = React.memo((row) => {
        return (
            <TableRow
                key={row.id}>
                {/* <TableCell component="th" scope="row">
                    {row.street}
                </TableCell>
                <TableCell component="th" scope="row" align='left'>
                    {row.homeAddress}
                </TableCell> */}
                {TableColItem(row)}
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
                        <TableCell align="left">Охваченные централизованным водоснабжением (0-1)
                        </TableCell>
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