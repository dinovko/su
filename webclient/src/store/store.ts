import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistStore,
} from "redux-persist";
import localStorage from "redux-persist/es/storage";
import {
    refKatoReducer,
    accountReducer,
    reportsReducer,
    refStreetReducer,
    loadingReducer,
    unformReducer,
    unformItemReducer,
    unformItemColumnReducer,
    DataReducer,
} from '../features/index';

const rootReducer = combineReducers({
    loading: loadingReducer,
    reports: reportsReducer,
    kato: refKatoReducer,
    refStreet: refStreetReducer,
    acc: accountReducer,
    unf: unformReducer,
    unfItem: unformItemReducer,
    unfCol: unformItemColumnReducer,
    data: DataReducer,
});

const persistConfig = {
    key: 'root',
    storage: localStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddlare) => getDefaultMiddlare({
        serializableCheck: {
            ignoredActions: [FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER,]
        }
    }),
});

export const persister = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;