import { Box } from '@mui/material'
import { TreeItem } from '@mui/x-tree-view'
import { SimpleTreeView as STV } from '@mui/x-tree-view/SimpleTreeView';
import { ISimpleTreeView } from 'types';

type SimpleTreeViewProps = {
    items: ISimpleTreeView[] | [] | null | undefined;
}
export const SimpleTreeView: React.FC<SimpleTreeViewProps> = ({ items }) => {

    const treeChildren = () => {
        
    }

    const tree = () => {
        if (!items || items.length == 0) {
            return (<STV><TreeItem itemId="empty" label="Нет данных"></TreeItem></STV>)
        }

        return (<STV>
            {items.map((item, index) => (
                <TreeItem itemId="grid" label="Data Grid">
                    <TreeItem itemId="grid-community" label="@mui/x-data-grid" />
                    <TreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
                    <TreeItem itemId="grid-premium" label="@mui/x-data-grid-premium" />
                </TreeItem>
            ))}
            <TreeItem itemId="grid" label="Data Grid">
                <TreeItem itemId="grid-community" label="@mui/x-data-grid" />
                <TreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
                <TreeItem itemId="grid-premium" label="@mui/x-data-grid-premium" />
            </TreeItem>
            <TreeItem itemId="pickers" label="Date and Time Pickers">
                <TreeItem itemId="pickers-community" label="@mui/x-date-pickers" />
                <TreeItem itemId="pickers-pro" label="@mui/x-date-pickers-pro" />
            </TreeItem>
        </STV>)
    }
    return (
        <Box sx={{ height: 220, flexGrow: 1, maxWidth: 400 }}>

        </Box>
    )
}
