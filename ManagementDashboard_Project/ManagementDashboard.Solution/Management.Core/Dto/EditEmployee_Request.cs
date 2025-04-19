using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementDashboard.Core.Dto
{
    public class EditEmployee_Request
    {
        public int EmployeeID { get; set; }

        public int DepartmentID { get; set; }

        public decimal Salary { get; set; }

        public int ApplicantID { get; set; }

        public DateOnly HireDate { get; set; }
    }
}
