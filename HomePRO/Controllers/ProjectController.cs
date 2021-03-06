using HomePRO.Models;
using HomePRO.Repositories;
using Microsoft.AspNetCore.Authorization;
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
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;
        public ProjectController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }
        // GET: api/<ProjectController>

        /// <summary>
        /// Returns a Project by the Projects Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>A project Obejct with data retrieved from the database</returns>
        // GET api/<ProjectController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_projectRepository.GetProjectById(id));
        }
        // GET api/<ProjectController>/5
        [HttpGet("user/{id}")]
        public IActionResult GetByUserId(string id)
        {
            return Ok(_projectRepository.GetProjectsByUserId(id));
        }
        // POST api/<ProjectController>
        [HttpPost]
        public void Post(Project project)
        {
            _projectRepository.Add(project);
        }

        // PUT api/<ProjectController>/5
        [HttpPut("{id}")]
        public IActionResult  Put(int id, Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }
            _projectRepository.EditPorject(project);
            return NoContent();
        }

        // DELETE api/<ProjectController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _projectRepository.DeleteProjectById(id);
        }
    }
}
