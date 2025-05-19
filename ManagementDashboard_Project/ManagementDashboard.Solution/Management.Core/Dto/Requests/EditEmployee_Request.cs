using ManagementDashboard.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Core.Dto.Requests
{
    public class EditEmployee_Request
    {
        public int EmployeeID { get; set; }

        public string FullName { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public string Gender { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public DateTime? HireDate { get; set; }

        public int DepartmentID { get; set; }

        public int PositionID { get; set; }

		public Employee_SqlServer ConvertToEmployee()
		{
			return new Employee_SqlServer()
			{
				EmployeeID = this.EmployeeID,
				FullName = this.FullName,
				DateOfBirth = this.DateOfBirth,
				Gender = this.Gender,
				PhoneNumber = this.PhoneNumber,
				Email = this.Email,
				HireDate = this.HireDate,
				DepartmentID = this.DepartmentID,
				PositionID = this.PositionID,
				Status = "active"

			};
		}
	}
}
