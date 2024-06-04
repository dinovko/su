import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { IAccount, IKeyValDTO, IPageQueryDto, IRefBuildingDto, IRefStreetDto, ISignInDTO, ISignInResponseDTO, IWaterSupplyForm, IWaterSupplyForm1 } from "../../types";
import { RootState } from '../../store/store';
import { generateGUID } from "utils/uuid";
import ax from 'utils/axios';
import { GetQuery } from "utils/ObjToQuery";

interface thisSliceState {
    isLoading: boolean,
    isError: boolean,
    error: string,
    data: IRefStreetDto[],
    data2: IRefBuildingDto[],
}

const initialState: thisSliceState = {
    isLoading: false,
    isError: false,
    error: '',
    data: [],
    data2: [],
}

//#region street
export const fetchStreet = createAsyncThunk(
    'refs/street/getall', async (payload: number, thunkAPI) => {
        try {
            const response = await ax.get<IRefStreetDto[]>(`/RefKato/street?id=${payload}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

export const fetchStreetAdd = createAsyncThunk(
    'refs/street/add', async (payload: IRefStreetDto, thunkAPI) => {
        try {
            const response = await ax.post<IRefStreetDto>(`/RefKato/street`, payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

//#endregion
//#region building
export const fetchBuilding = createAsyncThunk(
    'refs/building/getall', async (payload: number, thunkAPI) => {
        try {
            const response = await ax.get<IRefBuildingDto[]>(`/RefKato/building?id=${payload}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

export const fetchBuildingAdd = createAsyncThunk(
    'refs/building/add', async (payload: IRefBuildingDto, thunkAPI) => {
        try {
            const response = await ax.post<IRefBuildingDto>(`/RefKato/building`, payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)
//#endregion

const refStreetSlice = createSlice({
    name: 'refs/street',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStreet.fulfilled, (state: thisSliceState, action: PayloadAction<IRefStreetDto[]>) => {
            state.data = action.payload;
        })
        builder.addCase(fetchBuilding.fulfilled, (state: thisSliceState, action: PayloadAction<IRefBuildingDto[]>) => {
            state.data2 = action.payload;
        })
    },
});

// reducer
export const refStreetReducer = refStreetSlice.reducer;
// action
export const { } = refStreetSlice.actions;
// selector
export const selectRefStreets = (state: RootState) => state.refStreet.data;
export const selectRefBuildings = (state: RootState) => state.refStreet.data2;