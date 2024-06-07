using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Globalization;
using WebServer.Data;
using WebServer.Dtos;
using WebServer.Helpers;
using WebServer.Interfaces;
using WebServer.Models;

namespace WebServer.Reposotory
{
    public class FormsRepository : IForms
    {
        private readonly WaterDbContext _context;
        private readonly DbSet<Ref_Kato> _dbSetKato;
        private readonly DbSet<Report_Form> _dbSetForm;

        private readonly DbSet<Supply_City_Form1> _dbSetForm1;
        private readonly DbSet<Supply_City_Form2> _dbSetForm2;
        private readonly DbSet<Supply_City_Form3> _dbSetForm3;
        private readonly DbSet<Supply_City_Form4> _dbSetForm4;
        private readonly DbSet<Supply_City_Form5> _dbSetForm5;


        private readonly DbSet<Waste_City_Form1> _dbSetWForm1;
        private readonly DbSet<Waste_City_Form2> _dbSetWForm2;
        private readonly DbSet<Waste_City_Form3> _dbSetWForm3;

        private readonly DbSet<Ref_Street> _dbSetRefStreet;
        private readonly DbSet<Ref_Building> _dbSetRefBuilding;
        private readonly IHttpContextAccessor _httpContext;

        public FormsRepository(WaterDbContext context
            , IHttpContextAccessor httpContext
            )
        {
            _context = context;
            _dbSetKato = _context.Set<Ref_Kato>();
            _dbSetForm = _context.Set<Report_Form>();

            _dbSetForm1 = _context.Set<Supply_City_Form1>();
            _dbSetForm2 = _context.Set<Supply_City_Form2>();
            _dbSetForm3 = _context.Set<Supply_City_Form3>();
            _dbSetForm4 = _context.Set<Supply_City_Form4>();
            _dbSetForm5 = _context.Set<Supply_City_Form5>();

            //_dbSetFormVill1 = _context.Set<Supply_Village_Form1>();
            //_dbSetFormVill2 = _context.Set<Supply_Village_Form2>();
            //_dbSetFormVill3 = _context.Set<Supply_Village_Form3>();


            _dbSetWForm1 = _context.Set<Waste_City_Form1>();
            _dbSetWForm2 = _context.Set<Waste_City_Form2>();
            _dbSetWForm3 = _context.Set<Waste_City_Form3>();

            //_dbSetWFormVill1 = _context.Set<Waste_Village_Form1>();
            //_dbSetWFormVill2 = _context.Set<Waste_Village_Form2>();


            _dbSetRefStreet = _context.Set<Ref_Street>();
            _dbSetRefBuilding = _context.Set<Ref_Building>();
            _httpContext = httpContext;
        }

        /// <summary>
        /// Получение улиц и домов по КАТО
        /// </summary>
        /// <param name="id">ИД Формы</param>
        /// <returns></returns>
        private async Task<List<Ref_Building>> GetStreetBuildingByFormId(Guid id)
        {
            var form = await _dbSetForm.FirstOrDefaultAsync(x => x.Id == id);
            if (form == null)
            {
                return new List<Ref_Building>();
            }
            var result = new List<SupplyCityForm1TableDto>();
            return await _dbSetRefBuilding.Include(x => x.RefStreet).Where(x => x.IsDel == false && x.RefStreet.RefKatoId == form.RefKatoId).ToListAsync();
        }

        public async Task<List<FormDto>> GetFormsByKatoId(int id)
        {
            try
            {
                var culture = new CultureInfo("ru-RU");
                var list = await _dbSetForm
                        .Where(x => x.RefKatoId == id)
                        .OrderByDescending(x => x.ReportYearId)
                        .OrderByDescending(x => x.ReportMonthId)
                        //.Skip((query.PageNumber - 1) * query.PageSize)
                        //.Take(query.PageSize)
                        .Select(x => new FormDto()
                        {
                            Id = x.Id,
                            Year = x.ReportYearId,
                            MonthId = x.ReportMonthId,
                            MonthName = culture.DateTimeFormat.GetMonthName(x.ReportMonthId),
                            Status = x.RefStatus.NameRu
                        })
                        .ToListAsync();
                //return new PageResultDto<FormDto>(list.Count, list, query.PageNumber, query.PageSize, query.Filter);
                return list;
            }
            catch (Exception)
            {
                //return new PageResultDto<FormDto>(0, [], query.PageNumber, query.PageSize, query.Filter);
                return new List<FormDto>();
            }
        }

        public async Task<FormDto> AddForm(FormsAddDto row)
        {
            var form = await _dbSetForm.FirstOrDefaultAsync(x => x.ReportMonthId == row.ReportMonthId && x.ReportYearId == row.ReportYearId && x.IsDel == false);
            if (form != null) { throw new Exception("Отчет за данный период уже имеется"); }
            var newRow = await _dbSetForm.AddAsync(new Report_Form()
            {
                CreateDate = DateTime.UtcNow,
                Desctiption = !String.IsNullOrEmpty(row.Desctiption) ? row.Desctiption : "",
                IsDel = false,
                RefKatoId = row.RefKatoId,
                RefStatusId = 1,
                SupplierId = row.SupplierId,
                ReportYearId = row.ReportYearId,
                ReportMonthId = row.ReportMonthId                
            });

            await _context.SaveChangesAsync();

            var culture = new CultureInfo("ru-RU");
            return new FormDto()
            {
                Id = newRow.Entity.Id,
                Year = newRow.Entity.ReportYearId,
                MonthId = newRow.Entity.ReportMonthId,
                MonthName = culture.DateTimeFormat.GetMonthName(newRow.Entity.ReportMonthId),
                Status = "Новый",
            };
        }

