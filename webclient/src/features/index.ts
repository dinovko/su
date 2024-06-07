// export { supplyFormReducer, selectSupplyForm } from './supply/form-1/supplyFormSlice'
export { supplyForm1Reducer, selectSupplyForm1 } from './forms/supply/city/form-1/supplyForm1Slice'
export { SupplyForm1 } from './forms/supply/city/form-1/supply-form-1'

export { supplyForm2Reducer, selectSupplyForm2 } from './forms/supply/city/form-2/supplyForm2Slice'
export { SupplyForm2 } from './forms/supply/city/form-2/supply-form-2'

export { supplyForm3Reducer, selectSupplyForm3 } from './forms/supply/city/form-3/supplyForm3Slice'
export { SupplyForm3 } from './forms/supply/city/form-3/supply-form-3'

export { supplyForm4Reducer, selectSupplyForm4 } from './forms/supply/city/form-4/supplyForm4Slice'
export { SupplyForm4 } from './forms/supply/city/form-4/supply-form-4'

export { supplyForm5Reducer, selectSupplyForm5 } from './forms/supply/city/form-5/supplyForm5Slice'
export { SupplyForm5 } from './forms/supply/city/form-5/supply-form-5'

export { reportsReducer, reportsGetAll, reportsAdd } from './reports/reportsSlice'
export { refStreetReducer, fetchStreet, fetchStreetAdd } from './refs/streetSlice'
export { ReportsList } from './reports/reports-list'
export { refKatoReducer, fetchKato, selectRefKatoTree } from './refs/katoSlice'
export { KatoTreeView } from './refs/kato-tree-view'
// export { RPeriodReducer } from './refs/reportingPeriodSlice'
// export { SupplyForm } from './supply/supply-form'
// export { SupplyForm1 } from './forms/supply/form-1/supply-form-1'
// export { KatoForm } from './refs/kato-form'
// export { KatoSelect } from './refs/kato-select'
// export { RPeriod } from './refs/reporting-period'
// export { SupplyPreview } from './supply/supply-preview'
export { accountReducer } from './account/accountSlice'
export { Login } from './account/login';
export { setLoading, loadingReducer } from './loading/loadingSlice';
export { ToggleButtons } from './forms/toggle'
export { WasteTabs } from './forms/tab-waste-city'
export { MapComponent } from './map/MapComponent';

/**водоотведение */
export { wasteCityForm1Reducer, selectWasteCityForm1, selectWasteCityForm1Saved, fetchWasteCityForm1, updateWasteCityForm1 } from './forms/waste/city/form-1/wasteForm1Slice'
