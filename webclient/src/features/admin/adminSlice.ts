import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import { IRole, ISignUpDTO, ISignUpResponseDTO } from "types";
import ax from 'utils/axios';

interface thisSliceState {
    isLoading: boolean,
    isError: boolean,
    error: string,
    accounts?: any[],
    roles: IRole[],
    user: ISignUpResponseDTO
    //registrationData: IRegistrationData
}

const initialState: thisSliceState = {
    isLoading: false,
    isError: false,
    error: '',
    roles: [{
        id: 0,
        label: ''
    }],
    user: {
        login: '',
        password: ''
    }
    /* ,
    registrationData: {
        login: '',
        password: '',
        katoCode: 0,
        roles: []
      }, */
}

export const fetchSignUp = createAsyncThunk(
    'account/signUp', async (payload: ISignUpDTO, thunkAPI) => {
        try {
            const response = await ax.post<ISignUpResponseDTO>('/Account/SignUp', payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState: initialState,
    reducers: {
        newAccount: (state: thisSliceState, action: PayloadAction<boolean>) => {
            state.roles = [];
            state.accounts = [];
            sessionStorage.clear();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSignUp.fulfilled, (state: thisSliceState, action: PayloadAction<ISignUpResponseDTO>) => {
            state.user.login = action.payload.login;
            state.user.password = action.payload.password;
            // state.data.token = action.payload.token;
        })
    },
});

// reducer
export const adminReducer = adminSlice.reducer;
// action
export const { newAccount } = adminSlice.actions;
// selector
export const selectAdmin = (state: RootState) => state.adm.user;

/* const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
      updateRegistrationData: (state, action) => {
        state.registrationData[action.payload.field] = action.payload.value;
      },
      setRegistrationError: (state, action) => {
        state.registrationError = action.payload;
      },
      setRegistrationSuccess: (state) => {
        state.isRegistrationSuccess = true;
      },
    },
  }); */