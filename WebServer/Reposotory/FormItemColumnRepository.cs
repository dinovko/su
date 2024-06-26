using Microsoft.EntityFrameworkCore;
using WebServer.Data;
using WebServer.Interfaces;
using WebServer.Models;

namespace WebServer.Reposotory
{
    public class FormItemColumnRepository : IFormItemColumn
    {
        private readonly WaterDbContext _context;
        private readonly DbSet<ApprovedFormItemColumn> _dbSetForm;
        private readonly IHttpContextAccessor _httpContext;
        public FormItemColumnRepository(WaterDbContext context, IHttpContextAccessor httpContext)
        {
            _context = context;
            _httpContext = httpContext;
            _dbSetForm = _context.Set<ApprovedFormItemColumn>();
        }

        public async Task<ApprovedFormItemColumn> Add(ApprovedFormItemColumn aForm)
        {
            var col = await _dbSetForm.FirstOrDefaultAsync(x=>x.Id == aForm.Id);
            if (col != null)
            {
                return await Update(aForm);
            }
            await _dbSetForm.AddAsync(aForm);
            try
            {
                await _context.SaveChangesAsync();
                return aForm;
            }
            catch (Exception)
            {
                throw new Exception("Ошибка при создании формы");
            }
        }

        public async Task<ApprovedFormItemColumn> Delete(Guid id)
        {
            var item = await _dbSetForm.FindAsync(id);
            if (item == null)
            {
                throw new Exception("Объект не найден");
            }
            _dbSetForm.Remove(item);
            try
            {
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception)
            {
                throw new Exception("Ошибка при удалении объекта");
            }
        }

        public async Task<List<ApprovedFormItemColumn>> GetForms(Guid tabId)
        {
            var form = await _dbSetForm.Where(x=>x.ApprovedFormItemId == tabId).OrderBy(x=>x.DisplayOrder).ToListAsync();
            if (form == null)
            {
                return new List<ApprovedFormItemColumn>();
            }
            return form;
        }

        public async Task<ApprovedFormItemColumn> Update(ApprovedFormItemColumn aForm)
        {
            var form = await _dbSetForm.FindAsync(aForm.Id);
            if (form == null) { throw new Exception("Объект не найден"); }
            form.DataType = aForm.DataType;
            form.ThRu = aForm.ThRu;
            form.ThKk = aForm.ThKk;
            form.DisplayOrder = aForm.DisplayOrder;
            form.IsVillage = aForm.IsVillage;
            _context.Entry(form).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
                return form;
            }
            catch (Exception)
            {
                throw new Exception("Ошибка при обновлении объекта");
            }
        }
    }
}
