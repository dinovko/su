using Microsoft.EntityFrameworkCore;
using WebServer.Data;
using WebServer.Dtos;
using WebServer.Emuns;
using WebServer.Interfaces;
using WebServer.Models;

namespace WebServer.Reposotory
{
    public class RefsRepository: IRefs
    {
        private readonly WaterDbContext _context;
        private readonly DbSet<Ref_Role> _dbSet;

        public RefsRepository(WaterDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<Ref_Role>();
        }

        public async Task<List<RefRoleDto>> GetRefList()
        {
            var list = await _dbSet.Select(x => new RefRoleDto { Id = x.Id, Label = x.Code }).ToListAsync();
            return list;
        }

        public Dictionary<int,string> GetDataTypes()
        {
            Dictionary<int,string> enums = new Dictionary<int,string>();
            foreach (var item in Enum.GetValues(typeof(Enums.DataTypeEnum)))
            {
                enums.Add((int)item, item.ToString());
            }
            return enums;
        }
    }
}
