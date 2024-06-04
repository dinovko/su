import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IFormUpdateDto, IKeyValDTO, IPageResultDto, IWaterSupplyForm1, IWaterSupplyForm2, IWaterSupplyForm3 } from "types";
import { RootState } from 'store/store';
import { generateGUID } from "utils/uuid";
import ax from 'utils/axios';

interface thisSliceState {
    isLoading: boolean,
    isError: boolean,
    error: string,
    activeRow?: any,
    data: IWaterSupplyForm3[],
    isSaved: boolean,
}

const initialState: thisSliceState = {
    isLoading: false,
    isError: false,
    error: '',
    data: [],
    isSaved: true,
}

export const fetchForm3 = createAsyncThunk(
    'supply/form3/getall', async (payload: string, thunkAPI) => {
        try {
            const response = await ax.get<IWaterSupplyForm3[]>(`/Form/supply/city/form3/list?id=${payload}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

export const updateForm3 = createAsyncThunk(
    'supply/form3/update', async (payload: IFormUpdateDto<IWaterSupplyForm3>, thunkAPI) => {
        try {
            const response = await ax.post<IWaterSupplyForm3[]>(`/Form/supply/city/form3/list/update?id=${payload.id}`, payload.payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

const supplyForm3Slice = createSlice({
    name: 'supplyForm3Slice',
    initialState: initialState,
    reducers: {
        updateForm3PropByName: (state: thisSliceState, action: PayloadAction<IKeyValDTO>) => {
            const { id, key, val } = action.payload;

            let index = state.data.findIndex(x => x.id == id);
            // console.table({ index, formId, id, key, val });
            if (index == -1) return;

            switch (key) {
                case 'coverageMetersRemoteDaata':
                    state.data[index].coverageMetersRemoteData = Number.parseInt(val);
                    break;
                case 'coverageMetersPercent':
                    state.data[index].coverageMetersTotalCumulative = Number.parseInt(val);
                    break;

                default:
                    break;
            }

            state.isSaved = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchForm3.fulfilled, (state: thisSliceState, action: PayloadAction<IWaterSupplyForm3[]>) => {
            state.data = action.payload;
            state.isSaved = true;
        })
        builder.addCase(updateForm3.fulfilled, (state: thisSliceState, action: PayloadAction<IWaterSupplyForm3[]>) => {
            state.data = action.payload;
            state.isSaved = true;
        })
    }
});

// reducer
export const supplyForm3Reducer = supplyForm3Slice.reducer;
// action
export const { updateForm3PropByName } = supplyForm3Slice.actions;
// selector
export const selectSupplyForm3 = (state: RootState) => state.supplyForm3.data;
export const selectSupplyForm3Saved = (state: RootState) => state.supplyForm3.isSaved;