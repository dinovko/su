import { Box } from '@mui/material'
import { Login } from 'features'

export const LoginPage = () => {

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      height: '95vh',
    }}>
      <Login />
    </Box>
  )
}
