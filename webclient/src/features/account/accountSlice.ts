import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { IAccount, IKeyValDTO, IPageQueryDto, ISignInDTO, ISignInResponseDTO, IWaterSupplyForm, IWaterSupplyForm1 } from "../../types";
import { RootState } from '../../store/store';
import { generateGUID } from "utils/uuid";
import ax from 'utils/axios';
import { GetQuery } from "utils/ObjToQuery";

interface thisSliceState {
    isLoading: boolean,
    isError: boolean,
    error: string,
    activeRow?: any,
    data: IAccount,
}

const initialState: thisSliceState = {
    isLoading: false,
    isError: false,
    error: '',
    data: {
        token: null,
        isAuth: false,
        bin: '',
        email: '',
        fullName: ''
    }
}

export const fetchSignIn = createAsyncThunk(
    'account/signIn', async (payload: ISignInDTO, thunkAPI) => {
        try {
            const response = await ax.post<ISignInResponseDTO>('/Account/signin', payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

export const fetchGetAll = createAsyncThunk(
    'account/getall', async (payload: IPageQueryDto, thunkAPI) => {
        try {
            const response = await ax.get<ISignInResponseDTO>(`/Account/list${GetQuery(payload)}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

const accountSlice = createSlice({
    name: 'accountSlice',
    initialState: initialState,
    reducers: {
        logout: (state: thisSliceState, action: PayloadAction<boolean>) => {
            state.data.token = null;
            state.data.isAuth = false;
            sessionStorage.clear();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSignIn.fulfilled, (state: thisSliceState, action: PayloadAction<ISignInResponseDTO>) => {
            state.data.email = action.payload.login;
            state.data.isAuth = true;
            // state.data.token = action.payload.token;
            const { token } = action.payload;
            sessionStorage.setItem('X-TOKEN', token);
            ax.defaults.headers.common.Authorization = `Bearer ${token}`;
        })
    },
});

// reducer
export const accountReducer = accountSlice.reducer;
// action
export const { logout } = accountSlice.actions;
// selector
export const selectAccount = (state: RootState) => state.acc.data;