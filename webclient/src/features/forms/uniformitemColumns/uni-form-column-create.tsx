import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import React, { useEffect } from 'react'
import { selectUniformItem } from '../uniformitems/uniformitemSlice';
import { addApprovedFormItemColumn, fetchApprovedFormItemColumn, selectUniformCols } from './uniformitemColumnsSlice';
import { ComponentByType } from './component-by-type';
import { generateGUID } from 'utils/uuid';
import { useNavigate } from 'react-router-dom';
import { TableContainer, Paper, Table, Button, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';

type UniFormColumnCreateProps = {
    id: string;
}
export const UniFormColumnCreate: React.FC<UniFormColumnCreateProps> = ({ id }) => {
    const dispatch = useAppDispatch();
    const navigation = useNavigate();
    const uniformCol = useAppSelector(selectUniformCols);
    const reload = () => {
        if (!id) return;
        dispatch(fetchApprovedFormItemColumn(id));
    }
    useEffect(() => {
        reload();
    }, [, id]);

    const handleAddRow = () => {
        dispatch(addApprovedFormItemColumn({
            id: generateGUID(),
            approvedFormItemId: id,
            dataType: 2,
            thRu: "Новое поле",
            thKk: "Новое поле",
            displayOrder: uniformCol.length == 0 ? 0 : (uniformCol.length),
        }))
            .then(() => {
                setTimeout(() => {
                    reload();
                    window.location.reload();
                }, 1000);
            });
    }

    const handleCloseEdit = () => {
        navigation("/uniform/view", { replace: true });
    }
    return (
        <React.Fragment>
            {/* <button onClick={() => handleCloseEdit()}>Закрыть</button> */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: '16px' }}>
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<CloseOutlinedIcon />}
                    onClick={() => handleCloseEdit()}
                >
                    Закрыть
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <caption>
                        {/* <Button
                            variant="outlined"
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            onClick={()=>setopenModal(true)}
                            >
                            Создать
                            </Button> */}
                    </caption>
                    <TableHead>
                        <TableRow>
                            <TableCell>№</TableCell>
                            <TableCell align="right">Название</TableCell>
                            <TableCell align="right">Предпросмотр</TableCell>
                            <TableCell align="right">Тип данных</TableCell>
                            <TableCell align="right">
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<LibraryAddOutlinedIcon />}
                                    onClick={() => handleAddRow()}
                                >
                                    Добавить строку
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {uniformCol && uniformCol.map((col, index) => (<ComponentByType key={index} col={col} />))}
                        {/* <TableRow key={row.id}>
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
                        ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}
