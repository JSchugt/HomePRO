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
    public class ProjectMaterialsController : ControllerBase
    {
        private readonly IProjectMaterialsRepository _projectMaterialsRepository;

        public ProjectMaterialsController(IProjectMaterialsRepository projectMaterialsRepository)
        {
            _projectMaterialsRepository = projectMaterialsRepository;
        }
        // GET api/<ProjectMaterialsController>/5
        [HttpGet("{id}")]
        public ProjectMaterials Get(int id)
        {
            return _projectMaterialsRepository.GetProjectMaterialsByProjectId(id);
        }

        // POST api/<ProjectMaterialsController>
        [HttpPost]
        public void Post(ProjectMaterials project)
        {
            _projectMaterialsRepository.AddMaterialsToProject(project);
        }
        [HttpDelete("Material/{projId}/{id}")]
        public void DeletePM(int id, int projId) {
            _projectMaterialsRepository.deleteProjectMaterialsByProjectIdAndMaterial(projId, id);
        }
        // DELETE api/<ProjectMaterialsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _projectMaterialsRepository.DeleteProjectMaterialsById(id);
        }
        [HttpDelete("ProjectId/{id}")] 
        public void DeleteByProjectId(int id) {
            _projectMaterialsRepository.DeleteProjectMaterialsByProjectId(id);
        }

    }
}
