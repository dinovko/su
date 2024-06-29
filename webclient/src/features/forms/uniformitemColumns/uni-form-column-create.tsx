import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React, { useEffect, useState } from 'react'
import { addApprovedFormItemColumn, addColumn, fetchApprovedFormItemColumn, selectUniformCols } from './uniformitemColumnsSlice';
import { ComponentByType, types } from './component-by-type';
import { generateGUID } from 'utils/uuid';
import { useNavigate } from 'react-router-dom';
import { TableContainer, Paper, Table, Button, TableHead, TableRow, TableCell, TableBody, Box, TextField, Checkbox, Accordion, AccordionDetails, AccordionSummary, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { IApprovedFormItemColumn } from 'types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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


    const handleCloseEdit = () => {
        navigation("/uniform/view", { replace: true });
    }

    const [newField, setnewField] = useState<IApprovedFormItemColumn | undefined>({
        id: generateGUID(),
        approvedFormItemId: id,
        dataType: 0,
        name: '',
        nameKk:'',
        nameRu:'',
        displayOrder: 1,
        nullable: false,
        length: 0,
        reportCode: '',
        layout: {
            id: generateGUID(),
            height: 0,
            width: 0,
            position: 'Inline',
            approvedFormItemColumnId: generateGUID(),
        }
    });
    const onChangeComponentType = (e: number) => {
        if (!e) return;
        if (!newField) return;
        setnewField({ ...newField, dataType: e })
    }
    const handleChangeNullable = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!newField) return;
        setnewField({ ...newField, nullable: e.target.checked })
    }
    const handleChangeLayoutPosition = (e: SelectChangeEvent<string>) => {
        if (!newField) return;
        let layout = {
            position: e.target.value,
            id: generateGUID(),
            height: 0,
            width: 0,
            approvedFormItemColumnId: generateGUID(),
        }
        setnewField({
            ...newField,
            layout: layout
        })
    }
    const handleAddColumn = () => {
        if (!newField) return;
        console.table(newField)
        dispatch(addApprovedFormItemColumn(newField)).then(() => {
            dispatch(addColumn(newField));
            resetForm();
        }).catch((er) => {

        });
        // dispatch(addColumn(newField));
    }
    const resetForm = () => {
        setTimeout(() => {
            setnewField({
                id: generateGUID(),
                approvedFormItemId: id,
                dataType: 0,
                name: '',
                nameKk:'',
                nameRu:'',
                displayOrder: 1,
                nullable: false,
                length: 0,
                reportCode: '',
                layout: {
                    id: generateGUID(),
                    height: 0,
                    width: 0,
                    position: 'Inline',
                    approvedFormItemColumnId: generateGUID(),
                }
            });
        }, 100);
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
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid black',
                margin: '8px',
                flexWrap: 'wrap',
                width: '97%'
            }}>
                <Box>
                    <TextField
                        variant='outlined'
                        id='name'
                        label='Название поля на казахском'
                        autoComplete='off'
                        value={newField?.nameKk}
                        onChange={(e) => setnewField({ ...newField!, nameKk: e.target.value })} 
                        sx={{marginRight:'16px'}}
                        />
                    <TextField
                        variant='outlined'
                        id='name'
                        label='Название поля на русском'
                        autoComplete='off'
                        value={newField?.nameRu}
                        onChange={(e) => setnewField({ ...newField!, nameRu: e.target.value })} />
                </Box>
                <Box>
                    <ComponentByType key={'new-field'} col={newField} onChange={onChangeComponentType} />
                </Box>
                <Box>
                    <TextField variant='outlined' type='number' id='length' label='Длина' disabled={newField?.dataType != 3} autoComplete='off' />
                </Box>
                <Box>
                    <FormControlLabel
                        value={'Start'}
                        control={
                            <Checkbox defaultChecked sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} checked={newField?.nullable} onChange={handleChangeNullable} />
                        }
                        label="Принимать null?"
                        labelPlacement='start'
                    />
                </Box>
                <Box>
                    <TextField variant='outlined' type='text' id='report_code' label='Код отчета' value={newField?.reportCode} onChange={(e) => setnewField({ ...newField!, reportCode: e.target.value })} autoComplete='off' />
                </Box>
                <Box sx={{ display: 'flex', width: '100%' }}>
                    <Accordion sx={{ width: '320px' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Размеры компонента
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ margin: '8px 0' }}>
                                <TextField variant='outlined' type='number' id='name' label='Высота' autoComplete='off'
                                    value={newField?.layout?.height}
                                    onChange={(e) => setnewField({ ...newField!, layout: { ...newField?.layout!, height: Number.parseInt(e.target.value) } })}
                                />
                            </Box>
                            <Box sx={{ margin: '8px 0' }}>
                                <TextField variant='outlined' type='number' id='name' label='Ширина' autoComplete='off'
                                    value={newField?.layout?.width}
                                    onChange={(e) => setnewField({ ...newField!, layout: { ...newField?.layout!, width: Number.parseInt(e.target.value) } })}
                                />
                            </Box>
                            <Box sx={{ margin: '8px 0' }}>
                                <FormControl fullWidth key={'fc-new-pos'}>
                                    <InputLabel id="demo-simple-select-label1">Position</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label1"
                                        id="demo-simple-select"
                                        value={newField?.layout?.position}
                                        label="Position"
                                        onChange={handleChangeLayoutPosition}
                                    >
                                        <MenuItem value={'Inline'}>Inline</MenuItem>
                                        <MenuItem value={'Outline'}>Outline</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>
                <Box>
                    <Button variant='outlined' disabled={!newField} onClick={handleAddColumn}>Добавить</Button>
                </Box>
            </Box>
            <TableContainer component={Paper} sx={{ margin: '8px', borderRadius: '8px', width: '99%' }}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <caption>
                    </caption>
                    <TableHead>
                        <TableRow>
                            <TableCell>№</TableCell>
                            <TableCell align="right">Название</TableCell>
                            {/* <TableCell align="right">Предпросмотр</TableCell> */}
                            <TableCell align="right">Тип данных</TableCell>
                            {/* <TableCell align="right">
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<LibraryAddOutlinedIcon />}
                                    onClick={() => handleAddRow()}
                                >
                                    Добавить строку
                                </Button>
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {uniformCol && uniformCol.map((col, index) =>
                        (<TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{col.name}</TableCell>
                            <TableCell>{types[col.dataType]}</TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}
