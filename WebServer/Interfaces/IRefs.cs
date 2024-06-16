using WebServer.Dtos;

namespace WebServer.Interfaces
{
    public interface IRefs
    {
        public Task<List<RefRoleDto>> GetRefList();
    }
}
