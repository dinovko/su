using WebServer.Dtos;

namespace WebServer.Interfaces
{
    public interface IRefs
    {
        public Task<List<RefRoleDto>> GetRefRolesList();
        public Dictionary<int, string> GetDataTypes();
        Task<List<RefUniverRefDto>> GetRefUniverList();
        Task<List<RefBusinesDictDto>> GetBusinesDictList();
    }
}
