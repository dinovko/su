import { ReactElement } from "react";

export interface IBase {
    id?: string;
    createDate?: Date | null;
    lastModifiedDate?: Date | null;
    description?: string;
}

export interface IKato {
    id: number,
    parentId: number | null;
    code: string;
    label: string,
    latitude?: number;
    longitude?: number;
    userId?: string;
}

export interface IReportingPeriod {
    id: number,
    period: string;
    month: number;
    year: number;
}

//#region modal
export interface IModal {
    children?: never[];
    child: React.ReactNode;
    open: boolean;
    onClose: (v: any) => void;
}
//#endregion

export interface IWaterSupplyForm {
    id?: string;
    authorId?: number;
    supplierId?: number;
    katoId: number;
    street: string;
    houseAddress: string;
    buildingTypeId?: number;
    okedId?: number;
    bin?: string;
}

export interface IWaterSupplyForm1 {
    id?: string;
    homeAddress: string;
    street: string;
    rperiodId: number;
    volume: number;
    no?: number;
}

export interface IWaterWasteForm1 {
    id?: string;
    homeAddress: string;
    street: string;
    rperiodId: number;
    waterVolume: number;
    no?: number;
}

export interface IWaterSupplyForm2 {
    id?: string;
    homeAddress: string;
    street: string;
    coverageWater: number;
    centralizedWaterNumber: number;
    centralizedWaterPercent: number;
}

export interface IWaterSupplyForm3 {
    id?: string;
    homeAddress: string;
    street: string;
    coverageMetersTotalCumulative: number;
    coverageMetersRemoteData: number;
    coverageMetersPercent: number;
}

export interface IWaterSupplyForm4 {
    id?: string;
    homeAddress: string;
    street: string;
    coverageHouseholdNeedNumberBuildings: number;
    coverageHouseholdInstalledBuildings: number;
    coverageHouseholdInstalledCount: number;
    coverageHouseholdRemoteData: number;
    coverageHouseholdPercent: number;
}

export interface IWaterSupplyForm5 {
    id?: string;
    homeAddress: string;
    street: string;
    scadaWaterIntake: number;
    scadaWaterTreatment: number;
    scadaStations: number;
    scadaSupplyNetworks: number;
}

export interface IWaterSupplyVillageForm2 {
    id?: string;
    formId: string;
    rperiodId: number;
    PopulationNumber: number;
    CentralizedWaterPercentGR19: number;
    CentralizedWaterPercentGR20: number;
    CentralizedWaterNumber: number;
    CoverageMetersTotalIndividual: number;
    CoverageMetersRemoteData: number;
    CoverageMetersPercent: number;
    CentralizedWaterPercent: number;
}

export interface IWaterSupplyVillageForm3 {
    id?: string;
    formId: string;
    rperiodId: number;
    RuralSettlementsNumber: number;
    KbmInstalledSettelmentsPopulation: number;
    KbmServiceProvision: number;
    PrvInstalledSettelmentsPopulation: number;
    PrvServiceProvision: number;
    ImportedWaterSettelmentsPopulation: number;
    ImportedWaterProvisionPopulation: number;
    WellsRuralSettlementsNumber: number;
    WellsImportedWaterProvisionPopulation: number;
    RuralSettlementsNumberRefusedCwsKbmPrv: number;
    PopulationNumberRefusedCwsKbmPrv: number;
    PercentagePopulationNumberRefusedCwsKbmPrvGR44: number;
    PercentageVillageRefusedCwsKbmPrvGR43: number;
}

export interface IWaterSupplyPreview {
    katoLvl1: string;
    katoLvlCode: string;
    /**Общее количество городов в области (единиц)*/
    totalCitiesInRegion: number;
    /**домохозяйств (кв, ИЖД) */
    totalHouseholdsInRegion: number;
    /**проживающих в городских населенных пунктах (человек) */
    totalResidentsInRegion: number;
    /**Обслуживающее предприятие */
    /** БИН*/
    serviceCompanyBIN: string;
    /** Наименование*/
    serviceCompanyName: string;

