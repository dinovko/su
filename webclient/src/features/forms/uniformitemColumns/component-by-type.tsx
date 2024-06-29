import { useAppDispatch } from 'hooks/storeHook'
import React from 'react'
import { IApprovedFormItemColumn } from 'types'
import { addApprovedFormItemColumn } from './uniformitemColumnsSlice'
import './component-by-type.css'
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'

type ComponentByTypeProps = {
    col?: IApprovedFormItemColumn;
    onChange: (col: number) => void;
}
export const types: string[] = ['Текст заголовка', 'Целочисленный', 'Число с плавающей запятой (двойная точность)', 'Строка', 'Логический', 'Дата', 'Формула'];
export const ComponentByType: React.FC<ComponentByTypeProps> = ({ col, onChange }) => {
    const dispatch = useAppDispatch();
    const [dataType, setdataType] = React.useState(col?.dataType);
    const [title, setTitle] = React.useState(col?.name);
    const [len, setLen] = React.useState<number>(0);
    const [isSaved, setisSaved] = React.useState(true);

    // const preview = () => {
    //     switch (dataType) {
    //         case 0:
    //             return (<span>{col.name}</span>)
    //             break;
    //         case 1:
    //             return (<input key={dataType} readOnly type='number' value={10} />)
    //             break;
    //         case 2:
    //             return (<input key={dataType} readOnly type='number' value={10.99} />)
    //             break;
    //         case 3:
    //             return (<input key={dataType} readOnly type='text' value={'текст'} />)
    //             break;
    //         case 4:
    //             return (<input key={dataType} readOnly type='checkbox' checked={false} />)
    //             break;
    //         case 5:
    //             return (<input key={dataType} readOnly type='date' value={new Date().toISOString().substring(0, 10)} />)
    //             break;
    //         case 6:
    //             return (<span>вычисляемый тип еще не реализован</span>)
    //             break;

    //         default:
    //             break;
    //     }
    // }

    const handleChangeType = (e: SelectChangeEvent<number>) => {
        let val = e.target.value as number;
        setdataType(val);
        setisSaved(false);
        onChange(val);
    }
    // const typeSelect = () => {
    //     console.info(dataType)
    //     return (<select value={dataType} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChagenType(e)}>
    //         {types && types.map((opt, index) => (<option key={index} value={index}>{opt}</option>))}
    //     </select>)
    // }

    // const handleSave = () => {
    //     console.info('datatype', dataType)
    //     dispatch(addApprovedFormItemColumn({
    //         id: col.id,
    //         approvedFormItemId: col.approvedFormItemId,
    //         dataType: dataType,
    //         name: title,
    //         length: len,
    //         displayOrder: col.displayOrder,
    //     })).then(() => {
    //         setisSaved(true);
    //         setTimeout(() => {
    //             window.location.reload();
    //         }, 1000);
    //     });
    // }

    return (<FormControl fullWidth>
        <InputLabel id="demo-simple-select-label2">Тип данных</InputLabel>
        <Select
            labelId="demo-simple-select-label2"
            id="demo-simple-select2"
            value={dataType}
            label="Тип данных"
            onChange={handleChangeType}
            sx={{width:'250px'}}
        >
            {types && types.map((type, index) => (<MenuItem key={index} value={index}>{type}</MenuItem>))}
        </Select>
    </FormControl>)

    // return (
    //     <tr key={col.id} className={`component-by-type-tr' ${isSaved ? '' : 'not-saved'}`}>
    //         <td><input type='text' value={title} onChange={(e) => { setTitle(e.target.value); setisSaved(false); }} placeholder='Введите заголовок столбца' /></td>
    //         <td>{preview()}</td>
    //         <td>{typeSelect()}</td>
    //         <td>
    //             <button disabled={isSaved} onClick={() => handleSave()}>Сохранить</button>
    //         </td>
    //     </tr>
    // )
}
