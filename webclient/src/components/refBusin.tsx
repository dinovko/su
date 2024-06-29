import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Box, Typography } from '@mui/material';

interface RefBusinResponse {
    id: string;
    parentId: string | null;
    code: string;
    type: string;
    businessDecription: string;
    nameRu: string;
    nameKk: string;
    isDel: boolean;
    description: string;
}

const RefBusinConst:React.FC = () => {
    const [data, setData] = useState<RefBusinResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5145/api/Refs/univerList'); // Replace with your API endpoint
                const result:RefBusinResponse[]  = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    if (loading) {
        return <p>Loading...</p>;
    }


    return (
        <Container>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Бизнесс справочник
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>                        
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Код</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Тип</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Бизнес описание</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Наименование (гос)</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Наименование (рус)</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Удален</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Описание</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.id}>
                                <TableCell>{item.code}</TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell>{item.businessDecription}</TableCell>
                                <TableCell>{item.nameRu}</TableCell>
                                <TableCell>{item.nameKk}</TableCell>
                                <TableCell>{item.isDel ? 'Да' : 'Нет'}</TableCell>
                                <TableCell>{item.description}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        </Box>
        </Container>
    );
};

export default RefBusinConst