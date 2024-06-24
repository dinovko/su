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
    // supplyFormReducer,
    supplyForm1Reducer,
    supplyForm2Reducer,
    supplyForm3Reducer,
    supplyForm4Reducer,
    supplyForm5Reducer,
    refKatoReducer,
    // RPeriodReducer,
    accountReducer,
    reportsReducer,
    refStreetReducer,
    loadingReducer,
    /**водоотведение */
    wasteCityForm1Reducer,
    // водопровод
    pipelineReducer,
    unformReducer,
    unformItemReducer,
    unformItemColumnReducer,
} from '../features/index';
import { adminReducer } from "features/admin/adminSlice";

const rootReducer = combineReducers({
    loading: loadingReducer,
    reports: reportsReducer,
    // supplyForm: supplyFormReducer,
    supplyForm1: supplyForm1Reducer,
    supplyForm2: supplyForm2Reducer,
    supplyForm3: supplyForm3Reducer,
    supplyForm4: supplyForm4Reducer,
    supplyForm5: supplyForm5Reducer,
    kato: refKatoReducer,
    refStreet: refStreetReducer,
    // rp: RPeriodReducer,
    acc: accountReducer,
    /**водоотведение */
    wasteForm1: wasteCityForm1Reducer,
    // водопровод
    pipe: pipelineReducer,
<<<<<<< HEAD
    unf: unformReducer,
    unfItem: unformItemReducer,
    unfCol: unformItemColumnReducer,
=======
    adm: adminReducer
>>>>>>> Admin-Fr
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