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
        Task<List<ApprovedFormItemColumnDto>> GetServiceById(Guid Id);
    }
}
