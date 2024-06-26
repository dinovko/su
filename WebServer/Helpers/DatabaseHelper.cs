using Microsoft.EntityFrameworkCore;
using WebServer.Data;

namespace WebServer.Helpers
{
    internal class DatabaseHelper
    {
        internal void InitializeRefs(WaterDbContext context, IWebHostEnvironment environment)
        {
            if (context == null) throw new ArgumentNullException("context");
            if (!context.Ref_Katos.Any())
            {
                using (var transaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        string baseDir = environment.ContentRootPath;
                        string scriptsPath = Path.Combine(baseDir, "Scripts", "kato_insert.sql");
                        var script = System.IO.File.ReadAllText(scriptsPath);
                        context.Database.ExecuteSqlRaw(script);
                        transaction.Commit();
                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            }
            if (!context.Ref_Statuses.Any())
            {
                using (var transaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        string baseDir = environment.ContentRootPath;
                        string scriptsPath = Path.Combine(baseDir, "Scripts", "refstatus_insert.sql");
                        var script = System.IO.File.ReadAllText(scriptsPath);
                        context.Database.ExecuteSqlRaw(script);
                        transaction.Commit();
                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            }
            if(!context.SettingsValues.Any())
            {
                using (var transaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        string baseDir = environment.ContentRootPath;
                        string scriptsPath = Path.Combine(baseDir, "Scripts", "settingsvalue_insert.sql");
                        var script = System.IO.File.ReadAllText(scriptsPath);
                        context.Database.ExecuteSqlRaw(script);
                        transaction.Commit();
                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            }
            if (!context.Ref_Roles.Any() && !context.Ref_Access.Any() && !context.Ref_Role_Access.Any())
            {
                using (var transaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        string baseDir = environment.ContentRootPath;
                        string scriptsPath = Path.Combine(baseDir, "Scripts", "refroles_insert.sql");
                        var script = System.IO.File.ReadAllText(scriptsPath);
                        context.Database.ExecuteSqlRaw(script);
                        transaction.Commit();
                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            }
        }

        internal void InitializeDefaultUsers(WaterDbContext context, IWebHostEnvironment environment)
        {
            if (context == null) throw new ArgumentNullException("context");
            if (!context.Accounts.Any())
            {
                using (var transaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        string baseDir = environment.ContentRootPath;
                        string scriptsPath = Path.Combine(baseDir, "Scripts", "account_insert.sql");
                        var script = System.IO.File.ReadAllText(scriptsPath);
                        context.Database.ExecuteSqlRaw(script);
                        transaction.Commit();
                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            }
        }

        internal async Task<bool> DatabaseHasTablesAsync(WaterDbContext context)
        {
            var connection = context.Database.GetDbConnection();
            await connection.OpenAsync();
            using (var command = connection.CreateCommand())
            {
                command.CommandText = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE table_name='Accounts'";
                var result = await command.ExecuteScalarAsync();
                return result != null;
            }
        }
    }
}
