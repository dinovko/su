using WebServer.Dtos;
using WebServer.Models;

namespace WebServer.Interfaces
{
    public interface IReport
    {
        public Task<List<ReportsDto>> Get(int katoId);
        public Task<ReportsDto> Add(Report_Form form);
        public Task<List<ReportsDto>> Delete(Guid id);
        Task<List<ApprovedFormItemDto>> GetServices();
        Task<List<ApprovedFormItemColumnServDto>> GetApprovedFormItemColumnsServId(Guid Id);
        Task<List<ApprovedFormItemColumnTableDto>> GetApprovedFormItemColumnTablesById(Guid Id);
        Task<Guid> UpdateApprovedFormItemColumnTable(ApprovedFormItemColumnTableDto model);
    }
}
