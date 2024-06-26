using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Security.Principal;
using System.Text;
using WebServer.Data;
using WebServer.Helpers;
using WebServer.Interfaces;
using WebServer.Models;
using WebServer.Reposotory;

namespace WebServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var configuration = builder.Configuration;
            var environment = builder.Environment;

            #region CORS ���������
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    p =>
                    {
                        //p.WithOrigins("http://localhost:80")
                        p.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .WithMethods("GET", "POST", "PUT", "DELETE");
                    });
            });
            #endregion
            #region �����������
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = configuration.GetSection("tokenParams").GetSection("validIssuer").Value,
                    ValidAudience = configuration.GetSection("tokenParams").GetSection("validAudience").Value,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("tokenParams").GetSection("symKey").Value)),
                };
            });
            #endregion
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddControllers();
            builder.Services.AddDbContext<WaterDbContext>(opt => opt.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));
            #region DI ����
            builder.Services.AddScoped(typeof(IAccount), typeof(AccountRepository));
            builder.Services.AddScoped(typeof(Interfaces.IForms), typeof(Reposotory.FormsRepository));
            builder.Services.AddScoped(typeof(Interfaces.IRefKato), typeof(Reposotory.RefKatoRepository));
            #endregion
            #region Swagger
            builder.Services.AddSwaggerGen(sw =>
            {
                sw.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Water", Version = "v1" });
                sw.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                    Description = "����� �������� �����.Bearer ����� ������� ������ �� �����",
                    Name = "�����������",
                    Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "Bearer"
                });
                sw.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[]{ }
                    }
                });
            });
            #endregion
            var app = builder.Build();
            #region �������� ������������,������������� � �� ��...
            using (var scope = app.Services.CreateScope())
            {
                var dbCtx = scope.ServiceProvider.GetRequiredService<WaterDbContext>();
                dbCtx.Database.EnsureCreated();
                var helper = new DatabaseHelper();
                helper.InitializeRefs(dbCtx, environment); //�����������
                helper.InitializeDefaultUsers(dbCtx, environment); //������������
            }
            #endregion
            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
            });
            if (app.Environment.IsDevelopment())
            {
            }
            else
            {
                app.UseHsts();
                app.UseHttpsRedirection();
            }

            app.UseCors();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
