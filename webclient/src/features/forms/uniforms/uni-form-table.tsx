import React, { useState } from 'react'
import { IApprovedForm } from 'types';
import './uni-form-table.css'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
//import { format } from 'date-fns';
import { UniFormCreate } from './uni-form-create';

type UniFormTableProps = {
    onCreate: (e: any) => void;
    onEditRow: (id: string | undefined) => void;
    data: IApprovedForm[]
}
export const UniFormTable: React.FC<UniFormTableProps> = ({ data, onCreate, onEditRow }) => {
    const isDisabled = (compDate: any) => compDate == undefined ? false : true;
    const formattedDate = (dateString?: string) => !dateString ? "" : new Date(dateString).toLocaleDateString("ru-RU");
    const [openModal, setopenModal] = useState<boolean>(false);

    return (
        <React.Fragment>
            <UniFormCreate
                key={'UniFormCreate'}
                onSubmit={onCreate}
                open={openModal}
                onClose={() => setopenModal(false)} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <caption>
                        <Button
                            variant="outlined"
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            onClick={() => setopenModal(true)}
                        >
                            Создать
                        </Button>
                    </caption>
                    <TableHead>
                        <TableRow>
                            <TableCell>№</TableCell>
                            <TableCell align="right">Описание</TableCell>
                            <TableCell align="right">Дата утверждения</TableCell>
                            <TableCell align="right">Дата завершения</TableCell>
                            <TableCell align="right">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">{index + 1}</TableCell>
                                <TableCell align="right">{row?.description}</TableCell>
                                <TableCell align="right">{formattedDate(row?.approvalDate?.toString())}</TableCell>
                                <TableCell align="right">{formattedDate(row?.completionDate?.toString())}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="outlined"
                                        disabled={isDisabled(row.completionDate)}
                                        startIcon={<SummarizeOutlinedIcon />}
                                        onClick={() => onEditRow(row.id)}
                                    >
                                        просмотр
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}
