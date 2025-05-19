using Management.Core.Domain.Entities.Security_Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Core.Dto.Requests
{
    public class Login_Request
    {
        public string? UserName { get; set; }
        public string? Password { get; set; }

    }
}
