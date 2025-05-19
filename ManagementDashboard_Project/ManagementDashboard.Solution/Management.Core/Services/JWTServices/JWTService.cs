using Management.Core.Domain.Entities.Security_Entities;
using Management.Core.Dto.Responses;
using Management.Core.Identity;
using Management.Core.ServiceContracts;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;


namespace Management.Core.Services.JWTServices
{
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _configuration;

        public JwtService(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        public AuthenticationResponse CreateJwtToken(Account account)
        {
            DateTime expiration = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["Jwt:EXPIRATION_MINUTES"]));

            Claim[] claims = new Claim[] {
                new Claim(JwtRegisteredClaimNames.Sub, account.UserID.ToString()), //Subject (user id)
                
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), //JWT unique ID
                
                new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64), //Issued at (date and time of token generation)
                
                new Claim(ClaimTypes.NameIdentifier, account.Email), //Unique name identifier of the user (Email)
                
                new Claim(ClaimTypes.Name, account.UserName) //Name of the user

                
            };


            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(
             Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])
             );

            SigningCredentials signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken tokenGenerator = new JwtSecurityToken(
             _configuration["Jwt:Issuer"],
             _configuration["Jwt:Audience"],
             claims,
             expires: expiration,
             signingCredentials: signingCredentials
             );

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            string token = tokenHandler.WriteToken(tokenGenerator);


            return new AuthenticationResponse() { Token = token, Email = account.Email, PersonName = account.UserName, Expiration = expiration };

        }

        public ClaimsPrincipal? ReadJwtToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

            try
            {
                var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),

                    ValidateIssuer = true,
                    ValidIssuer = _configuration["Jwt:Issuer"],

                    ValidateAudience = true,
                    ValidAudience = _configuration["Jwt:Audience"],

                    ClockSkew = TimeSpan.FromMinutes(5) // không cho phép thời gian trễ
                }, out SecurityToken validatedToken);

                return principal;
            }
            catch (Exception)
            {
                // Token không hợp lệ (hết hạn, sai chữ ký, v.v.)
                return null;
            }
        }

    }
}
