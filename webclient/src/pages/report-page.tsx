import { Grid, Paper, Typography, styled } from '@mui/material'
import { KatoTreeView, LinearIndeterminate } from 'components';
import { MainBar } from 'components/app-bar';
import { ReportsList } from 'features';
import { resetReports } from 'features/reports/reportsSlice';
import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const ReportPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [reportsOrigin, setreportsOrigin] = useState('');
    const [katoId, setkatoId] = useState(0);
    const isLoading = useAppSelector((state) => state.loading)
    const { kato } = useParams();

    const handleChooseKato = (id: any, label: string) => {
        console.info(id, label)
        setreportsOrigin(label || '')
        setkatoId(label ? id : 0);
        navigate(`/reports/${label ? id : 0}`);
    }

    useEffect(()=>{
        navigate(`/reports`);
        setkatoId(0);
        setreportsOrigin('');
        dispatch(resetReports());
    },[])

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <MainBar />
                <LinearIndeterminate key={'ReportPage-LinearIndeterminate'} isLoading={isLoading} />
            </Grid>
            <Grid item xs={3} sx={{ padding: '0 16px' }}>
                <KatoTreeView key={'tree-view-kato'} onClick={handleChooseKato} />
            </Grid>
            <Grid item xs={9} sx={{ padding: '0 16px' }}>
                <Typography variant="h6" component="h2">{reportsOrigin}</Typography>
                <ReportsList key={'reports-list'} katoID={kato} />
            </Grid>
        </Grid>
    )
}
