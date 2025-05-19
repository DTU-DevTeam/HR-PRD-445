using Azure.Identity;
using Management.Core.Domain.Entities.Security_Entities;
using Management.Core.Dto.Requests;
using Management.Core.RepositoryContract;
using Management.Core.Services.PasswordHashService;
using ManagementDashboard.Infrastructure.DatabaseContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementDashboard.Infrastructure.Repositories
{
    public class SecurityRepository : ISecurityRepository
    {
        public ApplicationDbContext_ManagementSystem _dbcontext_ManagementSystem;
       

        public SecurityRepository(ApplicationDbContext_ManagementSystem applicationDbContext_ManagementSystem) 
        {
            _dbcontext_ManagementSystem = applicationDbContext_ManagementSystem;
            
        }

        public async Task<Account> Login(Login_Request loggin_Request)
        {
           var user = await _dbcontext_ManagementSystem.Accounts.Where(x => x.UserName == loggin_Request.UserName).ToListAsync();
            if (user.Count > 0)
            {
                var userAccount = user.FirstOrDefault();
                if (userAccount != null)
                { 
                    if (ConvertPasswordHashService.VerifyPassword(loggin_Request.UserName, userAccount.PasswordHash, loggin_Request.Password))
                    {
                        return userAccount;
                    }
                }
            }

            return null;
            
        }

        public async Task<bool> Register(Register_Request register_Request)
        {
            Guid userid = Guid.NewGuid();

            Account account = new Account()
            {
                UserName = register_Request.UserName,
                Email = register_Request.Email,
                PasswordHash = ConvertPasswordHashService.HashPassword(register_Request.UserName, register_Request.Password),
                UserID = userid,
                Status = true,
            };

            _dbcontext_ManagementSystem.Accounts.Add(account);

            if(register_Request.Payroll == true)
            {
                User_Group group = new User_Group()
                {
                    GroupID = Guid.Parse("a4e22714-c5d1-4a35-8b8f-1a45715afd81"),
                    UserID = userid,
                };

                User_FunctionPermission user_FunctionPermission = new User_FunctionPermission()
                {
                    FunctionID = Guid.Parse("425b7c04-c5f0-4531-b894-809bfd3b878e"),
                    UserID = userid,
                   
                };

                _dbcontext_ManagementSystem.UserGroups.Add(group);
                _dbcontext_ManagementSystem.UserFunctionPermissions.Add(user_FunctionPermission);

            }

            if (register_Request.HumanResource == true)
            {
                User_Group group = new User_Group()
                {
                    GroupID = Guid.Parse("51946dc6-b4d3-45a6-8149-b0ed3ef29416"),
                    UserID = userid,
                };

                User_FunctionPermission user_FunctionPermission = new User_FunctionPermission()
                {
                    FunctionID = Guid.Parse("6e50879c-d3bf-4d1f-a27f-666a0265e46d"),
                    UserID = userid,
                };

                _dbcontext_ManagementSystem.UserGroups.Add(group);
                _dbcontext_ManagementSystem.UserFunctionPermissions.Add(user_FunctionPermission);
            }

            if (register_Request.Manager == true)
            {
                User_Group group = new User_Group()
                {
                    GroupID = Guid.Parse("6639772d-21bf-40e7-8094-c06912a08fd2"),
                    UserID = userid,
                };

                User_FunctionPermission user_FunctionPermission = new User_FunctionPermission()
                {
                    FunctionID = Guid.Parse("f0877dbd-cc09-43d6-a72f-ad5e9793cbd7"),
                    UserID = userid,
                };

                _dbcontext_ManagementSystem.UserGroups.Add(group);
                _dbcontext_ManagementSystem.UserFunctionPermissions.Add(user_FunctionPermission);
            }


            var result = await _dbcontext_ManagementSystem.SaveChangesAsync();
            if (result > 0)
            {
                return true;
            }

            return false;
        }

        public async Task<bool> CheckDulicateAccount(Account account)
        {
            var accounts = await _dbcontext_ManagementSystem.Accounts.ToListAsync();

            var duplicateAccount = accounts.Where(a => a.UserName == account.UserName || a.Email == account.Email).ToList();

            if (duplicateAccount.Count > 0)
            {
                return true;
            }

            return false;

        }

        public async Task<bool> AuthorizationUser(Guid? userid, Guid? functionid)
        {
            var listuser = await _dbcontext_ManagementSystem.UserFunctionPermissions.Where(x => x.UserID == userid).ToListAsync();
            var listuser_function = listuser.Where(x => x.FunctionID == functionid).FirstOrDefault();

            if (listuser_function != null)
            {
                return true;
            }

            return false;
        }

    }
}
