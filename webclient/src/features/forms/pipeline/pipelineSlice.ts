import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IFormUpdateDto, IKeyValDTO, IPipeline, IWaterSupplyForm1 } from "types";
import { RootState } from 'store/store';
import ax from 'utils/axios';

interface thisSliceState {
    isLoading: boolean,
    isError: boolean,
    error: string,
    activeRow?: any,
    data: IPipeline[],
    isSaved: boolean,
}

const initialState: thisSliceState = {
    isLoading: false,
    isError: false,
    error: '',
    data: [],
    isSaved: true,
}

export const fetchPipline = createAsyncThunk(
    'form/pipeline/getall', async (payload: string, thunkAPI) => {
        try {
            const response = await ax.get<IPipeline[]>(`/Form/pipeline/list?id=${payload}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

export const updatePipline = createAsyncThunk(
    'form/pipeline/update', async (payload: IFormUpdateDto<IPipeline>, thunkAPI) => {
        try {
            const response = await ax.post<IPipeline[]>(`/Form/pipeline/list/update?id=${payload.id}`, payload.payload);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("ошибка");
        }
    }
)

const pipelineSlice = createSlice({
    name: 'pipelineSlice',
    initialState: initialState,
    reducers: {
        updatePipelinePropByName: (state: thisSliceState, action: PayloadAction<IKeyValDTO>) => {
            const { id, key, val } = action.payload;

            let index = state.data.findIndex(x => x.id == id);
            if (index == -1) return;

            switch (key) {
                case 'totalPipelineLength':
                    state.data[index].totalPipelineLength = Number.parseInt(val);
                    break;
                case 'wornPipelineLength':
                    state.data[index].wornPipelineLength = Number.parseInt(val);
                    break;
                case 'totalSewerNetworkLength':
                    state.data[index].totalSewerNetworkLength = Number.parseInt(val);
                    break;
                case 'wornSewerNetworkLength':
                    state.data[index].wornSewerNetworkLength = Number.parseInt(val);
                    break;
                case 'newWaterSupplyNetworkLength':
                    state.data[index].newWaterSupplyNetworkLength = Number.parseInt(val);
                    break;
                case 'newWastewaterNetworkLength':
                    state.data[index].newWastewaterNetworkLength = Number.parseInt(val);
                    break;
                case 'reconstructedNetworkLength':
                    state.data[index].reconstructedNetworkLength = Number.parseInt(val);
                    break;
                case 'reconstructedWastewaterNetworkLength':
                    state.data[index].reconstructedWastewaterNetworkLength = Number.parseInt(val);
                    break;
                case 'repairedWaterSupplyNetworkLength':
                    state.data[index].repairedWaterSupplyNetworkLength = Number.parseInt(val);
                    break;
                case 'repairedWastewaterNetworkLength':
                    state.data[index].repairedWastewaterNetworkLength = Number.parseInt(val);
                    break;
                case 'totalPopulation':
                    state.data[index].totalPopulation = Number.parseInt(val);
                    break;

                default:
                    break;
            }

            state.isSaved = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPipline.fulfilled, (state: thisSliceState, action: PayloadAction<IPipeline[]>) => {
            state.data = action.payload;
            state.isSaved = true;
        })
        builder.addCase(updatePipline.fulfilled, (state: thisSliceState, action: PayloadAction<IPipeline[]>) => {
            state.data = action.payload;
            state.isSaved = true;
        })
    }
});

// reducer
export const pipelineReducer = pipelineSlice.reducer;
// action
export const { updatePipelinePropByName } = pipelineSlice.actions;
// selector
export const selectPipeline = (state: RootState) => state.pipe.data;
export const selectPipelineSaved = (state: RootState) => state.pipe.isSaved;