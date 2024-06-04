import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IFormUpdateDto, IKeyValDTO, IPageResultDto, IWaterSupplyForm1, IWaterWasteForm1 } from "../../../../../types";
import { RootState } from '../../../../../store/store';
import { generateGUID } from "utils/uuid";
import ax from 'utils/axios';

interface thisSliceState {
    isLoading: boolean,
    isError: boolean,
    error: string,
    activeRow?: any,
    data: IWaterWasteForm1[],
    isSaved:boolean,
}

const initialState: thisSliceState = {
    isLoading: false,
    isError: false,
    error: '',
    data: [],
    isSaved:true,
}

export const fetchWasteCityForm1 = createAsyncThunk(
    'waste/city/form1/getall', async (payload: string, thunkAPI) => {
        try {
            const response = await ax.get<IWaterWasteForm1[]>(`/Form/waste/city/form1/list?id=${payload}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

export const updateWasteCityForm1 = createAsyncThunk(
    'waste/city/form1/update', async (payload: IFormUpdateDto<IWaterWasteForm1>, thunkAPI) => {
        try {
            const response = await ax.post<IWaterWasteForm1[]>(`/Form/waste/city/form1/list/update?id=${payload.id}`, payload.payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

const wasteCityForm1Slice = createSlice({
    name: 'wasteCityForm1Slice',
    initialState: initialState,
    reducers: {
        addForm1: (state: thisSliceState, action: PayloadAction<IWaterWasteForm1>) => {
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

            state.data[index].waterVolume = Number.parseInt(val);
            state.isSaved = false;

            // let oldData = state.data[index];
            // state.data[index] = {
            //     ...oldData, [key]: val
            // }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWasteCityForm1.fulfilled, (state: thisSliceState, action: PayloadAction<IWaterWasteForm1[]>) => {
            state.data = action.payload;
            state.isSaved = true;
        })
        builder.addCase(updateWasteCityForm1.fulfilled, (state: thisSliceState, action: PayloadAction<IWaterWasteForm1[]>) => {
            state.data = action.payload;
            state.isSaved = true;
        })
    }
});

// reducer
export const wasteCityForm1Reducer = wasteCityForm1Slice.reducer;
// action
export const { addForm1, addForm1Template, delForm1ByFormId, updateForm1PropByName } = wasteCityForm1Slice.actions;
// selector
export const selectWasteCityForm1 = (state: RootState) => state.wasteForm1.data;
export const selectWasteCityForm1Saved = (state: RootState) => state.wasteForm1.isSaved;