    /**Водоснабжение */
    /**село форма 2 */
    VillageCentralizedWaterNumber: number;
    /**TODO разобраться откуда брать */
    /*в том числе*/
    invididualNumber: number;
    legalNumber: number;
    budgetaryNumber: number;
    /**Водоснабжение форма 2 город */
    CentralizedWaterNumber: number;
    CentralizedWaterPercent: number;
    /**Город форма 3 */
    CoverageMetersTotalCumulative: number;
    CoverageMetersRemoteDaata: number;
    CoverageMetersPercent: number;
    /**город форма 4 */
    CoverageHouseholdNeedNumberBuildings: number;
    CoverageHouseholdInstalledBuildings: number;
    CoverageHouseholdInstalledCount: number;
    CoverageHouseholdRemoteData: number;
    CoverageHouseholdPercent: number;
    /**город форма 5 */
    ScadaWaterIntake: number;
    ScadaWaterTreatment: number;
    ScadaStations: number;
    ScadaSupplyNetworks: number;
}

export interface IPipeline {
    id?: string;
    formId: string;
    rperiodId: number;
    totalPipelineLength: number;
    wornPipelineLength: number;
    totalSewerNetworkLength: number;
    wornSewerNetworkLength: number;
    newWaterSupplyNetworkLength: number;
    newWastewaterNetworkLength: number;
    reconstructedNetworkLength: number;
    reconstructedWastewaterNetworkLength: number;
    repairedWaterSupplyNetworkLength: number;
    repairedWastewaterNetworkLength: number;
    totalPopulation: number;
}

export interface IAccount {
    bin: string;
    fullName: string;
    email: string;
    isAuth: boolean;
    token: string | null;
}

export interface IToken {
    login: string; // suadmin@su.qz;
    userid: string; // d179cb60-49b9-4403-9264-785129358a57;
    role: string; // operator;
    bin: string; // -;
    kcd: number;// 100000000;
    kid: number;// 1;
    exp: number;// 1716159600;
}

//#region DTO
export interface IKatoDTO {
    code: number;
    description: string | null;
    id: number;
    isDel: boolean;
    isReportable: boolean;
    latitude: number | null;
    longitude: number | null;
    name: string | null;
    parentId: number;
    userId: number | string | null;
    children: IKatoDTO[] | [];
}

export interface IKeyValDTO {
    id?: any;
    formId?: any;
    key?: any;
    val?: any;
}

export interface ISignInDTO {
    login: string;
    pwd: string;
    rem: boolean;
}

export interface ISignInResponseDTO {
    token: string;
    login: string;
    rem: boolean;
}

export interface IPageResultDto<T> {
    totalCount: number;
    items: T[];
    totalPages: number;
    pageNumber: number;
    pageSize: number;
    filter: string;
}

export interface IPageQueryDto {
    pageNumber: number;
    pageSize: number;
    filter: string;
}

export interface IKatoTreeViewDto {
    parentId: number;
    code: number;
    latitude: string | null;
    longitude: string | null;
    userId: string | null;
    label: string;
    id: number;
    name: string;
    nameKk: string | null;
    isDel: boolean,
    description: string | null;
    children: IKatoTreeViewDto[]
}

export interface ISimpleTreeView {
    itemId: string | number;
    label: string;
    children: ISimpleTreeView[] | [];
}

/**
 * "parentId": 0,
    "code": 330000000,
    "latitude": null,
    "longitude": null,
    "userId": null,
    "id": 7380,
    "nameRu": "область Жетісу",
    "nameKk": null,
    "isDel": false,
    "description": null
 */

export interface FormDto {
    id: string;
    year: number;
    monthId: number;
    monthName: string;
    status: string;
    linkToForm: string;
}

export interface IFormAddDto {
    refKatoId: number;
    supplierId: number;
    reportYearId: number;
    reportMonthId: number;
    desctiption: string;
}

export interface IFormPeriod {
    year: number;
    month: number;
}

export interface IRefStreetDto {
    id?: number;
    nameRu: string;
    desctiption?: string;
    refKatoId: number;
}

export interface IRefBuildingDto {
    id?: number;
    nameRu: string;
    building: string;
    desctiption?: string;
    refStreetId: number;
}

export interface IFormUpdateDto<T> {
    payload: T[],
    id: string;
}

export interface IMenu {
    navUrl?: string,
    title: string,
    children?: IMenu[],
}
/**
public Guid Id { get; set; }
public int Year { get; set; }
public int MonthId { get; set; }
public string MonthName { get; set; }
public string Status { get; set; }
public string? LinkToForm { get; set; }
 */
//#endregion