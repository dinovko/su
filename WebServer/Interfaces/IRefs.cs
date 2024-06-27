using WebServer.Dtos;

namespace WebServer.Interfaces
{
    public interface IRefs
    {
        public Task<List<RefRoleDto>> GetRefRolesList();
        public Dictionary<int, string> GetDataTypes();
        Task<List<RefIdGuidDto>> GetRefUniverList();
        Task<List<RefIdGuidDto>> GetBusinesDictList();
    }
}
