import * as React from 'react';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import { fetchKato, selectRefKatoTree } from './katoSlice';
import { setVillage } from 'features/reports/reportsSlice';

type KatoTreeViewProps = {
    onClick: (katoId: number, title: string) => void
}
export const KatoTreeView: React.FC<KatoTreeViewProps> = ({ onClick }) => {
    const dispatch = useAppDispatch();
    const tree = useAppSelector(selectRefKatoTree);

    const handleExpand = (e: any, itemid: any, isExpanded: any) => {
        if (!isExpanded) return;

        dispatch(fetchKato(Number.parseInt(itemid)));
        dispatch(setVillage(0));
        onClick(Number.parseInt(itemid), e.target.innerText);
    }

    React.useEffect(() => {
        dispatch(fetchKato(0));
    }, [])

    return (
        <Box sx={{ height: '100%', maxHeight: '90vh', flexGrow: 1, maxWidth: 400, overflowY: 'scroll' }}>
            <RichTreeView items={tree} sx={{ textAlign: 'left' }} onItemSelectionToggle={handleExpand} />
        </Box>
    )
}
