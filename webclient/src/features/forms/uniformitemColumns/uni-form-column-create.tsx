import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import React, { useEffect } from 'react'
import { selectUniformItem } from '../uniformitems/uniformitemSlice';
import { addApprovedFormItemColumn, fetchApprovedFormItemColumn, selectUniformCols } from './uniformitemColumnsSlice';
import { ComponentByType } from './component-by-type';
import { generateGUID } from 'utils/uuid';
import { useNavigate } from 'react-router-dom';

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
        <>
            <table>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Предпросмотр</th>
                        <th>Тип данных</th>
                        <th>
                            <button onClick={() => handleAddRow()}>Добавить в конец</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {uniformCol && uniformCol.map((col, index) =>
                        (<ComponentByType key={index} col={col} />)
                    )}
                </tbody>
            </table>
            <button onClick={() => handleCloseEdit()}>Закрыть</button>
        </>
    )
}
