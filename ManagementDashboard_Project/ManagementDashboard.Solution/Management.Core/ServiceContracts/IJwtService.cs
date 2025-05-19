using Management.Core.Domain.Entities.Security_Entities;
using Management.Core.Dto.Responses;
using Management.Core.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Management.Core.ServiceContracts
{
    public interface IJwtService
    {
        AuthenticationResponse CreateJwtToken(Account account);
        ClaimsPrincipal? ReadJwtToken(string token);
    }
}
