using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Core.Domain.Entities.Security_Entities
{
    public class Account
    {
        [Key]
        public Guid UserID { get; set; }
        public string? UserName { get; set; }

        public string? PasswordHash { get; set; }

        public string? Email { get; set; }

        public bool Status { get; set; }
    }
}
