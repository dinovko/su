import { UniFormColumn } from 'features'
import { UniFormColumnCreate } from 'features/forms/uniformitemColumns/uni-form-column-create';
import { selectUniformCols } from 'features/forms/uniformitemColumns/uniformitemColumnsSlice';
import { useAppSelector } from 'hooks/storeHook';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export const UniFormColumnPage = () => {
    const navigation = useNavigate();
    const { action, id } = useParams();
    const colsTab = useAppSelector(selectUniformCols);
    useEffect(() => {
        if (!action || !id) {
            navigation("/", { replace: true });
        }
    }, [])
    return (
        <>
            {action == 'view' && id != null && id != '' && (<UniFormColumn />)}
            {action == 'edit' && id != null && id != '' && (<UniFormColumnCreate key={'UniFormColumnCreate'} id={id} />)}
        </>
    )
}
