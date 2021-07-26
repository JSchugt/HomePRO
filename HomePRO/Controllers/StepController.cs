using HomePRO.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HomePRO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StepController : ControllerBase
    {
        private readonly IStepRepository _stepRepository;
        public StepController(IStepRepository stepRepository) {
            _stepRepository = stepRepository;
        }
        // GET: api/<StepController>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_stepRepository.GetStepById(id));
        }

        // GET api/<StepController>/5
        [HttpGet("ProjectSteps/{id}")]
        public IActionResult GetByProjectId(int id)
        {
            return Ok(_stepRepository.StepsByProjectId(id));
        }

        // POST api/<StepController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<StepController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<StepController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
