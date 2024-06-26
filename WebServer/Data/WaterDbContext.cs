using Business.Entities;
using Microsoft.EntityFrameworkCore;
using WebServer.Models;

namespace WebServer.Data
{
    public class WaterDbContext : DbContext
    {
        public WaterDbContext(DbContextOptions<WaterDbContext> options) : base(options) { }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<ActionLog> ActionLogs { get; set; }
        public DbSet<Consumers> Consumers { get; set; }
        public DbSet<Pipeline> Pipelines { get; set; }
        public DbSet<Ref_Building> Ref_Buildings { get; set; }
        public DbSet<Ref_Kato> Ref_Katos { get; set; }
        public DbSet<Ref_Status> Ref_Statuses { get; set; }
        public DbSet<Ref_Street> Ref_Streets { get; set; }

        public DbSet<Report_Form> Report_Forms { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Tariff_Level> Tariff_Level { get; set; }
        public DbSet<SettingsValue> SettingsValues { get; set; }
        public DbSet<ApprovedForm> ApprovedForms { get; set; }
        public DbSet<ApprovedFormItem> ApprovedFormItems { get; set; }
        public DbSet<ApprovedFormItemColumn> ApprovedFormItemColumns { get; set; }
        public DbSet<Models.Data> Data { get; set; }
    }
}
