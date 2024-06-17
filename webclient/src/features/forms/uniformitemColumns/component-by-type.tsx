import { useAppDispatch } from 'hooks/storeHook'
import React from 'react'
import { IApprovedFormItemColumn } from 'types'
import { addApprovedFormItemColumn } from './uniformitemColumnsSlice'
import './component-by-type.css'

type ComponentByTypeProps = {
    col: IApprovedFormItemColumn
}
export const ComponentByType: React.FC<ComponentByTypeProps> = ({ col }) => {
    const dispatch = useAppDispatch();
    const [dataType, setdataType] = React.useState(col.dataType);
    const [title, setTitle] = React.useState(col.thRu);
    const [isSaved, setisSaved] = React.useState(true);

    const preview = () => {
        switch (dataType) {
            case 0:
                return (<span>{col.thRu}</span>)
                break;
            case 1:
                return (<input key={dataType} readOnly type='number' value={10} />)
                break;
            case 2:
                return (<input key={dataType} readOnly type='number' value={10.99} />)
                break;
            case 3:
                return (<input key={dataType} readOnly type='text' value={'текст'} />)
                break;
            case 4:
                return (<input key={dataType} readOnly type='checkbox' checked={false} />)
                break;
            case 5:
                return (<input key={dataType} readOnly type='date' value={new Date().toISOString().substring(0, 10)} />)
                break;
            case 6:
                return (<span>вычисляемый тип еще не реализован</span>)
                break;

            default:
                break;
        }
    }

    const handleChagenType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let val = Number.parseInt(e.target.value);
        setdataType(val);
        setisSaved(false);
        console.info('handleChagenType', val)
    }
    const types: string[] = ['Текст заголовка', 'Целочисленный', 'Число с плавающей запятой (двойная точность)', 'Строка', 'Логический', 'Дата', 'Формула'];
    const typeSelect = () => {
        console.info(dataType)
        return (<select value={dataType} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChagenType(e)}>
            {types && types.map((opt, index) => (<option key={index} value={index}>{opt}</option>))}
        </select>)
    }

    const handleSave = () => {
        console.info('datatype', dataType)
        dispatch(addApprovedFormItemColumn({
            id: col.id,
            approvedFormItemId: col.approvedFormItemId,
            dataType: dataType,
            thRu: title,
            thKk: title,
            displayOrder: col.displayOrder,
        })).then(() => {
            setisSaved(true);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        });
    }

    return (
        <tr key={col.id} className={`component-by-type-tr' ${isSaved ? '' : 'not-saved'}`}>
            <td><input type='text' value={title} onChange={(e) => { setTitle(e.target.value); setisSaved(false); }} placeholder='Введите заголовок столбца' /></td>
            <td>{preview()}</td>
            <td>{typeSelect()}</td>
            <td>
                <button disabled={isSaved} onClick={() => handleSave()}>Сохранить</button>
                {/* <button disabled={isSaved} onClick={() => handleSave()}>^ поднять</button> */}
                {/* <button disabled={isSaved} onClick={() => handleSave()}>^ опустить</button> */}
            </td>
        </tr>
    )
}