        #region Водоснабжение
        #region Город
        public async Task<List<SupplyCityForm1TableDto>> SupplyCityGetForm1(Guid id)
        {
            PageQueryDto query = new PageQueryDto();
            try
            {
                var result = new List<SupplyCityForm1TableDto>();

                var StreetBuildinsList = await GetStreetBuildingByFormId(id);

                foreach (var item in StreetBuildinsList)
                {
                    var row = await _dbSetForm1
                        .Include(x => x.RefBuilding)
                        .Include(x => x.RefStreet)
                        .FirstOrDefaultAsync(
                            x => x.FormId == id &&
                            x.RefStreetId == item.RefStreetId &&
                            x.RefBuildingId == item.Id &&
                            x.IsDel == false);
                    if (row != null)
                    {
                        result.Add(new SupplyCityForm1TableDto()
                        {
                            Id = row.Id,
                            FormId = row.FormId,
                            RefStreetId = row.RefStreetId,
                            RefBuildingId = row.RefBuildingId,
                            HomeAddress = row.RefBuilding.NameRu,
                            KatoId = row.RefStreet.RefKatoId,
                            Street = row.RefStreet.NameRu,
                            Volume = row.Volume,
                        });
                    }
                    else
                    {
                        result.Add(new SupplyCityForm1TableDto()
                        {
                            Id = Guid.NewGuid(),
                            FormId = id,
                            RefStreetId = item.RefStreetId,
                            RefBuildingId = item.Id,
                            HomeAddress = item.NameRu,
                            KatoId = item.RefStreet.RefKatoId,
                            Street = item.RefStreet.NameRu,
                            Volume = 0,
                        });
                    }
                }
                //var culture = new CultureInfo("ru-RU");
                //var list = await _dbSetForm1
                //    .Include(x => x.RefBuilding)
                //    .Include(x => x.RefStreet)
                //    .Where(x => x.FormId == id)
                //    .OrderBy(x => x.RefStreet.NameRu)
                //    .OrderBy(x => x.RefBuilding.NameRu)
                //    .Skip((query.PageNumber - 1) * query.PageSize)
                //    .Take(query.PageSize)
                //    .Select(x => new Form1TableDto()
                //    {
                //        Id = x.Id,
                //        HomeAddress = x.RefBuilding.NameRu,
                //        Street = x.RefStreet.NameRu,
                //        KatoId = 0,
                //        Volume = x.Volume,
                //    })
                //    .ToListAsync();
                //return new PageResultDto<Form1TableDto>(result.Count, result, query.PageNumber, query.PageSize, query.Filter);
                return result;
            }
            catch (Exception)
            {
                //return new PageResultDto<Form1TableDto>(0, [], query.PageNumber, query.PageSize, query.Filter);
                return new List<SupplyCityForm1TableDto>();
            }
        }
        public async Task<List<SupplyCityForm1TableDto>> SupplyCityUpdateForm1(List<SupplyCityForm1TableDto> list, Guid id)
        {
            if (list == null) throw new Exception("Данные не могут быть пустыми");
            if (id == Guid.Empty) throw new Exception("ИД формы не может быть пустым");

            foreach (var entity in list)
            {
                var row = await _dbSetForm1.FindAsync(entity.Id);
                if (row != null)
                {
                    row.Volume = entity.Volume;
                    row.LastModifiedDate = DateTime.UtcNow;
                    _context.Entry(row).State = EntityState.Modified;
                }
                else
                {
                    await _dbSetForm1.AddAsync(new Supply_City_Form1()
                    {
                        Id = entity.Id,
                        Volume = entity.Volume,
                        LastModifiedDate = DateTime.UtcNow,
                        CreateDate = DateTime.UtcNow,
                        IsDel = false,
                        RefBuildingId = entity.RefBuildingId.Value,
                        RefStreetId = entity.RefStreetId.Value,
                        FormId = entity.FormId                        
                    });
                }
                await _context.SaveChangesAsync();
            }
            return list;
        }
        public async Task<List<SupplyCityForm2TableDto>> SupplyCityGetForm2(Guid id)
        {
            PageQueryDto query = new PageQueryDto();
            try
            {
                var result = new List<SupplyCityForm2TableDto>();
                var curForm = await _dbSetForm2.FirstOrDefaultAsync(x => x.FormId == id && x.IsDel == false);
                if(curForm != null && curForm.IsVillage == true) //Село
                {

                }
                var StreetBuildinsList = await GetStreetBuildingByFormId(id);
                foreach (var item in StreetBuildinsList)
                {
                    var row = await _dbSetForm2
                        .Include(x => x.RefBuilding)
                        .Include(x => x.RefStreet)
                        .FirstOrDefaultAsync(
                            x => x.FormId == id &&
                            x.RefStreetId == item.RefStreetId &&
                            x.RefBuildingId == item.Id &&
                            x.IsDel == false);
                    if (row != null)
                    {
                        result.Add(new SupplyCityForm2TableDto()
                        {
                            Id = row.Id,
                            FormId = row.FormId,
                            RefStreetId = row.RefStreetId,
                            RefBuildingId = row.RefBuildingId,
                            HomeAddress = row.RefBuilding.NameRu,
                            KatoId = row.RefStreet.RefKatoId,
                            Street = row.RefStreet.NameRu,
                            CoverageWater = row.CoverageWater,
                            CentralizedWaterNumber = row.CentralizedWaterNumber,
                        });
                    }
                    else
                    {
                        result.Add(new SupplyCityForm2TableDto()
                        {
                            Id = Guid.NewGuid(),
                            FormId = id,
                            RefStreetId = item.RefStreetId,
                            RefBuildingId = item.Id,
                            HomeAddress = item.NameRu,
                            KatoId = item.RefStreet.RefKatoId,
                            Street = item.RefStreet.NameRu,
                            CoverageWater = false,
                            CentralizedWaterNumber = 0,
                        });
                    }
                }

                //var result = new List<SupplyVillageForm2TableDto>(); //потому что структуры с городом одинаковы, без наличия улиц
                var form = await _dbSetForm.FirstOrDefaultAsync(x => x.Id == id);

                if (form == null) throw new Exception("Форма не найдена");

                if (curForm == null)
                {
                    result.Add(new SupplyCityForm2TableDto()
                    {
                        FormId = id,
                        KatoId = form.RefKatoId,
                        RuralPopulation = 0,
                        CentralWaterSupplySubscribers = 0,
                        IndividualWaterMetersInstalled = 0,
                        RemoteDataTransmissionMeters = 0,
                        Id = Guid.NewGuid(),
                    });
                    return result;
                }
                return new List<SupplyCityForm2TableDto>()
                {
                    new SupplyCityForm2TableDto()
                    {
                        FormId = curForm.FormId,
                        KatoId = form.RefKatoId,
                        RuralPopulation = curForm.RuralPopulation,
                        CentralWaterSupplySubscribers = curForm.CentralWaterSupplySubscribers,
                        IndividualWaterMetersInstalled = curForm.IndividualWaterMetersInstalled,
                        RemoteDataTransmissionMeters = curForm.RemoteDataTransmissionMeters,
                        Id = curForm.Id,
                    }
                };
                //var culture = new CultureInfo("ru-RU");
                //var list = await _dbSetForm1
                //    .Include(x => x.RefBuilding)
                //    .Include(x => x.RefStreet)
                //    .Where(x => x.FormId == id)
                //    .OrderBy(x => x.RefStreet.NameRu)
                //    .OrderBy(x => x.RefBuilding.NameRu)
                //    .Skip((query.PageNumber - 1) * query.PageSize)
                //    .Take(query.PageSize)
                //    .Select(x => new Form1TableDto()
                //    {
                //        Id = x.Id,
                //        HomeAddress = x.RefBuilding.NameRu,
                //        Street = x.RefStreet.NameRu,
                //        KatoId = 0,
                //        Volume = x.Volume,
                //    })
                //    .ToListAsync();
                //return new PageResultDto<Form1TableDto>(result.Count, result, query.PageNumber, query.PageSize, query.Filter);
                return result;
            }
            catch (Exception)
            {
                //return new PageResultDto<Form1TableDto>(0, [], query.PageNumber, query.PageSize, query.Filter);
                return new List<SupplyCityForm2TableDto>();
            }
        }
        public async Task<List<SupplyCityForm2TableDto>> SupplyCityUpdateForm2(List<SupplyCityForm2TableDto> list, Guid id)
        {
            if (list == null || list.Count == 0) throw new Exception("Данные не могут быть пустыми");
            if (id == Guid.Empty) throw new Exception("ИД формы не может быть пустым");

            foreach (var entity in list)
            {
                var row = await _dbSetForm2.FindAsync(entity.Id);
                if (row != null)
                {
                    row.CoverageWater = entity.CoverageWater;
                    row.CentralizedWaterNumber = entity.CentralizedWaterNumber;
                    row.LastModifiedDate = DateTime.UtcNow;
                    _context.Entry(row).State = EntityState.Modified;
                }
                else
                {
                    await _dbSetForm2.AddAsync(new Supply_City_Form2()
                    {
                        Id = entity.Id,
                        CoverageWater = entity.CoverageWater,
                        CentralizedWaterNumber = entity.CentralizedWaterNumber,
                        LastModifiedDate = DateTime.UtcNow,
                        CreateDate = DateTime.UtcNow,
                        IsDel = false,
                        RefBuildingId = entity.RefBuildingId,
                        RefStreetId = entity.RefStreetId,
                        FormId = entity.FormId,
                        //Form = new Report_Form() { RefKato = new Ref_Kato(), RefStatus = new Ref_Status() },
                    });
                }
                await _context.SaveChangesAsync();
            }
            return list;
        }
        public async Task<List<SupplyCityForm3TableDto>> SupplyCityGetForm3(Guid id)
        {
            PageQueryDto query = new PageQueryDto();
            try
            {
                var result = new List<SupplyCityForm3TableDto>();
                var StreetBuildinsList = await GetStreetBuildingByFormId(id);
                foreach (var item in StreetBuildinsList)
                {
                    var row = await _dbSetForm3
                        .Include(x => x.RefBuilding)
                        .Include(x => x.RefStreet)
                        .FirstOrDefaultAsync(
                            x => x.FormId == id &&
                            x.RefStreetId == item.RefStreetId &&
                            x.RefBuildingId == item.Id &&
                            x.IsDel == false);
                    if (row != null)
                    {
                        result.Add(new SupplyCityForm3TableDto()
                        {
                            Id = row.Id,
                            FormId = row.FormId,
                            RefStreetId = row.RefStreetId,
                            RefBuildingId = row.RefBuildingId,
                            HomeAddress = row.RefBuilding.NameRu,
                            KatoId = row.RefStreet.RefKatoId,
                            Street = row.RefStreet.NameRu,
                            CoverageMetersTotalCumulative = row.CoverageMetersTotalCumulative,
                            CoverageMetersRemoteData = row.CoverageMetersRemoteData,
                        });
                    }
                    else
                    {
                        result.Add(new SupplyCityForm3TableDto()
                        {
                            Id = Guid.NewGuid(),
                            FormId = id,
                            RefStreetId = item.RefStreetId,
                            RefBuildingId = item.Id,
                            HomeAddress = item.NameRu,
                            KatoId = item.RefStreet.RefKatoId,
                            Street = item.RefStreet.NameRu,
                            CoverageMetersTotalCumulative = 0,
                            CoverageMetersRemoteData = 0,
                        });
                    }
                }

                return result;
            }
            catch (Exception)
            {
                //return new PageResultDto<Form1TableDto>(0, [], query.PageNumber, query.PageSize, query.Filter);
                return new List<SupplyCityForm3TableDto>();
            }
        }
        public async Task<List<SupplyCityForm3TableDto>> SupplyCityUpdateForm3(List<SupplyCityForm3TableDto> list, Guid id)
        {
            if (list == null || list.Count == 0) throw new Exception("Данные не могут быть пустыми");
            if (id == Guid.Empty) throw new Exception("ИД формы не может быть пустым");

            foreach (var entity in list)
            {
                var row = await _dbSetForm3.FindAsync(entity.Id);
                if (row != null)
                {
                    row.CoverageMetersTotalCumulative = entity.CoverageMetersTotalCumulative;
                    row.CoverageMetersRemoteData = entity.CoverageMetersRemoteData;
                    row.LastModifiedDate = DateTime.UtcNow;
                    _context.Entry(row).State = EntityState.Modified;
                }
                else
                {
                    await _dbSetForm3.AddAsync(new Supply_City_Form3()
                    {
                        Id = entity.Id,
                        CoverageMetersTotalCumulative = entity.CoverageMetersTotalCumulative,
                        CoverageMetersRemoteData = entity.CoverageMetersRemoteData,
                        LastModifiedDate = DateTime.UtcNow,
                        CreateDate = DateTime.UtcNow,
                        IsDel = false,
                        RefBuildingId = entity.RefBuildingId.Value,
                        RefStreetId = entity.RefStreetId.Value,
                        FormId = entity.FormId,
                    });
                }
                await _context.SaveChangesAsync();
            }
            return list;
        }
        public async Task<List<SupplyCityForm4TableDto>> SupplyCityGetForm4(Guid id)
        {
            PageQueryDto query = new PageQueryDto();
            try
            {
                var result = new List<SupplyCityForm4TableDto>();
                var StreetBuildinsList = await GetStreetBuildingByFormId(id);
                foreach (var item in StreetBuildinsList)
                {
                    var row = await _dbSetForm4
                        .Include(x => x.RefBuilding)
                        .Include(x => x.RefStreet)
                        .FirstOrDefaultAsync(
                            x => x.FormId == id &&
                            x.RefStreetId == item.RefStreetId &&
                            x.RefBuildingId == item.Id &&
                            x.IsDel == false);
                    if (row != null)
                    {
                        result.Add(new SupplyCityForm4TableDto()
                        {
                            Id = row.Id,
                            FormId = row.FormId,
                            RefStreetId = row.RefStreetId,
                            RefBuildingId = row.RefBuildingId,
                            HomeAddress = row.RefBuilding.NameRu,
                            KatoId = row.RefStreet.RefKatoId,
                            Street = row.RefStreet.NameRu,
                            CoverageHouseholdNeedNumberBuildings = row.CoverageHouseholdNeedNumberBuildings,
                            CoverageHouseholdInstalledBuildings = row.CoverageHouseholdInstalledBuildings,
                            CoverageHouseholdInstalledCount = row.CoverageHouseholdInstalledCount,
                            CoverageHouseholdRemoteData = row.CoverageHouseholdRemoteData
                        });
                    }
                    else
                    {
                        result.Add(new SupplyCityForm4TableDto()
                        {
                            Id = Guid.NewGuid(),
                            FormId = id,
                            RefStreetId = item.RefStreetId,
                            RefBuildingId = item.Id,
                            HomeAddress = item.NameRu,
                            KatoId = item.RefStreet.RefKatoId,
                            Street = item.RefStreet.NameRu,
                            CoverageHouseholdNeedNumberBuildings = 0,
                            CoverageHouseholdInstalledBuildings = 0,
                            CoverageHouseholdInstalledCount = 0,
                            CoverageHouseholdRemoteData = 0,
                        });
                    }
                }

                return result;
            }
            catch (Exception)
            {
                //return new PageResultDto<Form1TableDto>(0, [], query.PageNumber, query.PageSize, query.Filter);
                return new List<SupplyCityForm4TableDto>();
            }
        }
        public async Task<List<SupplyCityForm4TableDto>> SupplyCityUpdateForm4(List<SupplyCityForm4TableDto> list, Guid id)
        {
            if (list == null || list.Count == 0) throw new Exception("Данные не могут быть пустыми");
            if (id == Guid.Empty) throw new Exception("ИД формы не может быть пустым");

            foreach (var entity in list)
            {
                var row = await _dbSetForm4.FindAsync(entity.Id);
                if (row != null)
                {
                    row.CoverageHouseholdNeedNumberBuildings = entity.CoverageHouseholdNeedNumberBuildings;
                    row.CoverageHouseholdInstalledBuildings = entity.CoverageHouseholdInstalledBuildings;
                    row.CoverageHouseholdInstalledCount = entity.CoverageHouseholdInstalledCount;
                    row.CoverageHouseholdRemoteData = entity.CoverageHouseholdRemoteData;
                    row.LastModifiedDate = DateTime.UtcNow;
                    _context.Entry(row).State = EntityState.Modified;
                }
                else
                {
                    await _dbSetForm4.AddAsync(new Supply_City_Form4()
                    {
                        Id = entity.Id,
                        CoverageHouseholdNeedNumberBuildings = entity.CoverageHouseholdNeedNumberBuildings,
                        CoverageHouseholdInstalledBuildings = entity.CoverageHouseholdInstalledBuildings,
                        CoverageHouseholdInstalledCount = entity.CoverageHouseholdInstalledCount,
                        CoverageHouseholdRemoteData = entity.CoverageHouseholdRemoteData,
                        LastModifiedDate = DateTime.UtcNow,
                        CreateDate = DateTime.UtcNow,
                        IsDel = false,
                        RefBuildingId = entity.RefBuildingId.Value,
                        RefStreetId = entity.RefStreetId.Value,
                        FormId = entity.FormId,
                    });
                }
                await _context.SaveChangesAsync();
            }
            return list;
        }
        public async Task<List<SupplyCityForm5TableDto>> SupplyCityGetForm5(Guid id)
        {
            PageQueryDto query = new PageQueryDto();
            try
            {
                var result = new List<SupplyCityForm5TableDto>();
                var StreetBuildinsList = await GetStreetBuildingByFormId(id);
                foreach (var item in StreetBuildinsList)
                {
                    var row = await _dbSetForm5
                        .Include(x => x.RefBuilding)
                        .Include(x => x.RefStreet)
                        .FirstOrDefaultAsync(
                            x => x.FormId == id &&
                            x.RefStreetId == item.RefStreetId &&
                            x.RefBuildingId == item.Id &&
                            x.IsDel == false);
                    if (row != null)
                    {
                        result.Add(new SupplyCityForm5TableDto()
                        {
                            Id = row.Id,
                            FormId = row.FormId,
                            RefStreetId = row.RefStreetId,
                            RefBuildingId = row.RefBuildingId,
                            HomeAddress = row.RefBuilding.NameRu,
                            KatoId = row.RefStreet.RefKatoId,
                            Street = row.RefStreet.NameRu,
                            ScadaWaterIntake = row.ScadaWaterIntake,
                            ScadaWaterTreatment = row.ScadaWaterTreatment,
                            ScadaStations = row.ScadaStations,
                            ScadaSupplyNetworks = row.ScadaSupplyNetworks
                        });
                    }
                    else
                    {
                        result.Add(new SupplyCityForm5TableDto()
                        {
                            Id = Guid.NewGuid(),
                            FormId = id,
                            RefStreetId = item.RefStreetId,
                            RefBuildingId = item.Id,
                            HomeAddress = item.NameRu,
                            KatoId = item.RefStreet.RefKatoId,
                            Street = item.RefStreet.NameRu,
                            ScadaWaterIntake = false,
                            ScadaWaterTreatment = false,
                            ScadaStations = false,
                            ScadaSupplyNetworks = false,
                        });
                    }
                }

                return result;
            }
            catch (Exception)
            {
                //return new PageResultDto<Form1TableDto>(0, [], query.PageNumber, query.PageSize, query.Filter);
                return new List<SupplyCityForm5TableDto>();
            }
        }
        public async Task<List<SupplyCityForm5TableDto>> SupplyCityUpdateForm5(List<SupplyCityForm5TableDto> list, Guid id)
        {
            if (list == null || list.Count == 0) throw new Exception("Данные не могут быть пустыми");
            if (id == Guid.Empty) throw new Exception("ИД формы не может быть пустым");

            foreach (var entity in list)
            {
                var row = await _dbSetForm5.FindAsync(entity.Id);
                if (row != null)
                {
                    row.ScadaWaterIntake = entity.ScadaWaterIntake;
                    row.ScadaWaterTreatment = entity.ScadaWaterTreatment;
                    row.ScadaStations = entity.ScadaStations;
                    row.ScadaSupplyNetworks = entity.ScadaSupplyNetworks;
                    row.LastModifiedDate = DateTime.UtcNow;
                    _context.Entry(row).State = EntityState.Modified;
                }
                else
                {
                    await _dbSetForm5.AddAsync(new Supply_City_Form5()
                    {
                        Id = entity.Id,
                        ScadaWaterIntake = entity.ScadaWaterIntake,
                        ScadaWaterTreatment = entity.ScadaWaterTreatment,
                        ScadaStations = entity.ScadaStations,
                        ScadaSupplyNetworks = entity.ScadaSupplyNetworks,
                        LastModifiedDate = DateTime.UtcNow,
                        CreateDate = DateTime.UtcNow,
                        IsDel = false,
                        RefBuildingId = entity.RefBuildingId.Value,
                        RefStreetId = entity.RefStreetId.Value,
                        FormId = entity.FormId,
                    });
                }
                await _context.SaveChangesAsync();
            }
            return list;
        }
        #endregion
        #region Село
        public async Task<List<SupplyCityForm1TableDto>> SupplyVillageGetForm1(Guid id)
        {
            PageQueryDto query = new PageQueryDto();
            try
            {
                var result = new List<SupplyCityForm1TableDto>(); //потому что структуры с городом одинаковы, без наличия улиц
                var form = await _dbSetForm.FirstOrDefaultAsync(x => x.Id == id);
                var curForm = await _dbSetForm1.FirstOrDefaultAsync(x => x.FormId == id && x.IsDel == false); //_dbSetFormVill1.FirstOrDefaultAsync(x => x.FormId == id && x.IsDel == false);

                if (form == null) throw new Exception("Форма не найдена");

                if (curForm == null)
                {
                    result.Add(new SupplyCityForm1TableDto()
                    {
                        FormId = id,
                        KatoId = form.RefKatoId,
                        Volume = 0,
                    });
                    return result;
                }
                return new List<SupplyCityForm1TableDto>()
                {
                    new SupplyCityForm1TableDto()
                    {
                        FormId = curForm.FormId,
                        KatoId = form.RefKatoId,
                        Volume = curForm.Volume,
                    }
                };

            }
            catch (Exception)
            {
                //return new PageResultDto<Form1TableDto>(0, [], query.PageNumber, query.PageSize, query.Filter);
                return new List<SupplyCityForm1TableDto>();
            }
        }
        public async Task<List<SupplyCityForm1TableDto>> SupplyVillageUpdateForm1(List<SupplyCityForm1TableDto> list, Guid id)
        {
            if (list == null || list.Count == 0) throw new Exception("Данные не могут быть пустыми");
            if (id == Guid.Empty) throw new Exception("ИД формы не может быть пустым");

            foreach (var entity in list)
            {
                var row = await _dbSetForm1.FindAsync(entity.Id);
                if (row != null)
                {
                    row.Volume = entity.Volume;
                    row.LastModifiedDate = DateTime.UtcNow;
                    _context.Entry(row).State = EntityState.Modified;
                }
                else
                {
                    await _dbSetForm1.AddAsync(new Supply_City_Form1()
                    {
                        Id = entity.Id,
                        Volume = entity.Volume,
                        CreateDate = DateTime.UtcNow,
                        IsDel = false,
                        FormId = entity.FormId,
                    });
                }
                await _context.SaveChangesAsync();
            }
            return list;
        }
        public async Task<List<SupplyCityForm2TableDto>> SupplyVillageGetForm2(Guid id)
        {
            PageQueryDto query = new PageQueryDto();
            try
            {
                var result = new List<SupplyCityForm2TableDto>(); //потому что структуры с городом одинаковы, без наличия улиц SupplyVillageForm2TableDto
                var form = await _dbSetForm.FirstOrDefaultAsync(x => x.Id == id);
                var curForm = await _dbSetForm2.FirstOrDefaultAsync(x => x.FormId == id && x.IsDel == false);//_dbSetFormVill2

                if (form == null) throw new Exception("Форма не найдена");

                if (curForm == null)
                {
                    result.Add(new SupplyCityForm2TableDto()//SupplyVillageForm2TableDto
                    {
                        FormId = id,
                        KatoId = form.RefKatoId,
                        RuralPopulation = 0,
                        CentralWaterSupplySubscribers = 0,
                        IndividualWaterMetersInstalled = 0,
                        RemoteDataTransmissionMeters = 0,
                        Id = Guid.NewGuid(),
                    });
                    return result;
                }
                return new List<SupplyCityForm2TableDto>()//SupplyVillageForm2TableDto
                {
                    new SupplyCityForm2TableDto()
                    {
                        FormId = curForm.FormId,
                        KatoId = form.RefKatoId,
                        RuralPopulation = curForm.RuralPopulation,
                        CentralWaterSupplySubscribers = curForm.CentralWaterSupplySubscribers,
                        IndividualWaterMetersInstalled = curForm.IndividualWaterMetersInstalled,
                        RemoteDataTransmissionMeters = curForm.RemoteDataTransmissionMeters,
                        Id = curForm.Id,
                    }
                };

            }
            catch (Exception)
            {
                //return new PageResultDto<Form1TableDto>(0, [], query.PageNumber, query.PageSize, query.Filter);
                return new List<SupplyCityForm2TableDto>();
            }
        }
        public async Task<List<SupplyCityForm2TableDto>> SupplyVillageUpdateForm2(List<SupplyCityForm2TableDto> list, Guid id)
        {
            if (list == null || list.Count == 0) throw new Exception("Данные не могут быть пустыми");
            if (id == Guid.Empty) throw new Exception("ИД формы не может быть пустым");

            foreach (var entity in list)
            {
                var row = await _dbSetForm2.FindAsync(entity.Id);//_dbSetFormVill2
                if (row != null)
                {
                    row.RuralPopulation = entity.RuralPopulation;
                    row.CentralWaterSupplySubscribers = entity.CentralWaterSupplySubscribers;
                    row.IndividualWaterMetersInstalled = entity.IndividualWaterMetersInstalled;
                    row.RemoteDataTransmissionMeters = entity.RemoteDataTransmissionMeters;
                    row.LastModifiedDate = DateTime.UtcNow;
                    _context.Entry(row).State = EntityState.Modified;
                }
                else
                {
                    await _dbSetForm2.AddAsync(new Supply_City_Form2()//Supply_Village_Form2
                    {
                        Id = Guid.NewGuid(),
                        RuralPopulation = entity.RuralPopulation,
                        CentralWaterSupplySubscribers = entity.CentralWaterSupplySubscribers,
                        IndividualWaterMetersInstalled = entity.IndividualWaterMetersInstalled,
                        RemoteDataTransmissionMeters = entity.RemoteDataTransmissionMeters,
                        CreateDate = DateTime.UtcNow,
                        IsDel = false,
                        FormId = entity.FormId,
                    });
                }
                await _context.SaveChangesAsync();
            }
            return list;
        }
        public async Task<List<SupplyCityForm3TableDto>> SupplyVillageGetForm3(Guid id)//SupplyVillageForm3TableDto
        {
            PageQueryDto query = new PageQueryDto();
            try
            {
                var result = new List<SupplyCityForm3TableDto>(); //потому что структуры с городом одинаковы, без наличия улиц
                var form = await _dbSetForm.FirstOrDefaultAsync(x => x.Id == id);
                var curForm = await _dbSetForm3.FirstOrDefaultAsync(x => x.FormId == id && x.IsDel == false);//_dbSetFormVill3

                if (form == null) throw new Exception("Форма не найдена");

                if (curForm == null)
                {
                    result.Add(new SupplyCityForm3TableDto()
                    {
                        FormId = id,
                        KatoId = form.RefKatoId,
                        RuralPopulation = 0,
                        RuralSettlementsCount = 0,
                        PopulationWithKBM = 0,
                        PopulationWithPRV = 0,
                        PopulationUsingDeliveredWater = 0,
                        PopulationUsingWellsAndBoreholes = 0,
                        RuralSettlementsWithConstructionRefusalProtocols = 0,
                        PopulationWithConstructionRefusalProtocols = 0,
                        Id = Guid.NewGuid(),
                    });
                    return result;
                }
                else
                {
                    return new List<SupplyCityForm3TableDto>()
                    {
                        new SupplyCityForm3TableDto()
                        {
                            Id = curForm.Id,
                            FormId = curForm.FormId,
                            KatoId = form.RefKatoId,
                            RuralPopulation = curForm.RuralPopulation,
                            RuralSettlementsCount = curForm.RuralSettlementsCount,
                            PopulationWithKBM = curForm.PopulationWithKBM,
                            PopulationWithPRV = curForm.PopulationWithPRV,
                            PopulationUsingDeliveredWater = curForm.PopulationUsingDeliveredWater,
                            PopulationUsingWellsAndBoreholes = curForm.PopulationUsingWellsAndBoreholes,
                            RuralSettlementsWithConstructionRefusalProtocols = curForm.RuralSettlementsWithConstructionRefusalProtocols,
                            PopulationWithConstructionRefusalProtocols = curForm.PopulationWithConstructionRefusalProtocols,
                        }
                    };

                }

            }
            catch (Exception)
            {
                //return new PageResultDto<Form1TableDto>(0, [], query.PageNumber, query.PageSize, query.Filter);
                return new List<SupplyCityForm3TableDto>();
            }
        }
        public async Task<List<SupplyCityForm3TableDto>> SupplyVillageUpdateForm3(List<SupplyCityForm3TableDto> list, Guid id)
        {
            if (list == null || list.Count == 0) throw new Exception("Данные не могут быть пустыми");
            if (id == Guid.Empty) throw new Exception("ИД формы не может быть пустым");

            foreach (var entity in list)
            {
                var row = await _dbSetForm3.FindAsync(entity.Id);//_dbSetFormVill3
                if (row != null)
                {
                    row.RuralPopulation = entity.RuralPopulation;
                    row.RuralSettlementsCount = entity.RuralSettlementsCount;
                    row.PopulationWithKBM = entity.PopulationWithKBM;
                    row.PopulationWithPRV = entity.PopulationWithPRV;
                    row.PopulationUsingDeliveredWater = entity.PopulationUsingDeliveredWater;
                    row.PopulationUsingWellsAndBoreholes = entity.PopulationUsingWellsAndBoreholes;
                    row.RuralSettlementsWithConstructionRefusalProtocols = entity.RuralSettlementsWithConstructionRefusalProtocols;
                    row.PopulationWithConstructionRefusalProtocols = entity.PopulationWithConstructionRefusalProtocols;
                    row.LastModifiedDate = DateTime.UtcNow;
                    _context.Entry(row).State = EntityState.Modified;
                }
                else
                {
                    await _dbSetForm3.AddAsync(new Supply_City_Form3()//Supply_Village_Form3
                    {
                        Id = Guid.NewGuid(),
                        RuralPopulation = entity.RuralPopulation,
                        RuralSettlementsCount = entity.RuralSettlementsCount,
                        PopulationWithKBM = entity.PopulationWithKBM,
                        PopulationWithPRV = entity.PopulationWithPRV,
                        PopulationUsingDeliveredWater = entity.PopulationUsingDeliveredWater,
                        PopulationUsingWellsAndBoreholes = entity.PopulationUsingWellsAndBoreholes,
                        RuralSettlementsWithConstructionRefusalProtocols = entity.RuralSettlementsWithConstructionRefusalProtocols,
                        PopulationWithConstructionRefusalProtocols = entity.PopulationWithConstructionRefusalProtocols,
                        CreateDate = DateTime.UtcNow,
                        IsDel = false,
                        FormId = entity.FormId,
                    });
                }
                await _context.SaveChangesAsync();
            }
            return list;
        }
        #endregion
        #endregion
        #region Водоотведение
        #region Город 1
        #region Форма 1
        public async Task<List<WasteCityForm1TableDto>> WasteCityGetForm1(Guid id)
        {
            PageQueryDto query = new PageQueryDto();
            try
            {
                var result = new List<WasteCityForm1TableDto>();
                var StreetBuildinsList = await GetStreetBuildingByFormId(id);
                foreach (var item in StreetBuildinsList)
                {
                    var row = await _dbSetWForm1
                        .Include(x => x.RefBuilding)
                        .Include(x => x.RefStreet)
                        .FirstOrDefaultAsync(
                            x => x.FormId == id &&
                            x.RefStreetId == item.RefStreetId &&
                            x.RefBuildingId == item.Id &&
                            x.IsDel == false);
                    if (row != null)
                    {
                        result.Add(new WasteCityForm1TableDto()
                        {
                            Id = row.Id,
                            FormId = row.FormId,
                            RefStreetId = row.RefStreetId,
                            RefBuildingId = row.RefBuildingId,
                            HomeAddress = row.RefBuilding.NameRu,
                            KatoId = row.RefStreet.RefKatoId,
                            Street = row.RefStreet.NameRu,
                            WaterVolume = row.WaterVolume,
                        });
                    }
                    else
                    {
                        result.Add(new WasteCityForm1TableDto()
                        {
                            Id = Guid.NewGuid(),
                            FormId = id,
                            RefStreetId = item.RefStreetId,
                            RefBuildingId = item.Id,
                            HomeAddress = item.NameRu,
                            KatoId = item.RefStreet.RefKatoId,
                            Street = item.RefStreet.NameRu,
                            WaterVolume = 0,
                        });
                    }
                }

                return result;
            }
            catch (Exception)
            {
                //return new PageResultDto<Form1TableDto>(0, [], query.PageNumber, query.PageSize, query.Filter);
                return new List<WasteCityForm1TableDto>();
            }
        }
        public async Task<List<WasteCityForm1TableDto>> WasteCityUpdateForm1(List<WasteCityForm1TableDto> list, Guid id)
        {
            if (list == null || list.Count == 0) throw new Exception("Данные не могут быть пустыми");
            if (id == Guid.Empty) throw new Exception("ИД формы не может быть пустым");

            foreach (var entity in list)
            {
                var row = await _dbSetWForm1.FindAsync(entity.Id);
                if (row != null)
                {
                    row.WaterVolume = entity.WaterVolume;
                    row.LastModifiedDate = DateTime.UtcNow;
                    _context.Entry(row).State = EntityState.Modified;
                }
                else
                {
                    await _dbSetWForm1.AddAsync(new Waste_City_Form1()
                    {
                        Id = entity.Id,
                        WaterVolume = entity.WaterVolume,
                        LastModifiedDate = DateTime.UtcNow,
                        CreateDate = DateTime.UtcNow,
                        IsDel = false,
                        RefBuildingId = entity.RefBuildingId.Value,
                        RefStreetId = entity.RefStreetId.Value,
                        FormId = entity.FormId.Value,
                    });
                }
                await _context.SaveChangesAsync();
            }
            return list;
        }
        #endregion
        #region Форма 2
        public async Task<List<WasteCityForm2TableDto>> WasteCityGetForm2(Guid id)
        {
            PageQueryDto query = new PageQueryDto();
            try
            {
                var result = new List<WasteCityForm2TableDto>();
                var StreetBuildinsList = await GetStreetBuildingByFormId(id);
                foreach (var item in StreetBuildinsList)
                {
                    var row = await _dbSetWForm2
                        .Include(x => x.RefBuilding)
                        .Include(x => x.RefStreet)
                        .FirstOrDefaultAsync(
                            x => x.FormId == id &&
                            x.RefStreetId == item.RefStreetId &&
                            x.RefBuildingId == item.Id &&
                            x.IsDel == false);
                    if (row != null)
                    {
                        result.Add(new WasteCityForm2TableDto()
                        {
                            Id = row.Id,
                            FormId = row.FormId,
                            RefStreetId = row.RefStreetId,
                            RefBuildingId = row.RefBuildingId,
                            HomeAddress = row.RefBuilding.NameRu,
                            KatoId = row.RefStreet.RefKatoId,
                            Street = row.RefStreet.NameRu,
                            IsConnectedToCentralizedWastewaterSystem = row.IsConnectedToCentralizedWastewaterSystem,
                            HasSewageTreatmentFacilities = row.HasSewageTreatmentFacilities,
                            HasMechanicalTreatment = row.HasMechanicalTreatment,
                            HasMechanicalAndBiologicalTreatment = row.HasMechanicalAndBiologicalTreatment,
                            PopulationCoveredByCentralizedWastewater = row.PopulationCoveredByCentralizedWastewater,
                        });
                    }
                    else
                    {
                        result.Add(new WasteCityForm2TableDto()
                        {
                            Id = Guid.NewGuid(),
                            FormId = id,
                            RefStreetId = item.RefStreetId,
                            RefBuildingId = item.Id,
                            HomeAddress = item.NameRu,
                            KatoId = item.RefStreet.RefKatoId,
                            Street = item.RefStreet.NameRu,
                            IsConnectedToCentralizedWastewaterSystem = false,
                            HasSewageTreatmentFacilities = false,
                            HasMechanicalTreatment = false,
                            HasMechanicalAndBiologicalTreatment = false,
                            PopulationCoveredByCentralizedWastewater = 0,
                        });
                    }
                }

                return result;
            }
            catch (Exception)
            {
                //return new PageResultDto<Form1TableDto>(0, [], query.PageNumber, query.PageSize, query.Filter);
                return new List<WasteCityForm2TableDto>();
            }
        }
        public async Task<List<WasteCityForm2TableDto>> WasteCityUpdateForm2(List<WasteCityForm2TableDto> list, Guid id)
        {
            if (list == null || list.Count == 0) throw new Exception("Данные не могут быть пустыми");
            if (id == Guid.Empty) throw new Exception("ИД формы не может быть пустым");

            foreach (var entity in list)
            {
                var row = await _dbSetWForm2.FindAsync(entity.Id);
                if (row != null)
                {
                    row.IsConnectedToCentralizedWastewaterSystem = entity.IsConnectedToCentralizedWastewaterSystem;
                    row.HasSewageTreatmentFacilities = entity.HasSewageTreatmentFacilities;
                    row.HasMechanicalTreatment = entity.HasMechanicalTreatment;
                    row.HasMechanicalAndBiologicalTreatment = entity.HasMechanicalAndBiologicalTreatment;
                    row.PopulationCoveredByCentralizedWastewater = entity.PopulationCoveredByCentralizedWastewater;
                    row.LastModifiedDate = DateTime.UtcNow;
                    _context.Entry(row).State = EntityState.Modified;
                }
                else
                {
                    await _dbSetWForm2.AddAsync(new Waste_City_Form2()
                    {
                        Id = entity.Id,
                        IsConnectedToCentralizedWastewaterSystem = entity.IsConnectedToCentralizedWastewaterSystem,
                        HasSewageTreatmentFacilities = entity.HasSewageTreatmentFacilities,
                        HasMechanicalTreatment = entity.HasMechanicalTreatment,
                        HasMechanicalAndBiologicalTreatment = entity.HasMechanicalAndBiologicalTreatment,
                        PopulationCoveredByCentralizedWastewater = entity.PopulationCoveredByCentralizedWastewater,
                        LastModifiedDate = DateTime.UtcNow,
                        CreateDate = DateTime.UtcNow,
                        IsDel = false,
                        RefBuildingId = entity.RefBuildingId.Value,
                        RefStreetId = entity.RefStreetId.Value,
                        FormId = entity.FormId.Value,
                    });
                }
                await _context.SaveChangesAsync();
            }
            return list;
        }
        #endregion
        #region Форма 3
        public async Task<List<WasteCityForm3TableDto>> WasteCityGetForm3(Guid id)
        {
            PageQueryDto query = new PageQueryDto();
            try
            {
                var result = new List<WasteCityForm3TableDto>();
                var form = await _dbSetForm.FirstOrDefaultAsync(x => x.Id == id);
                if (form == null)
                {
                    throw new Exception("Форма отсутствует");
                }
                var StreetBuildinsList = await _dbSetRefStreet.Where(x => x.IsDel == false && x.RefKatoId == form.RefKatoId).ToListAsync();
                foreach (var item in StreetBuildinsList)
                {
                    var row = await _dbSetWForm3
                        .Include(x => x.RefStreet)
                        .FirstOrDefaultAsync(
                            x => x.FormId == id &&
                            x.RefStreetId == item.Id &&
                            x.IsDel == false);
                    if (row != null)
                    {
                        result.Add(new WasteCityForm3TableDto()
                        {
                            Id = row.Id,
                            FormId = row.FormId,
                            RefStreetId = row.RefStreetId,
                            KatoId = row.RefStreet.RefKatoId,
                            Street = row.RefStreet.NameRu,
                            HasSewerNetworks = row.HasSewerNetworks,
                            HasSewagePumpingStations = row.HasSewagePumpingStations,
                            HasSewageTreatmentPlants = row.HasSewageTreatmentPlants,
                        });
                    }
                    else
                    {
                        result.Add(new WasteCityForm3TableDto()
                        {
                            Id = Guid.NewGuid(),
                            FormId = row.FormId,
                            RefStreetId = row.RefStreetId,
                            KatoId = row.RefStreet.RefKatoId,
                            Street = row.RefStreet.NameRu,
                            HasSewerNetworks = false,
                            HasSewagePumpingStations = false,
                            HasSewageTreatmentPlants = false,
                        });
                    }
                }

                return result;
            }
            catch (Exception)
            {
                //return new PageResultDto<Form1TableDto>(0, [], query.PageNumber, query.PageSize, query.Filter);
                return new List<WasteCityForm3TableDto>();
            }
        }
        public async Task<List<WasteCityForm3TableDto>> WasteCityUpdateForm3(List<WasteCityForm3TableDto> list, Guid id)
        {
            if (list == null || list.Count == 0) throw new Exception("Данные не могут быть пустыми");
            if (id == Guid.Empty) throw new Exception("ИД формы не может быть пустым");

            foreach (var entity in list)
            {
                var row = await _dbSetWForm3.FindAsync(entity.Id);
                if (row != null)
                {
                    row.HasSewerNetworks = entity.HasSewerNetworks;
                    row.HasSewagePumpingStations = entity.HasSewagePumpingStations;
                    row.HasSewageTreatmentPlants = entity.HasSewageTreatmentPlants;
                    row.LastModifiedDate = DateTime.UtcNow;
                    _context.Entry(row).State = EntityState.Modified;
                }
                else
                {
                    await _dbSetWForm3.AddAsync(new Waste_City_Form3()
                    {
                        Id = entity.Id,
                        HasSewerNetworks = entity.HasSewerNetworks,
                        HasSewagePumpingStations = entity.HasSewagePumpingStations,
                        HasSewageTreatmentPlants = entity.HasSewageTreatmentPlants,
                        LastModifiedDate = DateTime.UtcNow,
                        CreateDate = DateTime.UtcNow,
                        IsDel = false,
                        RefStreetId = entity.RefStreetId.Value,
                        FormId = entity.FormId.Value,
                    });
                }
                await _context.SaveChangesAsync();
            }
            return list;
        }
        #endregion
        #endregion
        #region Село 1
        #region Форма 1
        public async Task<List<WasteCityForm1TableDto>> WasteVillageGetForm1(Guid id)//WasteVillageForm1TableDto
        {
            PageQueryDto query = new PageQueryDto();
            try
            {
                var result = new List<WasteCityForm1TableDto>(); //потому что структуры с городом одинаковы, без наличия улиц
                var form = await _dbSetForm.FirstOrDefaultAsync(x => x.Id == id);
                var curForm = await _dbSetWForm1.FirstOrDefaultAsync(x => x.FormId == id && x.IsDel == false);//_dbSetWFormVill1

                if (form == null) throw new Exception("Форма не найдена");

                if (curForm == null)
                {
                    result.Add(new WasteCityForm1TableDto()
                    {
                        Id = Guid.NewGuid(),
                        FormId = id,
                        KatoId = form.RefKatoId,
                        WaterVolume = 0,
                    });
                    return result;
                }
                return new List<WasteCityForm1TableDto>()
                {
                    new WasteCityForm1TableDto()
                    {
                        Id = curForm.Id,
                        FormId = curForm.FormId,
                        KatoId = form.RefKatoId,
                        WaterVolume = curForm.WaterVolume,
                    }
                };

            }
            catch (Exception)
            {
                //return new PageResultDto<Form1TableDto>(0, [], query.PageNumber, query.PageSize, query.Filter);
                return new List<WasteCityForm1TableDto>();
            }
        }
        public async Task<List<WasteCityForm1TableDto>> WasteVillageUpdateForm1(List<WasteCityForm1TableDto> list, Guid id)
        {
            if (list == null || list.Count == 0) throw new Exception("Данные не могут быть пустыми");
            if (id == Guid.Empty) throw new Exception("ИД формы не может быть пустым");

            foreach (var entity in list)
            {
                var row = await _dbSetWForm1.FindAsync(entity.Id);//_dbSetWFormVill1
                if (row != null)
                {
                    row.WaterVolume = entity.WaterVolume;
                    row.LastModifiedDate = DateTime.UtcNow;
                    _context.Entry(row).State = EntityState.Modified;
                }
                else
                {
                    await _dbSetWForm1.AddAsync(new Waste_City_Form1()//Waste_Village_Form1
                    {
                        Id = Guid.NewGuid(),
                        FormId = entity.FormId ?? Guid.NewGuid(), //Need? Guid.NewGuid()
                        WaterVolume = entity.WaterVolume,
                        CreateDate = DateTime.UtcNow,
                        IsDel = false,
                    });
                }
                await _context.SaveChangesAsync();
            }
            return list;
        }
        #endregion
        #region Форма 2
        public async Task<List<WasteCityForm2TableDto>> WasteVillageGetForm2(Guid id)//WasteVillageForm2TableDto
        {
            PageQueryDto query = new PageQueryDto();
            try
            {
                var result = new List<WasteCityForm2TableDto>(); //потому что структуры с городом одинаковы, без наличия улиц
                var form = await _dbSetForm.FirstOrDefaultAsync(x => x.Id == id);
                var curForm = await _dbSetWForm2.FirstOrDefaultAsync(x => x.FormId == id && x.IsDel == false);//_dbSetWFormVill2

                if (form == null) throw new Exception("Форма не найдена");

                if (curForm == null)
                {
                    result.Add(new WasteCityForm2TableDto()
                    {
                        Id = Guid.NewGuid(),
                        FormId = id,
                        KatoId = form.RefKatoId,
                        RuralSettlementsWithCentralizedWastewater = 0,
                        PopulationInRuralSettlements = 0,
                        SubscribersInRuralSettlements = 0,
                        IndividualSubscribers = 0,
                        CorporateSubscribers = 0,
                        GovernmentOrganizations = 0,
                        SewageTreatmentFacilitiesCount = 0,
                        MechanicalTreatmentFacilitiesCount = 0,
                        MechanicalAndBiologicalTreatmentFacilitiesCount = 0,
                        SewageTreatmentCapacity = 0,
                        SewageTreatmentFacilitiesWearPercentage = 0,
                        PopulationServedBySewageTreatmentFacilities = 0,
                        ActualWastewaterInflux = 0,
                        NormativelyTreatedWastewaterVolume = 0,
                    });
                }
                else
                {
                    result.Add(new WasteCityForm2TableDto()
                    {
                        Id = Guid.NewGuid(),
                        FormId = id,
                        KatoId = form.RefKatoId,
                        RuralSettlementsWithCentralizedWastewater = curForm.RuralSettlementsWithCentralizedWastewater,
                        PopulationInRuralSettlements = curForm.PopulationInRuralSettlements,
                        SubscribersInRuralSettlements = curForm.SubscribersInRuralSettlements,
                        IndividualSubscribers = curForm.IndividualSubscribers,
                        CorporateSubscribers = curForm.CorporateSubscribers,
                        GovernmentOrganizations = curForm.GovernmentOrganizations,
                        SewageTreatmentFacilitiesCount = curForm.SewageTreatmentFacilitiesCount,
                        MechanicalTreatmentFacilitiesCount = curForm.MechanicalTreatmentFacilitiesCount,
                        MechanicalAndBiologicalTreatmentFacilitiesCount = curForm.MechanicalAndBiologicalTreatmentFacilitiesCount,
                        SewageTreatmentCapacity = curForm.SewageTreatmentCapacity,
                        SewageTreatmentFacilitiesWearPercentage = curForm.SewageTreatmentFacilitiesWearPercentage,
                        PopulationServedBySewageTreatmentFacilities = curForm.PopulationServedBySewageTreatmentFacilities,
                        ActualWastewaterInflux = curForm.ActualWastewaterInflux,
                        NormativelyTreatedWastewaterVolume = curForm.NormativelyTreatedWastewaterVolume,
                    });
                }
                return result;


            }
            catch (Exception)
            {
                //return new PageResultDto<Form1TableDto>(0, [], query.PageNumber, query.PageSize, query.Filter);
                return new List<WasteCityForm2TableDto>();
            }
        }
        public async Task<List<WasteCityForm2TableDto>> WasteVillageUpdateForm2(List<WasteCityForm2TableDto> list, Guid id)
        {
            if (list == null || list.Count == 0) throw new Exception("Данные не могут быть пустыми");
            if (id == Guid.Empty) throw new Exception("ИД формы не может быть пустым");

            foreach (var entity in list)
            {
                var row = await _dbSetWForm2.FindAsync(entity.Id);//_dbSetWFormVill2
                if (row != null)
                {
                    row.RuralSettlementsWithCentralizedWastewater = entity.RuralSettlementsWithCentralizedWastewater;
                    row.PopulationInRuralSettlements = entity.PopulationInRuralSettlements;
                    row.SubscribersInRuralSettlements = entity.SubscribersInRuralSettlements;
                    row.IndividualSubscribers = entity.IndividualSubscribers;
                    row.CorporateSubscribers = entity.CorporateSubscribers;
                    row.GovernmentOrganizations = entity.GovernmentOrganizations;
                    row.SewageTreatmentFacilitiesCount = entity.SewageTreatmentFacilitiesCount;
                    row.MechanicalTreatmentFacilitiesCount = entity.MechanicalTreatmentFacilitiesCount;
                    row.MechanicalAndBiologicalTreatmentFacilitiesCount = entity.MechanicalAndBiologicalTreatmentFacilitiesCount;
                    row.SewageTreatmentCapacity = entity.SewageTreatmentCapacity;
                    row.SewageTreatmentFacilitiesWearPercentage = entity.SewageTreatmentFacilitiesWearPercentage;
                    row.PopulationServedBySewageTreatmentFacilities = entity.PopulationServedBySewageTreatmentFacilities;
                    row.ActualWastewaterInflux = entity.ActualWastewaterInflux;
                    row.NormativelyTreatedWastewaterVolume = entity.NormativelyTreatedWastewaterVolume;
                    row.LastModifiedDate = DateTime.UtcNow;
                    _context.Entry(row).State = EntityState.Modified;
                }
                else
                {
                    await _dbSetWForm2.AddAsync(new Waste_City_Form2()//Waste_Village_Form2
                    {
                        Id = Guid.NewGuid(),
                        FormId = entity.FormId ?? Guid.NewGuid(),
                        RuralSettlementsWithCentralizedWastewater = entity.RuralSettlementsWithCentralizedWastewater,
                        PopulationInRuralSettlements = entity.PopulationInRuralSettlements,
                        SubscribersInRuralSettlements = entity.SubscribersInRuralSettlements,
                        IndividualSubscribers = entity.IndividualSubscribers,
                        CorporateSubscribers = entity.CorporateSubscribers,
                        GovernmentOrganizations = entity.GovernmentOrganizations,
                        SewageTreatmentFacilitiesCount = entity.SewageTreatmentFacilitiesCount,
                        MechanicalTreatmentFacilitiesCount = entity.MechanicalTreatmentFacilitiesCount,
                        MechanicalAndBiologicalTreatmentFacilitiesCount = entity.MechanicalAndBiologicalTreatmentFacilitiesCount,
                        SewageTreatmentCapacity = entity.SewageTreatmentCapacity,
                        SewageTreatmentFacilitiesWearPercentage = entity.SewageTreatmentFacilitiesWearPercentage,
                        PopulationServedBySewageTreatmentFacilities = entity.PopulationServedBySewageTreatmentFacilities,
                        ActualWastewaterInflux = entity.ActualWastewaterInflux,
                        NormativelyTreatedWastewaterVolume = entity.NormativelyTreatedWastewaterVolume,
                        CreateDate = DateTime.UtcNow,
                        IsDel = false,
                    });
                }
                await _context.SaveChangesAsync();
            }
            return list;
        }
        #endregion
        #endregion
        #endregion

