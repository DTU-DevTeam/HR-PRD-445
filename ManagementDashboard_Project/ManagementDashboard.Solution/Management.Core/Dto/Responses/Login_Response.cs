using Management.Core.Domain.Entities.Security_Entities;
using Management.Core.Dto.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Core.Dto.Responses
{
    public class Login_Response
    {
        public Guid? UserID { get; set; }
        public string? UserName { get; set; }

        public string? Email { get; set; }

       
        
    }


    public static class Login_ResponseExtension
    {
       public static Login_Response ConvertToLogin_Response(this Account account)
       {
            return new Login_Response
            {
                UserName = account.UserName,
                UserID = account.UserID,
                Email = account.Email
            };
       }
    }
 
}
