using ManagementDashboard.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementDashboard.Core.Dto
{
    public class AddEmployee_Request
    {

        public int DepartmentID { get; set; }

        public decimal Salary { get; set; }

        public int ApplicantID { get; set; }

        public DateOnly HireDate { get; set; }
    }
}
