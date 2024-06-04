import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IFormUpdateDto, IKeyValDTO, IPageResultDto, IWaterSupplyForm1, IWaterSupplyForm2 } from "types";
import { RootState } from 'store/store';
import { generateGUID } from "utils/uuid";
import ax from 'utils/axios';

interface thisSliceState {
    isLoading: boolean,
    isError: boolean,
    error: string,
    activeRow?: any,
    data: IWaterSupplyForm2[],
    isSaved: boolean,
}

const initialState: thisSliceState = {
    isLoading: false,
    isError: false,
    error: '',
    data: [],
    isSaved: true,
}

export const fetchForm2 = createAsyncThunk(
    'supply/form2/getall', async (payload: string, thunkAPI) => {
        try {
            const response = await ax.get<IWaterSupplyForm2[]>(`/Form/supply/city/form2/list?id=${payload}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

export const updateForm2 = createAsyncThunk(
    'supply/form2/update', async (payload: IFormUpdateDto<IWaterSupplyForm2>, thunkAPI) => {
        try {
            const response = await ax.post<IWaterSupplyForm2[]>(`/Form/supply/city/form2/list/update?id=${payload.id}`, payload.payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

const supplyForm2Slice = createSlice({
    name: 'supplyForm2Slice',
    initialState: initialState,
    reducers: {
        updateForm2PropByName: (state: thisSliceState, action: PayloadAction<IKeyValDTO>) => {
            const { id, key, val } = action.payload;

            let index = state.data.findIndex(x => x.id == id);
            // console.table({ index, formId, id, key, val });
            if (index == -1) return;

            switch (key) {
                case 'coverageWater':
                    state.data[index].coverageWater = Number.parseInt(val);
                    break;
                case 'centralizedWaterNumber':
                    state.data[index].centralizedWaterNumber = Number.parseInt(val);
                    break;

                default:
                    break;
            }

            state.isSaved = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchForm2.fulfilled, (state: thisSliceState, action: PayloadAction<IWaterSupplyForm2[]>) => {
            state.data = action.payload;
            state.isSaved = true;
        })
        builder.addCase(updateForm2.fulfilled, (state: thisSliceState, action: PayloadAction<IWaterSupplyForm2[]>) => {
            state.data = action.payload;
            state.isSaved = true;
        })
    }
});

// reducer
export const supplyForm2Reducer = supplyForm2Slice.reducer;
// action
export const { updateForm2PropByName } = supplyForm2Slice.actions;
// selector
export const selectSupplyForm2 = (state: RootState) => state.supplyForm2.data;
export const selectSupplyForm2Saved = (state: RootState) => state.supplyForm2.isSaved;