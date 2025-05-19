using Management.Core.Domain.Entities.Security_Entities;
using Management.Core.Dto.Requests;
using Management.Core.Dto.Responses;
using Management.Core.RepositoryContract;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Management.Core.ServiceContracts;

namespace ManagementDashboard.UI.Controllers
{
    [Route("[Controller]/[action]")]
    public class AccountController : Controller
    {
        public ISecurityRepository _securityRepository;
        private readonly IJwtService _jwtService;

        public AccountController(ISecurityRepository securityRepository, IJwtService jwtService)
        {
            _securityRepository = securityRepository;
            
            _jwtService = jwtService;
        }

        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Register(Register_Request registerRequest)
        {
            if (!ModelState.IsValid)
            {
               // ModelState.AddModelError("", "Invalid registration attempt.");

               // ViewBag["Error"] = ModelState;

               // return View(registerRequest);
            }

            bool finishRegister = await _securityRepository.Register(registerRequest);

            if (finishRegister == false)
            {
                ModelState.AddModelError("", "Registration failed. Please try again.");
                return View(registerRequest);
            }

            return RedirectToAction("Login");
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] Login_Request loginRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Account account = await _securityRepository.Login(loginRequest);

            if (account == null)
            {
                return Unauthorized();
            }

            var authentication_Response = _jwtService.CreateJwtToken(account);

         /*   var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, account.UserName),
                        new Claim("AccountId", account.UserName.ToString())
                     };

            // Tao ClaimsIdentity
            var identity = new ClaimsIdentity(claims, "CookieAuth");
            var principal = new ClaimsPrincipal(identity);

            // login va luu cookie
            await HttpContext.SignInAsync("CookieAuth", principal);*/

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,         // Chỉ gửi qua HTTPS
                SameSite = SameSiteMode.Strict, // hoặc Lax/None tùy trường hợp
                Expires = DateTime.UtcNow.AddMinutes(20)
            };

            Response.Cookies.Append("jwt_token", authentication_Response.Token, cookieOptions);


            return Ok();
        }

        
        public IActionResult Logout()
        
        {
            string? userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);


            return Ok();
        }
    }
}
