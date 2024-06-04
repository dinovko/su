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
        public DbSet<Supply_City_Form1> Supply_City_Form1 { get; set; }
        public DbSet<Supply_City_Form2> Supply_City_Form2 { get; set; }
        public DbSet<Supply_City_Form3> Supply_City_Form3 { get; set; }
        public DbSet<Supply_City_Form4> Supply_City_Form4 { get; set; }
        public DbSet<Supply_City_Form5> Supply_City_Form5 { get; set; }
        public DbSet<Tariff_Level> Tariff_Level { get; set; }
        public DbSet<Waste_City_Form1> Waste_City_Form1 { get; set; }
        public DbSet<Waste_City_Form2> Waste_City_Form2 { get; set; }
        public DbSet<Waste_City_Form3> Waste_City_Form3 { get; set; }
    }
}
