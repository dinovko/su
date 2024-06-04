import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IFormUpdateDto, IKeyValDTO, IPageResultDto, IWaterSupplyForm1, IWaterSupplyForm2, IWaterSupplyForm3, IWaterSupplyForm4, IWaterSupplyForm5 } from "types";
import { RootState } from 'store/store';
import { generateGUID } from "utils/uuid";
import ax from 'utils/axios';

interface thisSliceState {
    isLoading: boolean,
    isError: boolean,
    error: string,
    activeRow?: any,
    data: IWaterSupplyForm5[],
    isSaved: boolean,
}

const initialState: thisSliceState = {
    isLoading: false,
    isError: false,
    error: '',
    data: [],
    isSaved: true,
}

export const fetchForm5 = createAsyncThunk(
    'supply/form5/getall', async (payload: string, thunkAPI) => {
        try {
            const response = await ax.get<IWaterSupplyForm5[]>(`/Form/supply/city/form5/list?id=${payload}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

export const updateForm5 = createAsyncThunk(
    'supply/form5/update', async (payload: IFormUpdateDto<IWaterSupplyForm5>, thunkAPI) => {
        try {
            const response = await ax.post<IWaterSupplyForm5[]>(`/Form/supply/city/form4/list/update?id=${payload.id}`, payload.payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

const supplyForm5Slice = createSlice({
    name: 'supplyForm5Slice',
    initialState: initialState,
    reducers: {
        updateForm5PropByName: (state: thisSliceState, action: PayloadAction<IKeyValDTO>) => {
            const { id, key, val } = action.payload;

            let index = state.data.findIndex(x => x.id == id);
            // console.table({ index, formId, id, key, val });
            if (index == -1) return;

            switch (key) {
                case 'scadaWaterIntake':
                    state.data[index].scadaWaterIntake = Number.parseInt(val);
                    break;
                case 'scadaWaterTreatment':
                    state.data[index].scadaWaterTreatment = Number.parseInt(val);
                    break;
                case 'scadaStations':
                    state.data[index].scadaStations = Number.parseInt(val);
                    break;
                case 'scadaSupplyNetworks':
                    state.data[index].scadaSupplyNetworks = Number.parseInt(val);
                    break;

                default:
                    break;
            }

            state.isSaved = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchForm5.fulfilled, (state: thisSliceState, action: PayloadAction<IWaterSupplyForm5[]>) => {
            state.data = action.payload;
            state.isSaved = true;
        })
        builder.addCase(updateForm5.fulfilled, (state: thisSliceState, action: PayloadAction<IWaterSupplyForm5[]>) => {
            state.data = action.payload;
            state.isSaved = true;
        })
    }
});

// reducer
export const supplyForm5Reducer = supplyForm5Slice.reducer;
// action
export const { updateForm5PropByName } = supplyForm5Slice.actions;
// selector
export const selectSupplyForm5 = (state: RootState) => state.supplyForm5.data;
export const selectSupplyForm5Saved = (state: RootState) => state.supplyForm5.isSaved;