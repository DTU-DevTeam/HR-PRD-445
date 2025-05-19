using Management.Core.Domain.Entities.Security_Entities;
using Management.Core.Dto.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Core.RepositoryContract
{
    public interface ISecurityRepository
    {
        Task<Account> Login(Login_Request loggin_Request);
        Task<bool> Register(Register_Request register_Request);
        Task<bool> CheckDulicateAccount(Account account);

        Task<bool> AuthorizationUser(Guid? userid, Guid? functionid);
    }
}
