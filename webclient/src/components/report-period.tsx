import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { IFormPeriod } from 'types';

type MonthProps = {
    id: number,
    label: string,
}

type ReportPeriodProps = {
    onSetPeriod: (p: IFormPeriod) => void;
}
export const ReportPeriod: React.FC<ReportPeriodProps> = ({ onSetPeriod }) => {
    const [age, setAge] = React.useState('');
    const [years, setyears] = React.useState<number[]>([]);
    const [months, setmonths] = React.useState<MonthProps[]>([]);
    const [period, setperiod] = React.useState<IFormPeriod>({
        year: 2024,
        month: 1
    })

    useEffect(() => {
        let m: MonthProps[] = [
            { id: 1, label: 'январь' },
            { id: 2, label: 'февраль' },
            { id: 3, label: 'март' },
            { id: 4, label: 'апрель' },
            { id: 5, label: 'май' },
            { id: 6, label: 'июнь' },
            { id: 7, label: 'июль' },
            { id: 8, label: 'август' },
            { id: 9, label: 'сентябрь' },
            { id: 10, label: 'октябрь' },
            { id: 11, label: 'ноябрь' },
            { id: 12, label: 'декабрь' },
        ];
        setmonths(m);

        const startYear = 1991;
        const currentYear = new Date().getFullYear();
        const y = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);
        setyears(y);
    }, [])

    const handleChangeYear = (event: SelectChangeEvent) => {
        let val = Number.parseInt(event.target.value);
        setperiod({ ...period, year: val });
    };
    const handleChangeMonth = (event: SelectChangeEvent) => {
        let val = Number.parseInt(event.target.value);
        setperiod({ ...period, month: val });
    };
    return (
        <Box sx={{ minWidth: 120, display: 'flex', justifyContent: 'space-around', alignItems: 'center', width:'500px' }}>
            <FormControl sx={{width:'150px'}}>
                <InputLabel id="demo-simple-select-label">Год</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={period.year.toString()}
                    label="Год"
                    onChange={handleChangeYear}
                >
                    {years && years.map((row) => (<MenuItem key={row} value={row}>{row}</MenuItem>))}
                </Select>
            </FormControl>
            <FormControl sx={{width:'150px'}}>
                <InputLabel id="demo-simple-select-label">Месяц</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={period.month.toString()}
                    label="Месяц"
                    onChange={handleChangeMonth}
                >
                    {months && months.map((row) => (<MenuItem key={row.id} value={row.id}>{row.label}</MenuItem>))}
                </Select>
            </FormControl>
            <Button variant="contained" onClick={() => onSetPeriod(period)}>Сохранить</Button>
        </Box>
    )
}
