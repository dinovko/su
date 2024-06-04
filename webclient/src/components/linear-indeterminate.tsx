import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

type LinearIndeterminateProps = {
    isLoading?: boolean;
}
export const LinearIndeterminate: React.FC<LinearIndeterminateProps> = ({ isLoading }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress color="secondary" variant={isLoading ? "indeterminate" : "determinate"} value={isLoading == true ? undefined : 0} />
        </Box>
    );
}