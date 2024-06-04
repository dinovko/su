using WebServer.Dtos;

namespace WebServer.Interfaces
{
    public interface IAccount
    {
        public Task<AccountSignInResponseDto> SignIn(AccountSignInRequestDto request);
    }
}
