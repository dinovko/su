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

        [HttpGet("datatypes")]
        public ActionResult GetDataTypes()
        {
            return Ok(_repo.GetDataTypes());
        }
    }
}
