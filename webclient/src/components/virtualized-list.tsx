import * as React from 'react';
import Box from '@mui/material/Box';

type VirtualizedListProps = {
    streetName: string | null | undefined;
    items: any[],
    onSelectItem: (id: number) => void;
}
export const VirtualizedList: React.FC<VirtualizedListProps> = ({ streetName, items, onSelectItem }) => {
    const [selectedItem, setselectedItem] = React.useState<number | undefined>();
    const onClick = (id: number) => {
        setselectedItem(id);
        onSelectItem(id);
    }
    return (
        <Box
            sx={{ width: '100%', height: 400, maxWidth: '100%', bgcolor: 'background.paper' }}
        >
            {items && items.map((row) => (
                <div
                    key={row.id}
                    style={{ backgroundColor: row.id == selectedItem ? 'greenyellow' : 'white', cursor: 'pointer' }}
                    onClick={() => onClick(row.id)}>
                    {streetName ?? ''}
                    {" "}
                    {row.nameRu}
                </div>))}
            {items.length == 0 && <span>нет данных</span>}
        </Box>
    );
}
