import { UniForm } from 'features'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const UniFormPage = () => {
    const navigation = useNavigate();
    return (<>
        <UniForm />
        <button onClick={() => navigation("/reports", { replace: true })}>Закрыть</button>
    </>)
}
