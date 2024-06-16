import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import { IApprovedFormItem } from "types";
import ax from 'utils/axios';

interface thisSliceState {
    data: IApprovedFormItem[],
}

const initialState: thisSliceState = {
    data: [],
}

export const fetchApprovedFormItem = createAsyncThunk(
    'approvedformItem/getall', async (formid: string = '', thunkAPI) => {
        try {
            const response = await ax.get<IApprovedFormItem[]>(`/FormItem?formid=${formid}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

export const addApprovedFormItem = createAsyncThunk(
    'approvedformItem/add', async (payload: IApprovedFormItem, thunkAPI) => {
        try {
            const response = await ax.post<IApprovedFormItem>(`/FormItem`, payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

export const updateApprovedFormItem = createAsyncThunk(
    'approvedformItem/update', async (payload: IApprovedFormItem, thunkAPI) => {
        try {
            const response = await ax.put<IApprovedFormItem>(`/FormItem`, payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

export const deleteApprovedFormItem = createAsyncThunk(
    'approvedformItem/delete', async (id: string, thunkAPI) => {
        try {
            const response = await ax.delete<IApprovedFormItem>(`/FormItem?id=${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

const unformItemSlice = createSlice({
    name: 'unformItemSlice',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchApprovedFormItem.fulfilled, (state: thisSliceState, action: PayloadAction<IApprovedFormItem[]>) => {
            state.data = action.payload;
        });
        builder.addCase(addApprovedFormItem.fulfilled, (state: thisSliceState, action: PayloadAction<IApprovedFormItem>) => {
            // state.data = action.payload;
        });
        builder.addCase(updateApprovedFormItem.fulfilled, (state: thisSliceState, action: PayloadAction<IApprovedFormItem>) => {
            // state.data = action.payload;
        });
        builder.addCase(deleteApprovedFormItem.fulfilled, (state: thisSliceState, action: PayloadAction<IApprovedFormItem>) => {
            // state.data = action.payload;
        });
    }
});

// reducer
export const unformItemReducer = unformItemSlice.reducer;
// action
export const { } = unformItemSlice.actions;
// selector
export const selectUniformItem = (state: RootState) => state.unfItem.data;