        //public Task<FormKatoDto> DeleteFormKato()
        //{
        //    return null;
        //}

        //public async Task<PageResultDto<FormKatoDto>> GetFormStreets(PageQueryDto query, int k)
        //{
        //int accessLevel = _httpContext.HttpContext.GetAccessLevel();
        //if(accessLevel == 0)
        //{
        //    return new PageResultDto<FormTableDto>(totalCount:0, [], filter: query.Filter, pageNumber: 1, pageSize: query.PageSize);
        //}

        //var katoString = _httpContext.HttpContext?.GetClaim("kcd");
        //var data = new List<WaterSupplyForm>();
        //var isNumber = long.TryParse(katoString, out var katoCode);
        //if (isNumber)
        //{
        //    var endRangeCode = getKatoCodeRange(katoCode);
        //    var result = await _dbSetForm
        //        .Where(x => x.Ref_KatoId == k && x.IsDel == false)
        //        .Skip((query.PageNumber - 1) * query.PageSize)
        //        .Take(query.PageSize)
        //        .Select(x => new FormTableDto()
        //        {
        //            KatoId = x.Ref_KatoId,
        //            Code = x.Ref_Kato.Code.ToString(),
        //            HomeAddress = x.HouseAddress,
        //            Street = x.Street,
        //        })
        //        .OrderBy(x => x.Code)
        //        .ToListAsync();
        //    return new PageResultDto<FormKatoDto>(totalCount: data.Count, result, filter: query.Filter, pageNumber: query.PageNumber, pageSize: query.PageSize);
        //}
        //else
        //{

