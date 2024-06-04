import { Grid, Typography } from '@mui/material'
import { LinearIndeterminate, KatoTreeView } from 'components'
import { MainBar } from 'components/app-bar'
import { ReportsList } from 'features'
import React from 'react'

export const MainPage = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <MainBar />
      </Grid>
      <Grid item xs={3} sx={{ padding: '0 16px' }}>
      </Grid>
      <Grid item xs={9} sx={{ padding: '0 16px' }}>
      </Grid>
    </Grid>
  )
}
