import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchApprovedFormItemColumn, selectUniformCols } from './uniformitemColumnsSlice';
import { Button } from '@mui/material';

export const UniFormColumn = () => {
    const { action, tabid } = useParams();
    const dispatch = useAppDispatch();
    const navigation = useNavigate();
    const colsTab = useAppSelector(selectUniformCols);

    const reload = () => {
        if (!tabid) return;
        dispatch(fetchApprovedFormItemColumn(tabid));
    }

    useEffect(() => { reload(); }, [, tabid]);

    const handleToEdit = () => {
        navigation(`/uniformcol/edit/${tabid}`);
    }

    return (
        <div className='uni-form-column-container'>
            <Button variant="outlined" onClick={() => handleToEdit()}>{colsTab.length ? 'Редактировать':'Добавить столбцы'}</Button>
            {colsTab.length > 0 && (<table>
                <thead>
                    <tr>
                        <th>№</th>
                        {colsTab && colsTab.map((th) => (<th key={th.id}>{th.thRu}</th>))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        {colsTab && colsTab.map((td) => (<td key={td.id}>-</td>))}
                    </tr>
                </tbody>
            </table>)}
        </div>
    )
}