        //}

        //var result = await _dbSetForm
        //        .Where(x => x.IsDel == false && x.Ref_KatoId == k)
        //        .Select(x => new FormKatoDto()
        //        {
        //            KatoId = x.Ref_KatoId,
        //            HomeAddress = x.HouseAddress,
        //            Street = x.Street,
        //            Id = x.Id,
        //        })
        //        .OrderBy(x => x.Street).ThenBy(x => x.HomeAddress)
        //        .Skip((query.PageNumber - 1) * query.PageSize)
        //        .Take(query.PageSize)
        //        .ToListAsync();
        //return new PageResultDto<FormKatoDto>(totalCount: result.Count, items: result, filter: query.Filter, pageNumber: query.PageNumber, pageSize: query.PageSize);
        //}

        /// <summary>
        /// Рекурсивное получение родителей по цепочке
        /// </summary>
        /// <param name="katoId"></param>
        /// <returns></returns>
        //public async Task<FormKatoDto> GetTreeByKatoId(int katoId)
        //{
        //    var rez = new List<RefKato>();
        //    var curKato = await _dbSetKato.FirstOrDefaultAsync(x => x.Id == katoId);
        //    while (curKato?.ParentId != 0)
        //    {
        //        if (curKato != null)
        //        {
        //            curKato = await _dbSetKato.FirstOrDefaultAsync(x => x.Id == curKato.ParentId);
        //            if (curKato != null)
        //            {
        //                rez.Add(curKato);
        //            }
        //        }
        //    }
        //    var count = rez.Count;
        //    return new FormKatoDto()
        //    {
        //        KatoId = katoId,
        //        Code = "",
        //        Obl = count >= 1 && rez[rez.Count - 1] != null ? rez[rez.Count - 1].NameRu : "",
        //        Raion = count >= 2 && rez[rez.Count - 2] != null ? rez[rez.Count - 2].NameRu : "",
        //        CityOrVillage = count >= 3 && rez[rez.Count - 3] != null ? rez[rez.Count - 3].NameRu : "",
        //        Village2 = count >= 4 && rez[rez.Count - 4] != null ? rez[rez.Count - 4].NameRu : "",
        //        Village3 = count >= 5 && rez[rez.Count - 5] != null ? rez[rez.Count - 5].NameRu : "",
        //    };
        //}

