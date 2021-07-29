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
    public class MaterialsController : ControllerBase
    {
        private readonly IMaterialsRepository _materialsRepository;
        public MaterialsController(IMaterialsRepository materials) {
            _materialsRepository = materials;
        }
        // GET: api/<MaterialsController>
        [HttpGet("UserId/{id}")]
        public IActionResult GetMaterialsByUserId(string id)
        {
            return Ok(_materialsRepository.GetMaterialsByUserId(id));
        }

        // GET api/<MaterialsController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_materialsRepository.GetMaterialsById(id));
        }

        // POST api/<MaterialsController>
        [HttpPost]
        public void Post(Materials materials)
        {
            _materialsRepository.AddMaterial(materials);
        }

        // PUT api/<MaterialsController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Materials materials)
        {
            if (id != materials.Id) {
                return BadRequest();
            }
            _materialsRepository.EditMaterials(materials);
            return Ok();
        }

        // DELETE api/<MaterialsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _materialsRepository.DeleteMaterialsById(id);
        }
    }
}
