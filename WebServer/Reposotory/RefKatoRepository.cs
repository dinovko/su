using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebServer.Data;
using WebServer.Interfaces;
using WebServer.Models;

namespace WebServer.Reposotory
{
    public class RefKatoRepository : IRefKato
    {
        private readonly WaterDbContext _context;
        private readonly DbSet<Ref_Kato> _dbSet;
        private readonly DbSet<Ref_Street> _dbSetStreet;
        private readonly DbSet<Ref_Building> _dbSetBuilding;
        public RefKatoRepository(WaterDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<Ref_Kato>();
            _dbSetStreet = _context.Set<Ref_Street>();
            _dbSetBuilding = _context.Set<Ref_Building>();
        }

        public async Task<List<Ref_Kato>> GetRefKatoAsync(int parentId)
        {
            try
            {
                return await _dbSet.Where(x => x.ParentId == parentId).ToListAsync();
            }
            catch (Exception ex)
            {
                return new List<Ref_Kato>();
            }
        }

        public async Task<List<Ref_Street>> GetRefStreetByKatoId(int id)
        {
            return await _dbSetStreet.Where(x => x.RefKatoId == id).ToListAsync();
        }
        public async Task<List<Ref_Building>> GetRefBuildingByStreetId(int id)
        {
            return await _dbSetBuilding.Where(x => x.RefStreetId == id).ToListAsync();
        }

        public async Task<Ref_Street> AddStreet(Ref_Street row)
        {
            try
            {
                await _dbSetStreet.AddAsync(row);
                await _context.SaveChangesAsync();
                return row;
            }
            catch (Exception)
            {
                throw new Exception("ошибка при добавлении улицы");
            }
        }

        public async Task<Ref_Street> UpdateStreet(Ref_Street row, int id)
        {
            _dbSetStreet.Attach(row);
            _context.Entry(row).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return row;
        }

        public async Task DeleteStreet(int id)
        {
            var entity = await _dbSetStreet.FindAsync(id);
            if (entity != null)
            {
                _dbSetStreet.Remove(entity);
                await _context.SaveChangesAsync();
            }
            return;
        }

        public async Task<Ref_Building> AddBuilding(Ref_Building row)
        {
            _dbSetBuilding.Add(row);
            await _context.SaveChangesAsync();
            return row;
        }

        public async Task<Ref_Building> UpdateBuilding(Ref_Building row, int id)
        {
            _dbSetBuilding.Attach(row);
            _context.Entry(row).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return row;
        }

        public async Task DeleteBuilding(int id)
        {
            var entity = await _dbSetBuilding.FindAsync(id);
            if (entity != null)
            {
                _dbSetBuilding.Remove(entity);
                await _context.SaveChangesAsync();
            }
            return;
        }
        public async Task<bool> IsReportable(int id)
        {
            var entity = await _dbSet.FirstOrDefaultAsync(x => x.Id == id);
            if (entity != null)
            {
                return entity.IsReportable;
            }
            return false;
        }
    }
}
