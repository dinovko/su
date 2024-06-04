using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebServer.Interfaces;

namespace WebServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RefsController : ControllerBase
    {
        private readonly IRefKato _repo;
        public RefsController(IRefKato repo)
        {
            _repo = repo;
        }
    }
}
