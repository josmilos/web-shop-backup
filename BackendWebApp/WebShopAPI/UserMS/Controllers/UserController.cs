using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebShopAPI.Dto;
using UserMS.Interfaces;
using WebShopAPI.Models;

namespace UserMS.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Post([FromBody] UserCredentialsDto credDto)
        {
            Dictionary<string, string> response = await _userService.Login(credDto);
            if (response["statusCode"] != "200")
            {
                return BadRequest(new { statusCode = response["statusCode"], message = response["message"] });
            }
            else
            {
                return Ok(new { StatusCode = response["statusCode"], token = response["token"] });
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Post([FromBody] UserDto userDto)
        {
            Dictionary<string, string> response = await _userService.Register(userDto);
            if(response["statusCode"] != "200") {
                return BadRequest(new { statusCode = response["statusCode"], message = response["message"] });
            }
            else
            {
                return Ok(new { StatusCode = response["statusCode"], token = response["token"] });
            }
        }

        [HttpGet("unverified-sellers")]
        [Authorize(Roles = "admin")]
        public IActionResult GetUnverifiedSellers()
        {

            return Ok(_userService.GetUnverifiedSellers());
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            return Ok(_userService.GetUsers());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_userService.GetById(id));
        }

        [HttpPost]
        public IActionResult CreateUser([FromBody] UserDto user)
        {
            return Ok(_userService.AddUser(user));
        }


        [HttpPatch("edit/{id}")]
        public IActionResult ChangeUser(int id, [FromBody] UserDto user)
        {
            Dictionary<string, string> response = _userService.UpdateUser(id, user);
            if (response["statusCode"] != "200")
            {
                return BadRequest(new { statusCode = response["statusCode"], message = response["message"] });
            }
            else
            {
                return Ok(new { StatusCode = response["statusCode"], message = response["message"] });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult DeleteUser(int id)
        {
            if (_userService.DeleteUser(id))
            {
                return Ok(new { StatusCode = "200", message = "User with ID " + id + " successfully deleted." });
            }
            return BadRequest(new { statusCode = "400", message = "User with ID " + id + " does not exist" });
        }

        [HttpPatch("verify-user/{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult VerifyUser(int id, [FromBody] string verification)
        {
            Dictionary<string, string> response = _userService.VerifyUser(id, verification);
            if (response["statusCode"] != "200")
            {
                return BadRequest(new { statusCode = response["statusCode"], message = response["message"] });
            }
            else
            {
                return Ok(new { StatusCode = "200", message = "User with ID " + id + " successfully verified." });
            }
        }
    }
}
