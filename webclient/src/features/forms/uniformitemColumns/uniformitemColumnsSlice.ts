import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import { IApprovedFormItemColumn } from "types";
import ax from 'utils/axios';

interface thisSliceState {
    data: IApprovedFormItemColumn[],
}

const initialState: thisSliceState = {
    data: [],
}

export const fetchApprovedFormItemColumn = createAsyncThunk(
    'approvedformItemColumn/getall', async (tabId: string = '', thunkAPI) => {
        try {
            const response = await ax.get<IApprovedFormItemColumn[]>(`/FormItemColumn?tabId=${tabId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

export const addApprovedFormItemColumn = createAsyncThunk(
    'approvedformItemColumn/add', async (payload: IApprovedFormItemColumn, thunkAPI) => {
        try {
            const response = await ax.post<IApprovedFormItemColumn>(`/FormItemColumn`, payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

export const updateApprovedFormItemColumn = createAsyncThunk(
    'approvedformItemColumn/update', async (payload: IApprovedFormItemColumn, thunkAPI) => {
        try {
            const response = await ax.put<IApprovedFormItemColumn>(`/FormItemColumn`, payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

export const deleteApprovedFormItemColumn = createAsyncThunk(
    'approvedformItemColumn/delete', async (id: string, thunkAPI) => {
        try {
            const response = await ax.delete<IApprovedFormItemColumn>(`/FormItemColumn?id=${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

const unformItemColumnSlice = createSlice({
    name: 'unformItemColumnSlice',
    initialState: initialState,
    reducers: {
        addColumn: (state: thisSliceState, action: PayloadAction<IApprovedFormItemColumn>) => {
            state.data.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchApprovedFormItemColumn.fulfilled, (state: thisSliceState, action: PayloadAction<IApprovedFormItemColumn[]>) => {
            state.data = action.payload;
        });
        builder.addCase(addApprovedFormItemColumn.fulfilled, (state: thisSliceState, action: PayloadAction<IApprovedFormItemColumn>) => {
            // state.data = action.payload;
        });
        builder.addCase(updateApprovedFormItemColumn.fulfilled, (state: thisSliceState, action: PayloadAction<IApprovedFormItemColumn>) => {
            // state.data = action.payload;
        });
        builder.addCase(deleteApprovedFormItemColumn.fulfilled, (state: thisSliceState, action: PayloadAction<IApprovedFormItemColumn>) => {
            // state.data = action.payload;
        });
    }
});

// reducer
export const unformItemColumnReducer = unformItemColumnSlice.reducer;
// action
export const { addColumn } = unformItemColumnSlice.actions;
// selector
export const selectUniformCols = (state: RootState) => state.unfCol.data;