import * as React from 'react';
import ax from 'utils/axios';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { Box } from '@mui/material';
import { IKatoTreeViewDto } from 'types';
import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import { fetchKato, selectRefKatoTree } from './katoSlice';
import { SimpleTreeView } from 'components';

type KatoTreeViewProps = {
    onClick: (katoId: number, title: string) => void
}
export const KatoTreeView: React.FC<KatoTreeViewProps> = ({ onClick }) => {
    const dispatch = useAppDispatch();
    const tree = useAppSelector(selectRefKatoTree);
    console.info(tree)
    // const [parentId, setparentId] = React.useState(0);

    const handleExpand = (e: any, itemid: any, isExpanded: any) => {
        if (!isExpanded) return;

        dispatch(fetchKato(Number.parseInt(itemid)));
        onClick(Number.parseInt(itemid), e.target.innerText);
        // let updateID: TreeViewBaseItem = {} as TreeViewBaseItem;
        // try {
        //     ax.get<IKatoTreeViewDto[]>(`/RefKato/list?parentId=${Number.parseInt(itemid)}`)
        //         .then((resp) => {
        //             let kato: TreeViewBaseItem[] = [];
        //             resp.data.map((item: IKatoTreeViewDto) => {
        //                 kato.push({
        //                     id: item.id.toString(),
        //                     label: item.nameRu,
        //                     children: []
        //                 })
        //             });
        //             let oldTree = JSON.parse(JSON.stringify(tree)) as TreeViewBaseItem[];
        //             oldTree.forEach(element => {
        //                 let findid = findIdInTree(element, itemid);
        //                 if (findid) {
        //                     updateID = findid;
        //                     updateID.children = kato;
        //                 }
        //             });
        //             settree(oldTree);
        //         })
        //         .catch(() => {
        //             console.info('ошибка')
        //         });
        // } catch (error) {

        // }
    }

    // function findIdInTree(node: TreeViewBaseItem, searchId: string): TreeViewBaseItem | null {
    //     if (node.id == searchId) {
    //         return node;
    //     }
    //     if (!node.children) return null;

    //     for (const child of node.children) {
    //         const result = findIdInTree(child, searchId);
    //         if (result !== null) {
    //             return result;
    //         }
    //     }
    //     return null;
    // }

    React.useEffect(() => {
        dispatch(fetchKato(0));
        // ax.get<IKatoTreeViewDto[]>(`/RefKato/list?parentId=${parentId}`)
        // .then((resp)=>{
        //     let kato:TreeViewBaseItem[] = [];
        //     resp.data.map((item:IKatoTreeViewDto)=>{
        //         kato.push({
        //             id:item.id.toString(),
        //             label:item.nameRu,
        //             children:[]
        //         })
        //     });
        //     settree(kato)
        // })
    }, [])

    return (
        <Box sx={{ height: '100%', maxHeight: '90vh', flexGrow: 1, maxWidth: 400, overflowY: 'scroll' }}>
            {/* <SimpleTreeView/> */}
            <RichTreeView items={tree} sx={{ textAlign: 'left' }} onItemSelectionToggle={handleExpand} />
        </Box>
    )
}
