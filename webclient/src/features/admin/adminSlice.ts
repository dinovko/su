import { IRole } from "types";

interface thisSliceState {
    isLoading: boolean,
    isError: boolean,
    error: string,
    accounts?: any[],
    roles: IRole[],
}

const initialState: thisSliceState = {
    isLoading: false,
    isError: false,
    error: '',
    roles: [{
        id: 0,
        label: ''
    }] 
}