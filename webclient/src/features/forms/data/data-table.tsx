import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import React, { useEffect } from 'react'
import { IData } from 'types';
import { fetchData, fetchDataHeader, selectTabSync, selectTabTable, selectTabTableHeader, update, updateData } from './dataSlice';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Box } from '@mui/material';
import { InputComponent } from './input-component';
import store from 'store/store';

type DataTableProps = {
    tabid: string;
    // onUpdate: (data: Array<Array<IData>>) => void;
}
export const DataTable: React.FC<DataTableProps> = ({ tabid }) => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(selectTabTable);
    const headers = useAppSelector(selectTabTableHeader);
    console.info('data', data);

    const reload = () => {
        dispatch(fetchData(tabid));
        dispatch(fetchDataHeader(tabid));
    }

    useEffect(() => { reload(); }, [tabid]);

    const onChangeInputComponent = (e: any) => {
        dispatch(update({ id: e['id'], valueJson: e['val'] }));
    }

    const handleSave = () => {
        let dataFromStore = store.getState().data.data;
        valueJsonToString(dataFromStore).then((resp) => {
            dispatch(updateData(resp));
        })
    }

    const valueJsonToString = (data: Array<IData>): Promise<IData[]> => {
        return new Promise((resolve, reject) => {
            let newData: Array<IData> = [];
            data.map((item) => {
                newData.push({ ...item, valueJson: String(item.valueJson) });
            });
            resolve(newData);
        })
    }

    return (
        <TableContainer component={Paper}>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', margin: '16px 0' }}>
                <Button variant="outlined" color='success' onClick={handleSave}>Сохранить</Button>
            </Box>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers && headers.map((tc, index) => (
                            <TableCell key={index} width={'50px'} sx={{ maxWidth: '50px' }}>{tc.thRu}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        {data && data.map((col, index) => (
                            <TableCell style={{ width: '30px', maxWidth: '30px' }} component="th" scope="row" key={index}>
                                <InputComponent key={index} id={col.id} val={col.valueJson} vtype={col.valueType} onChange={onChangeInputComponent} />
                            </TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer >
    )
}
