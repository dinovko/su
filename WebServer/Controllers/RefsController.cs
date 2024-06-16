using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebServer.Interfaces;

namespace WebServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RefsController : ControllerBase
    {
        private readonly IRefs _repo;
        public RefsController(IRefs repo)
        {
            _repo = repo;
        }

        [HttpGet("GetRefList")]
        public async Task<IActionResult> GetRefList()
        {
            return Ok(await _repo.GetRefList());
        }
    }
}
