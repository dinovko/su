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
        private readonly DbSet<Universal_Refference> _dbSetUniver;
        private readonly DbSet<Business_Dictionary> _dbSetBusines;

        public RefsRepository(WaterDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<Ref_Role>();
            _dbSetUniver = _context.Set<Universal_Refference>();
            _dbSetBusines = _context.Set<Business_Dictionary>();
        }

        public async Task<List<RefRoleDto>> GetRefRolesList()
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

        public async Task<List<RefUniverRefDto>> GetRefUniverList()
        {
            return await _dbSetUniver.Select(x => new RefUniverRefDto 
            { 
                Id = x.Id, 
                ParentId = x.ParentId,
                Code = x.Code,
                Type = x.Type,
                BusinessDecription = x.BusinessDecription,
                NameRu = x.NameRu,
                NameKk = x.NameKk,
                IsDel = x.IsDel,
                Description = x.Description
            }).ToListAsync();            
        }

        public async Task<List<RefBusinesDictDto>> GetBusinesDictList()
        {
            return await _dbSetBusines.Select(x => new RefBusinesDictDto
            {
                Id = x.Id,
                ParentId = x.ParentId,
                Code = x.Code,
                Type = x.Type,
                BusinessDecription = x.BusinessDecription,
                NameRu = x.NameRu,
                NameKk = x.NameKk,
                IsDel = x.IsDel,
                Description = x.Description
            }).ToListAsync();
        }
    }
}
