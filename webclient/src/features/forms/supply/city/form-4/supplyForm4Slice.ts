import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IFormUpdateDto, IKeyValDTO, IPageResultDto, IWaterSupplyForm1, IWaterSupplyForm2, IWaterSupplyForm3, IWaterSupplyForm4 } from "types";
import { RootState } from 'store/store';
import { generateGUID } from "utils/uuid";
import ax from 'utils/axios';

interface thisSliceState {
    isLoading: boolean,
    isError: boolean,
    error: string,
    activeRow?: any,
    data: IWaterSupplyForm4[],
    isSaved: boolean,
}

const initialState: thisSliceState = {
    isLoading: false,
    isError: false,
    error: '',
    data: [],
    isSaved: true,
}

export const fetchForm4 = createAsyncThunk(
    'supply/form4/getall', async (payload: string, thunkAPI) => {
        try {
            const response = await ax.get<IWaterSupplyForm4[]>(`/Form/supply/city/form4/list?id=${payload}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

export const updateForm4 = createAsyncThunk(
    'supply/form4/update', async (payload: IFormUpdateDto<IWaterSupplyForm4>, thunkAPI) => {
        try {
            const response = await ax.post<IWaterSupplyForm4[]>(`/Form/supply/city/form4/list/update?id=${payload.id}`, payload.payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

const supplyForm4Slice = createSlice({
    name: 'supplyForm4Slice',
    initialState: initialState,
    reducers: {
        updateForm4PropByName: (state: thisSliceState, action: PayloadAction<IKeyValDTO>) => {
            const { id, key, val } = action.payload;

            let index = state.data.findIndex(x => x.id == id);
            // console.table({ index, formId, id, key, val });
            if (index == -1) return;

            switch (key) {
                case 'coverageHouseholdNeedNumberBuildings':
                    state.data[index].coverageHouseholdNeedNumberBuildings = Number.parseInt(val);
                    break;
                case 'coverageHouseholdInstalledBuildings':
                    state.data[index].coverageHouseholdInstalledBuildings = Number.parseInt(val);
                    break;
                case 'coverageHouseholdInstalledCount':
                    state.data[index].coverageHouseholdInstalledCount = Number.parseInt(val);
                    break;
                case 'coverageHouseholdRemoteData':
                    state.data[index].coverageHouseholdRemoteData = Number.parseInt(val);
                    break;

                default:
                    break;
            }

            state.isSaved = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchForm4.fulfilled, (state: thisSliceState, action: PayloadAction<IWaterSupplyForm4[]>) => {
            state.data = action.payload;
            state.isSaved = true;
        })
        builder.addCase(updateForm4.fulfilled, (state: thisSliceState, action: PayloadAction<IWaterSupplyForm4[]>) => {
            state.data = action.payload;
            state.isSaved = true;
        })
    }
});

// reducer
export const supplyForm4Reducer = supplyForm4Slice.reducer;
// action
export const { updateForm4PropByName } = supplyForm4Slice.actions;
// selector
export const selectSupplyForm4 = (state: RootState) => state.supplyForm4.data;
export const selectSupplyForm4Saved = (state: RootState) => state.supplyForm4.isSaved;