import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IFormUpdateDto, IKeyValDTO, IPageResultDto, IWaterSupplyForm1 } from "../../../../../types";
import { RootState } from '../../../../../store/store';
import { generateGUID } from "utils/uuid";
import ax from 'utils/axios';

interface thisSliceState {
    isLoading: boolean,
    isError: boolean,
    error: string,
    activeRow?: any,
    data: IWaterSupplyForm1[],
    isSaved:boolean,
}

const initialState: thisSliceState = {
    isLoading: false,
    isError: false,
    error: '',
    data: [],
    isSaved:true,
}

export const fetchForm1 = createAsyncThunk(
    'supply/form1/getall', async (payload: string, thunkAPI) => {
        try {
            const response = await ax.get<IWaterSupplyForm1[]>(`/Form/supply/city/form1/list?id=${payload}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

export const updateForm1 = createAsyncThunk(
    'supply/form1/update', async (payload: IFormUpdateDto<IWaterSupplyForm1>, thunkAPI) => {
        try {
            const response = await ax.post<IWaterSupplyForm1[]>(`/Form/supply/city/form1/list/update?id=${payload.id}`, payload.payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

const supplyForm1Slice = createSlice({
    name: 'supplyForm1Slice',
    initialState: initialState,
    reducers: {
        addForm1: (state: thisSliceState, action: PayloadAction<IWaterSupplyForm1>) => {
            // let newId = generateGUID();
            // const { formId, volume, rperiodId } = action.payload;
            // console.info('supplyForm1Slice', action.payload)
            // state.data.push({
            //     id: newId,
            //     formId: formId,
            //     volume: volume,
            //     rperiodId: rperiodId,
            // });
            // state.activeRow = { id: newId, ...action.payload };
        },
        addForm1Template: (state: thisSliceState, action: PayloadAction<string>) => {
            // let arr: IWaterSupplyForm1[] = [];
            // let newId = action.payload;

            // for (let i = 0; i < 12; i++) {
            //     arr.push({ id: generateGUID(), formId: newId, rperiodId: i + 1, volume: 0 })
            // }

            // state.data = [...state.data, ...arr];
        },
        delForm1ByFormId: (state: thisSliceState, action: PayloadAction<string>) => {
            const idToDel = action.payload;
            const filteredArray = state.data.filter(x => x.id !== idToDel);
            state.data = filteredArray;
        },
        updateForm1PropByName: (state: thisSliceState, action: PayloadAction<IKeyValDTO>) => {
            const { formId, id, key, val } = action.payload;

            let index = state.data.findIndex(x => x.id == id);
            // console.table({ index, formId, id, key, val });
            if (index == -1) return;

            state.data[index].volume = Number.parseInt(val);
            state.isSaved = false;

            // let oldData = state.data[index];
            // state.data[index] = {
            //     ...oldData, [key]: val
            // }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchForm1.fulfilled, (state: thisSliceState, action: PayloadAction<IWaterSupplyForm1[]>) => {
            state.data = action.payload;
            state.isSaved = true;
        })
        builder.addCase(updateForm1.fulfilled, (state: thisSliceState, action: PayloadAction<IWaterSupplyForm1[]>) => {
            state.data = action.payload;
            state.isSaved = true;
        })
    }
});

// reducer
export const supplyForm1Reducer = supplyForm1Slice.reducer;
// action
export const { addForm1, addForm1Template, delForm1ByFormId, updateForm1PropByName } = supplyForm1Slice.actions;
// selector
export const selectSupplyForm1 = (state: RootState) => state.supplyForm1.data;
export const selectSupplyForm1Saved = (state: RootState) => state.supplyForm1.isSaved;