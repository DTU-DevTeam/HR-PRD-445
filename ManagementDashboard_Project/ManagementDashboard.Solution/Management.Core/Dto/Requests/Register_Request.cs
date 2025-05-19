using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Core.Dto.Requests
{
    public class Register_Request
    {
        public string? UserName { get; set; }
        public string? Password { get; set; }

        [Compare("Password")]
        public string? ConfirmPassword { get; set; }

        public string? Email { get; set; }

        public bool Payroll { get; set; } = false;

        public bool HumanResource { get; set; } = false;

        public bool Manager { get; set; } = false;

        public bool ReadOnly { get; set; } = false;


    }
}
