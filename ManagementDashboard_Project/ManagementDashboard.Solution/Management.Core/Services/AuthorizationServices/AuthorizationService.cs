using Management.Core.RepositoryContract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Core.Services.AuthorizationServices
{
    public class AuthorizationService
    {
        public ISecurityRepository _SecurityRepository;

        public AuthorizationService(ISecurityRepository securityRepository)
        {
            _SecurityRepository = securityRepository;
        }

        public async Task<bool> AuthorizationUser(Guid? userid, Guid? functionid)
        {
            return await _SecurityRepository.AuthorizationUser(userid, functionid);
        }
    }
}
