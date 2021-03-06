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
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepostiory;
        public UserController(IUserRepository userRepository)
        {
            _userRepostiory = userRepository;
        }
        // GET: api/<UserController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userRepostiory.GetAllUserProfiles());
        }
        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userRepostiory.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            return Ok(_userRepostiory.GetByFirebaseUserId(id));
            //throw new NotImplementedException();
        }

        // POST api/<UserController>
        [HttpPost]
        public IActionResult Register(User userProfile)
        {

            // All newly registered users start out as a "user" user type (i.e. they are not admins)
            _userRepostiory.Add(userProfile);
            return CreatedAtAction(
                nameof(Get), new { FirebaseUserId = userProfile.FirebaseUserId }, userProfile);
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
