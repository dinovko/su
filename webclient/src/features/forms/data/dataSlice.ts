import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import { IApprovedForm, ICols, IData, IDataUpate } from "types";
import ax from 'utils/axios';

interface thisSliceState {
    data: Array<IData>,
    col: ICols[],
    synched: boolean,
}

const initialState: thisSliceState = {
    data: [],
    col: [],
    synched: false,
}

export const fetchData = createAsyncThunk(
    'approvedformdata/getall', async (id: string = '', thunkAPI) => {
        try {
            const response = await ax.get<IData[]>(`/Data?id=${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

export const fetchDataHeader = createAsyncThunk(
    'datatableheaders', async (id: string = '', thunkAPI) => {
        try {
            const response = await ax.get<ICols[]>(`/FormItemColumn?tabId=${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

export const updateData = createAsyncThunk(
    'approvedform/update', async (data: Array<IData>, thunkAPI) => {
        try {
            const response = await ax.put<IApprovedForm>(`/Data`, data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

const dataSlice = createSlice({
    name: 'dataSlice',
    initialState: initialState,
    reducers: {
        update: (state: thisSliceState, action: PayloadAction<IDataUpate>) => {
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id == action.payload.id) {
                    state.data[i].valueJson = action.payload.valueJson;
                    state.synched = false;
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state: thisSliceState, action: PayloadAction<IData[]>) => {
            state.data = action.payload;
        });
        builder.addCase(updateData.fulfilled, (state: thisSliceState, action: PayloadAction<IApprovedForm>) => {
            state.synched = true;
        });
        builder.addCase(fetchDataHeader.fulfilled, (state: thisSliceState, action: PayloadAction<ICols[]>) => {
            state.col = action.payload;
        });
    }
});

// reducer
export const DataReducer = dataSlice.reducer;
// action
export const { update } = dataSlice.actions;
// selector
export const selectTabTable = (state: RootState) => state.data.data;
export const selectTabTableHeader = (state: RootState) => state.data.col;
export const selectTabSync = (state: RootState) => state.data.synched;