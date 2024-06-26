using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebServer.Dtos;
using WebServer.Interfaces;
using WebServer.Models;

namespace WebServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReport _repo;
        public ReportController(IReport repo)
        {
            _repo = repo;
        }
        
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] int katoid)
        {
            try
            {
                return Ok(await _repo.Get(katoid));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Report_Form form)
        {
            try
            {
                return Ok(await _repo.Add(form));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery] Guid id)
        {
            try
            {
                return Ok(await _repo.Delete(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("services")]
        public async Task<IActionResult> GetServices()
        {
            try
            {
                return Ok(await _repo.GetServices());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("forms")]
        public async Task<IActionResult> GetTabsByServiceID(int Id)
        {
            try
            {
                return Ok(await _repo.GetTabsByServiceID(Id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[HttpGet]
        //[Route("tables")]
        //public async Task<IActionResult> GetApprovedFormItemColumnTablesById(Guid Id)
        //{
        //    try
        //    {
        //        return Ok(await _repo.GetApprovedFormItemColumnTablesById(Id));
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        //[HttpPost]
        //[Route("tables/post")]
        //public async Task<IActionResult> UpdateApprovedFormItemColumnTable(ApprovedFormItemColumnTableDto model)
        //{
        //    try
        //    {                
        //        return Ok(await _repo.UpdateApprovedFormItemColumnTable(model));
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
    }
}
