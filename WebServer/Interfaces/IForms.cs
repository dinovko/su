using WebServer.Dtos;

namespace WebServer.Interfaces
{
    public interface IForms
    {
        public Task<List<FormDto>> GetFormsByKatoId(int id);
        public Task<FormDto> AddForm(FormsAddDto row);

        #region водоснабжение
        #region город
        public Task<List<SupplyCityForm1TableDto>> SupplyCityGetForm1(Guid id);
        public Task<List<SupplyCityForm1TableDto>> SupplyCityUpdateForm1(List<SupplyCityForm1TableDto> list, Guid id);
        public Task<List<SupplyCityForm2TableDto>> SupplyCityGetForm2(Guid id);
        public Task<List<SupplyCityForm2TableDto>> SupplyCityUpdateForm2(List<SupplyCityForm2TableDto> list, Guid id);
        public Task<List<SupplyCityForm3TableDto>> SupplyCityGetForm3(Guid id);
        public Task<List<SupplyCityForm3TableDto>> SupplyCityUpdateForm3(List<SupplyCityForm3TableDto> list, Guid id);
        public Task<List<SupplyCityForm4TableDto>> SupplyCityGetForm4(Guid id);
        public Task<List<SupplyCityForm4TableDto>> SupplyCityUpdateForm4(List<SupplyCityForm4TableDto> list, Guid id);
        public Task<List<SupplyCityForm5TableDto>> SupplyCityGetForm5(Guid id);
        public Task<List<SupplyCityForm5TableDto>> SupplyCityUpdateForm5(List<SupplyCityForm5TableDto> list, Guid id);
        #endregion
        #region село
        Task<List<SupplyCityForm1TableDto>> SupplyVillageGetForm1(Guid id);
        Task<List<SupplyCityForm1TableDto>> SupplyVillageUpdateForm1(List<SupplyCityForm1TableDto> list, Guid id);
        Task<List<SupplyCityForm2TableDto>> SupplyVillageGetForm2(Guid id);
        Task<List<SupplyCityForm2TableDto>> SupplyVillageUpdateForm2(List<SupplyCityForm2TableDto> list, Guid id);
        Task<List<SupplyCityForm3TableDto>> SupplyVillageGetForm3(Guid id);
        Task<List<SupplyCityForm3TableDto>> SupplyVillageUpdateForm3(List<SupplyCityForm3TableDto> list, Guid id);

        #endregion
        #endregion

        #region Водоотведение
        #region Город
        public Task<List<WasteCityForm1TableDto>> WasteCityGetForm1(Guid id);
        public Task<List<WasteCityForm1TableDto>> WasteCityUpdateForm1(List<WasteCityForm1TableDto> list, Guid id);
        public Task<List<WasteCityForm2TableDto>> WasteCityGetForm2(Guid id);
        public Task<List<WasteCityForm2TableDto>> WasteCityUpdateForm2(List<WasteCityForm2TableDto> list, Guid id);
        public Task<List<WasteCityForm3TableDto>> WasteCityGetForm3(Guid id);
        public Task<List<WasteCityForm3TableDto>> WasteCityUpdateForm3(List<WasteCityForm3TableDto> list, Guid id);
        #endregion

        #region Село
        Task<List<WasteCityForm1TableDto>> WasteVillageGetForm1(Guid id);
        Task<List<WasteCityForm1TableDto>> WasteVillageUpdateForm1(List<WasteCityForm1TableDto> list, Guid id);
        Task<List<WasteCityForm2TableDto>> WasteVillageGetForm2(Guid id);
        Task<List<WasteCityForm2TableDto>> WasteVillageUpdateForm2(List<WasteCityForm2TableDto> list, Guid id);
        #endregion

        #endregion

        //public Task<PageResultDto<FormTableDto>> GetFormStreets(PageQueryDto query, int k);
        //public Task<PageResultDto<ReportsDto>> GetReportsByKatoId(PageQueryDto query, int k);
        //public Task<PageResultDto<FormKatoDto>> GetForm1(PageQueryDto query, Guid formid);
        //public Task<PageResultDto<FormKatoDto>> GetForm2(PageQueryDto query, Guid formid);
        //public Task<PageResultDto<FormKatoDto>> GetForm3(PageQueryDto query, Guid formid);
        //public Task<PageResultDto<FormKatoDto>> GetForm4(PageQueryDto query, Guid formid);
        //public Task<PageResultDto<FormKatoDto>> GetForm5(PageQueryDto query, Guid formid);
        //public Task<FormKatoDto> UpdateForm(FormKatoDto form);
        //public Task<FormKatoDto> DeleteFormKato();
        //public Task<FormKatoDto> GetTreeByKatoId(int katoId);
    }
}
