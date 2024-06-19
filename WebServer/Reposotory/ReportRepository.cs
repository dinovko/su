using Microsoft.EntityFrameworkCore;
using WebServer.Data;
using WebServer.Dtos;
using WebServer.Interfaces;
using WebServer.Models;

namespace WebServer.Reposotory
{
    public class ReportRepository : IReport
    {
        private readonly WaterDbContext _context;
        private readonly DbSet<Report_Form> _dbSetForm;
        private readonly DbSet<Ref_Status> _dbSetRefStatus;
        private readonly IHttpContextAccessor _httpContext;
        private readonly DbSet<ApprovedForm> _dbSetApprovedForm;
        private readonly DbSet<ApprovedFormItem> _dbSetApprovedFormItem;
        private readonly DbSet<ApprovedFormItemColumn> _dbSetApprovedFormItemColumn;

        public ReportRepository(WaterDbContext context, IHttpContextAccessor httpContext)
        {
            _context = context;
            _httpContext = httpContext;
            _dbSetForm = _context.Set<Report_Form>();
            _dbSetRefStatus = _context.Set<Ref_Status>();
            _dbSetApprovedForm = _context.Set<ApprovedForm>();
            _dbSetApprovedFormItem = _context.Set<ApprovedFormItem>();
            _dbSetApprovedFormItemColumn = _context.Set<ApprovedFormItemColumn>();
        }
        public async Task<ReportsDto> Add(Report_Form form)
        {
            var existForm  = await _dbSetForm.FirstOrDefaultAsync(x=>x.IsDel == false && x.ReportYearId == form.ReportYearId && x.ReportMonthId == form.ReportMonthId);
            if(existForm != null) 
            {
                throw new DuplicateWaitObjectException("Отчет за данный период уже добавлен");
            }
            await _dbSetForm.AddAsync(form);
            try
            {
                await _context.SaveChangesAsync();
                return new ReportsDto()
                {
                    Id = form.Id,
                    HasStreets = false,
                    Desctiption = form.Desctiption,
                    AuthorId = form.AuthorId,
                    CreateDate = form.CreateDate,
                    IsDel = form.IsDel,
                    LastModifiedDate = form.LastModifiedDate,
                    RefKatoId = form.RefKatoId,
                    RefStatusId = form.RefStatusId,
                    RefStatusLabel = GetStatusLabelById(form.RefStatusId),
                    ReportMonthId = form.ReportMonthId,
                    ReportYearId = form.ReportYearId,
                };
                //await _dbSetForm
                //    .Where(x=>x.IsDel == false && x.RefKatoId == form.RefKatoId)
                //    .Select(x=> new ReportsDto()
                //    {
                //        Id = x.Id,
                //        HasStreets = false,
                //        Desctiption = x.Desctiption,
                //        AuthorId = x.AuthorId,
                //        CreateDate = x.CreateDate,
                //        IsDel = x.IsDel,
                //        LastModifiedDate = x.LastModifiedDate,
                //        RefKatoId = x.RefKatoId,
                //        RefStatusId = x.RefStatusId,
                //        RefStatusLabel = GetStatusLabelById(x.RefStatusId),
                //        ReportMonthId = x.ReportMonthId,
                //        ReportYearId = x.ReportYearId,
                //    })
                //    .ToListAsync();
            }
            catch (Exception)
            {
                throw new Exception("Что то пошло не так, попробуйте позже!");
            }
        }

        public async Task<List<ReportsDto>> Delete(Guid id)
        {
            var item = await _dbSetForm.FindAsync(id);
            if (item == null)
            {
                throw new Exception("Объект не найден");
            }
            item.IsDel = true;
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return await Get(item.RefKatoId);
        }

        public async Task<List<ReportsDto>> Get(int katoId)
        {
            return await _dbSetForm.Include(x=>x.RefStatus)
                    .Where(x => x.IsDel == false && x.RefKatoId == katoId)
                    .Select(x => new ReportsDto()
                    {
                        Id = x.Id,
                        HasStreets = false,
                        Desctiption = x.Desctiption,
                        AuthorId = x.AuthorId,
                        CreateDate = x.CreateDate,
                        IsDel = x.IsDel,
                        LastModifiedDate = x.LastModifiedDate,
                        RefKatoId = x.RefKatoId,
                        RefStatusId = x.RefStatusId,
                        RefStatusLabel = x.RefStatus!= null ? x.RefStatus.NameRu : "статус не определен",
                        ReportMonthId = x.ReportMonthId,
                        ReportYearId = x.ReportYearId,
                    })
                    .ToListAsync();
        }

        private string GetStatusLabelById(int id)
        {
            var label = _dbSetRefStatus.FirstOrDefault(x => x.Id == id);
            if (label == null) return "";
            return label.NameRu;
        }

        public async Task<List<ApprovedFormItemDto>> GetServices()
        {
            return await _dbSetApprovedFormItem.Where(x => x.IsDel == false)
                .Select(x => new ApprovedFormItemDto()
                {
                    Id = x.Id,
                    ApprovedFormId = x.ApprovedFormId,
                    ServiceId = x.ServiceId,
                    ServiceName = x.ServiceId == 0 ? "водоснабжение" : (x.ServiceId == 1 ? "водоотведение" : "водопровод"),
                    Title = x.Title,
                    DisplayOrder = x.DisplayOrder,
                    Url = $"/forms?id={x.Id}"
                })
                .ToListAsync();
        }

        public async Task<List<ApprovedFormItemColumnDto>> GetServiceById(Guid Id)
        {
            return await _dbSetApprovedFormItemColumn.Where(x => x.ApprovedFormItemId == Id)
                .Select(x => new ApprovedFormItemColumnDto()
                {
                    Id = x.Id,
                    ApprovedFormItemId = x.ApprovedFormItemId,
                    DataType = x.DataType,
                    ThRu = x.ThRu,
                    ThKk = x.ThKk,
                    DisplayOrder = x.DisplayOrder
                })
                .ToListAsync();
        }
    }
}
