import { useAppDispatch, useAppSelector } from 'hooks/storeHook'
import { reportsAdd, reportsGetAll, selectReports, setReports } from './reportsSlice';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Fab, Button, Box, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { ModalDialog, ReportPeriod } from 'components';
import { useEffect, useState } from 'react';
import { IFormPeriod } from 'types';
import { useNavigate } from 'react-router-dom';
import { checkIsReportable } from 'features/refs/katoSlice';
import { PayloadAction } from '@reduxjs/toolkit';

type ReportsListProps = {
    katoID: number,
}
export const ReportsList: React.FC<ReportsListProps> = ({ katoID }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const reports = useAppSelector(selectReports);
    const [open, setopen] = useState(false);
    const [isReportable, setisReportable] = useState(false);

    const handleLoadReports = () => {
        // navigate(`/reports/${katoID}`)
        dispatch(reportsGetAll(katoID))
    }

    const handleOpenReportPeriod = () => {
        setopen(true);
    }

    const handleAddReport = (p: IFormPeriod) => {
        dispatch(reportsAdd({
            refKatoId: katoID,
            reportYearId: p.year,
            reportMonthId: p.month,
            desctiption: `новый отчет като ид;${katoID}`,
            supplierId: 0,
        })).then(() => {
            setopen(false);
            handleLoadReports();
        });
    }

    const handleOpenForm = (id: string) => {
        console.info('open report', id);
        navigate(`/form/${katoID}/${id}`)
    }

    useEffect(() => {
        if (reports.length > 0) {
            dispatch(setReports([]));
        }
        if(katoID && katoID!=0) {
            dispatch(checkIsReportable(katoID)).then((resp:any)=>{
                setisReportable(resp.payload as boolean);
            });
        }
    }, [katoID])

    return (
        <Box sx={{ marginTop: '8px' }}>
            <ModalDialog title='' children={<ReportPeriod key={'report-period'} onSetPeriod={(v) => handleAddReport(v)} />} open={open} key={'new-form-modal'} onClose={() => setopen(false)} />
            <Stack alignItems={'flex-end'} sx={{ margin: '8px' }}>
                {isReportable && <Button disabled={katoID == 0} variant="outlined" startIcon={<AddIcon />} onClick={() => handleOpenReportPeriod()}>
                    Добавить отчет
                </Button>}
            </Stack>
            <TableContainer component={Paper} sx={{ width: '100%', height: '100%' }}>
                <Table sx={{ minWidth: 650, width: '100%' }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Год</TableCell>
                            <TableCell align="right">месяц</TableCell>
                            <TableCell align="right">статус</TableCell>
                            <TableCell align="right">редактировать</TableCell>
                            <TableCell align="right">Водоснабжение</TableCell>
                            <TableCell align="right">Водоотведение</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reports.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onDoubleClick={() => handleOpenForm(row.id)}
                            >
                                <TableCell component="th" scope="row">
                                    {row.year}
                                </TableCell>
                                <TableCell align="right">{row.monthName}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">редактировать</TableCell>
                                <TableCell align="right"><Button variant="contained"
                                    endIcon={<OpenInNewOutlinedIcon />}
                                    onClick={() => handleOpenForm(row.id)}>
                                    открыть
                                </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="contained"
                                        disabled={true}
                                        endIcon={<OpenInNewOutlinedIcon />}>
                                        открыть
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {reports.length == 0 &&
                (<Button disabled={katoID == 0 || isReportable == false} variant="contained" endIcon={<ArticleOutlinedIcon />} sx={{ margin: '16px' }} onClick={handleLoadReports}>
                    загрузить отчеты
                </Button>)}
        </Box>
    )
}