        //public Task<FormsValidationReponse> ValidateForm()
        //{
        //    return null;
        //    //throw new NotImplementedException();
        //}

        //public long getKatoCodeRange(long code)
        //{
        //    //101033106
        //    //113637000 c.o.
        //    var codeString = code.ToString();
        //    if (codeString.Substring(2, 2) == "00") //область город
        //    {
        //        int.TryParse(codeString.Substring(0, 2), out var _rangeEnd);
        //        return long.Parse((_rangeEnd + 1).ToString() + "0000000");
        //    }
        //    else
        //    if (codeString.Substring(4, 2) == "00") // район/ГА
        //    {
        //        int.TryParse(codeString.Substring(0, 4), out var _rangeEnd);
        //        return long.Parse((_rangeEnd + 1).ToString() + "00000");
        //    }
        //    else
        //    if (codeString.Substring(6, 3) == "000") //сельский округ
        //    {
        //        int.TryParse(codeString.Substring(0, 6), out var _rangeEnd);
        //        return long.Parse((_rangeEnd + 1).ToString() + "000");
        //    }
        //    else
        //    {
        //        return code;
        //    }

        //}

        //public Task<PageResultDto<FormKatoDto>> GetForm1(PageQueryDto query, Guid formid)
        //{
        //    var result = await _dbSetForm1
        //            .Where(x => x.IsDel == false && x.FormId == formid)
        //            .Select(x => new FormKatoDto()
        //            {
        //                KatoId = x.Ref_KatoId,
        //                HomeAddress = x.HouseAddress,
        //                Street = x.Street,
        //                Id = x.Id,
        //            })
        //            .OrderBy(x => x.Street).ThenBy(x => x.HomeAddress)
        //            .Skip((query.PageNumber - 1) * query.PageSize)
        //            .Take(query.PageSize)
        //            .ToListAsync();
        //    return new PageResultDto<FormKatoDto>(totalCount: result.Count, items: result, filter: query.Filter, pageNumber: query.PageNumber, pageSize: query.PageSize);
        //}

        //public Task<PageResultDto<FormKatoDto>> GetForm2(PageQueryDto query, Guid formid)
        //{
        //    throw new NotImplementedException();
        //}

        //public Task<PageResultDto<FormKatoDto>> GetForm3(PageQueryDto query, Guid formid)
        //{
        //    throw new NotImplementedException();
        //}

        //public Task<PageResultDto<FormKatoDto>> GetForm4(PageQueryDto query, Guid formid)
        //{
        //    throw new NotImplementedException();
        //}

        //public Task<PageResultDto<FormKatoDto>> GetForm5(PageQueryDto query, Guid formid)
        //{
        //    throw new NotImplementedException();
        //}



    }
}
