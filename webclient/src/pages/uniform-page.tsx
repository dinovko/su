import { MainBar } from 'components/app-bar';
import { UniForm } from 'features'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const UniFormPage = () => {
    const navigation = useNavigate();
    return (<>
        <MainBar />
        <UniForm />
        <button onClick={() => navigation("/reports", { replace: true })}>Закрыть</button>
    </>)
}
