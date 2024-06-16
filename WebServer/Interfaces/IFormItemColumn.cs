using WebServer.Models;

namespace WebServer.Interfaces
{
    public interface IFormItemColumn
    {
        public Task<List<ApprovedFormItemColumn>> GetForms(Guid tabId);
        public Task<ApprovedFormItemColumn> Add(ApprovedFormItemColumn aForm);
        public Task<ApprovedFormItemColumn> Update(ApprovedFormItemColumn aForm);
        public Task<ApprovedFormItemColumn> Delete(Guid id);
    }
}
