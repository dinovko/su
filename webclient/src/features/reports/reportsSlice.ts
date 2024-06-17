import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import { FormDto, IFormAddDto, IKeyValDTO, IPageResultDto, IWaterSupplyForm1 } from "types";
import ax from 'utils/axios'

interface thisSliceState {
    isLoading: boolean,
    isError: boolean,
    error: string,
    data: IFormAddDto[],
    isVillage: boolean;
}

const initialState: thisSliceState = {
    isLoading: false,
    isError: false,
    error: '',
    data: [],
    isVillage: false,
}
export const reportsGetAll = createAsyncThunk(
    'supply/form/bykato', async (payload: string, thunkAPI) => {
        try {
            const response = await ax.get<IFormAddDto[]>(`/Report?katoid=${payload}`);
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
            const response = await ax.post<any>(`/Report`, payload);
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
        setReports: (state: thisSliceState, action: PayloadAction<IFormAddDto[]>) => {
            state.data = action.payload;
        },
        setVillage: (state: thisSliceState, action: PayloadAction<number | null>) => {
            if (action.payload == null) {
                state.isVillage = false;
            } else {
                state.isVillage = action.payload == 1 ? false : true;
            }
        },
        resetReports: (state: thisSliceState)=>{
            state.data = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(reportsGetAll.fulfilled, (state: thisSliceState, action: PayloadAction<IFormAddDto[]>) => {
            state.data = action.payload
        })
    }
});

// reducer
export const reportsReducer = reportsSlice.reducer;
// action
export const { setReports, setVillage, resetReports } = reportsSlice.actions;
// selector
export const selectReports = (state: RootState) => state.reports.data;