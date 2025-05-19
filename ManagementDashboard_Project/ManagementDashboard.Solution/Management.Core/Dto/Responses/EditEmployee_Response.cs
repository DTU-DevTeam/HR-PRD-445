using ManagementDashboard.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Core.Dto.Responses
{
	public class EditEmployee_Response
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

		
	}

	public static class EditEmployeeExtension
	{
		public static EditEmployee_Response ToEditEmployee_Response(this Employee_SqlServer employee)
		{
			return new EditEmployee_Response()
			{
				EmployeeID = employee.EmployeeID,
				FullName = employee.FullName,
				DateOfBirth = employee.DateOfBirth,
				Gender = employee.Gender,
				PhoneNumber = employee.PhoneNumber,
				Email = employee.Email,
				HireDate = employee.HireDate,
				DepartmentID = employee.DepartmentID,
				PositionID = employee.PositionID

			};
		}
	}
}
