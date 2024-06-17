import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { IAccount, IKatoTreeViewDto, IKeyValDTO, IPageQueryDto, IRefBuildingDto, IRefStreetDto, ISignInDTO, ISignInResponseDTO, IWaterSupplyForm, IWaterSupplyForm1 } from "../../types";
import { RootState } from '../../store/store';
import { generateGUID } from "utils/uuid";
import ax from 'utils/axios';
import { GetQuery } from "utils/ObjToQuery";
import { TreeViewBaseItem } from "@mui/x-tree-view";

interface thisSliceState {
    isLoading: boolean,
    isError: boolean,
    error: string,
    data: IKatoTreeViewDto[],
    tree: TreeViewBaseItem[],
}

const initialState: thisSliceState = {
    isLoading: false,
    isError: false,
    error: '',
    data: [],
    tree: [],
}

export const fetchKato = createAsyncThunk(
    'refs/kato/getall', async (payload: number, thunkAPI) => {
        try {
            const response = await ax.get<IKatoTreeViewDto[]>(`/RefKato/list?parentId=${payload}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
);

export const checkIsReportable = createAsyncThunk(
    'refs/kato/IsReportable', async (payload: number, thunkAPI) => {
        try {
            const response = await ax.get<boolean>(`/RefKato/kato/IsReportable?parentId=${payload}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
);

function findIdInTree(node: TreeViewBaseItem, searchId: string): TreeViewBaseItem | null {
    if (node.id === searchId) {
        return node;
    }
    if (!node.children) return null;
    for (const child of node.children) {
        const result = findIdInTree(child, searchId);
        if (result !== null) {
            return result;
        }
    }

    return null;
}

const updateKato = (newArr: IKatoTreeViewDto[], oldArr: IKatoTreeViewDto[]) => {
    const oldArrMap = new Map(oldArr.map(item => [item.id, item]));

    newArr.forEach(item => {
        oldArrMap.set(item.id, item);
    });
    return Array.from(oldArrMap.values());
}


const refKatoSlice = createSlice({
    name: 'refs/kato',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchKato.fulfilled, (state: thisSliceState, action: PayloadAction<IKatoTreeViewDto[]>) => {
            state.data = updateKato(action.payload,state.data);
            if (action.payload.length > 0) {
                let tree_: TreeViewBaseItem[] = [];
                action.payload.map((item: IKatoTreeViewDto) => {
                    tree_.push({
                        id: item.id.toString(),
                        label: item.name,
                        children: [],
                    });
                });

                if (action.payload[0].parentId == 0) {
                    state.tree = tree_;
                } else {
                    let node = {} as TreeViewBaseItem | null;
                    state.tree.map((item: TreeViewBaseItem) => {
                        node = findIdInTree(item, action.payload[0].parentId.toString());
                        if (node) {
                            node.children = tree_
                        }
                    });
                }
            }
        })
    },
});

// reducer
export const refKatoReducer = refKatoSlice.reducer;
// action
export const { } = refKatoSlice.actions;
// selector
export const selectRefKatoTree = (state: RootState) => state.kato.tree;
export const selectRefKatoDataInline = (state: RootState) => state.kato.data;