import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import { FormDto, IFormAddDto, IKeyValDTO, IPageResultDto, IWaterSupplyForm1 } from "types";
import ax from 'utils/axios'

interface thisSliceState {
    isLoading: boolean,
    isError: boolean,
    error: string,
    data: FormDto[],
}

const initialState: thisSliceState = {
    isLoading: false,
    isError: false,
    error: '',
    data: []
}
export const reportsGetAll = createAsyncThunk(
    'supply/form/bykato', async (payload: number, thunkAPI) => {
        try {
            const response = await ax.get<FormDto[]>(`/Form/list?katoid=${payload}`);
            return response.data;
        } catch (error) {
            console.info('slice', error)
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

export const reportsAdd = createAsyncThunk(
    'supply/form/add', async (payload: IFormAddDto, thunkAPI) => {
        try {
            const response = await ax.post<any>(`/Form/add`, payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

const reportsSlice = createSlice({
    name: 'reportsSlice',
    initialState: initialState,
    reducers: {
        setReports: (state: thisSliceState, action: PayloadAction<FormDto[]>) => {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(reportsGetAll.fulfilled, (state: thisSliceState, action: PayloadAction<FormDto[]>) => {
            state.data = action.payload
        })
    }
});

// reducer
export const reportsReducer = reportsSlice.reducer;
// action
export const { setReports } = reportsSlice.actions;
// selector
export const selectReports = (state: RootState) => state.reports.data;