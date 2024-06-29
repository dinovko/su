import { Box } from '@mui/material'
import { MainBar } from 'components/app-bar'
import { Register } from 'features/admin/register'
import React from 'react'

const AdminPage = () => {

  return (
    <>
      <MainBar />
      <Register />
    </>

  )
}

export default AdminPage