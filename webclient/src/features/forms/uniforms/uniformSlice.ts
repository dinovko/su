import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import { IApprovedForm } from "types";
import ax from 'utils/axios';

interface thisSliceState {
    data: IApprovedForm[],
}

const initialState: thisSliceState = {
    data: [],
}

export const fetchApprovedForm = createAsyncThunk(
    'approvedform/getall', async (payload: string = '', thunkAPI) => {
        try {
            const response = await ax.get<IApprovedForm[]>(`/Form`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

export const addApprovedForm = createAsyncThunk(
    'approvedform/add', async (payload: IApprovedForm, thunkAPI) => {
        try {
            const response = await ax.post<IApprovedForm>(`/Form`, payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

export const updateApprovedForm = createAsyncThunk(
    'approvedform/update', async (payload: IApprovedForm, thunkAPI) => {
        try {
            const response = await ax.put<IApprovedForm>(`/Form`, payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

export const deleteApprovedForm = createAsyncThunk(
    'approvedform/delete', async (id: string, thunkAPI) => {
        try {
            const response = await ax.delete<IApprovedForm>(`/Form?id=${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

const unformSlice = createSlice({
    name: 'unformSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchApprovedForm.fulfilled, (state: thisSliceState, action: PayloadAction<IApprovedForm[]>) => {
            state.data = action.payload;
        });
        builder.addCase(addApprovedForm.fulfilled, (state: thisSliceState, action: PayloadAction<IApprovedForm>) => {
            // state.data = action.payload;
        });
        builder.addCase(updateApprovedForm.fulfilled, (state: thisSliceState, action: PayloadAction<IApprovedForm>) => {
            // state.data = action.payload;
        });
        builder.addCase(deleteApprovedForm.fulfilled, (state: thisSliceState, action: PayloadAction<IApprovedForm>) => {
            // state.data = action.payload;
        });
    }
});

// reducer
export const unformReducer = unformSlice.reducer;
// action
export const {} = unformSlice.actions;
// selector
export const selectUniform = (state: RootState) => state.unf.data;