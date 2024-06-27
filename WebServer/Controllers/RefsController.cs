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

        [HttpGet("refRolesList")]
        public async Task<IActionResult> GetRefRolesList()
        {
            return Ok(await _repo.GetRefRolesList());
        }

        [HttpGet("datatypes")]
        public ActionResult GetDataTypes()
        {
            return Ok(_repo.GetDataTypes());
        }

        [HttpGet("univerList")]
        public async Task<ActionResult> GetRefUniverList()
        {
            try
            {
                return Ok(await _repo.GetRefUniverList());
            }
            catch (Exception ex) 
            { 
                return BadRequest(ex.Message);
            }
            
        }

        [HttpGet("businesList")]
        public async Task<ActionResult> GetBusinesDictList()
        {
            return Ok(await _repo.GetBusinesDictList());
        }
    }
}
