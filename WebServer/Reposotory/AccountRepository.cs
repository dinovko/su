using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WebServer.Data;
using WebServer.Dtos;
using WebServer.Helpers;
using WebServer.Interfaces;
using WebServer.Models;

namespace WebServer.Reposotory
{
    public class AccountRepository : IAccount
    {
        private readonly WaterDbContext _context;
        private readonly DbSet<Account> _dbSet;
        private readonly IHttpContextAccessor _httpContext;
        private readonly IConfiguration _configuration;

        public AccountRepository(
            WaterDbContext context,
            IHttpContextAccessor httpContext,
            IConfiguration configuration)
        {
            _context = context;
            _httpContext = httpContext;
            _dbSet = _context.Set<Account>();
            _configuration = configuration;
        }
        public async Task<AccountSignInResponseDto> SignIn(AccountSignInRequestDto request)
        {
            try
            {
                if (request.Equals(null) || (String.IsNullOrEmpty(request.login) || String.IsNullOrEmpty(request.pwd)))
                {
                    throw new Exception("Данные не могут быть пустыми");
                }
                var usr = await _dbSet.FirstOrDefaultAsync(x => x.Login.ToLower() == request.login.ToLower());
                if (usr == null)
                {
                    throw new Exception("Неверный логин или пароль");
                }
                if (!PasswordHelper.VerifyPassword(usr.PasswordHash, request.pwd))
                {
                    throw new Exception("Неверный логин или пароль");
                }
                var secretKey = _configuration.GetSection("tokenParams").GetSection("symKey").Value;
                var validIssuer = _configuration.GetSection("tokenParams").GetSection("validIssuer").Value;
                var validAudience = _configuration.GetSection("tokenParams").GetSection("validAudience").Value;
                var claims = new List<System.Security.Claims.Claim>();
                claims.Add(new Claim("uid", usr.Id.ToString()));
                claims.Add(new Claim("kato", usr.KatoCode.ToString()));
                if (usr.Bin != null)
                {
                    claims.Add(new Claim("bin", usr.Bin.ToString()));
                }

                var token = new TokenHelper().GenerateToken(secretKey, validIssuer, validAudience, 540, claims.ToArray());

                return new AccountSignInResponseDto()
                {
                    token = token,
                    rem = request.rem,
                    login = usr.Login
                };

            }
            catch (Exception)
            {
                throw;
            }
        }
    
        //SingUp()
        //add-migraion initCreate
        //upodate-database
    }
}
