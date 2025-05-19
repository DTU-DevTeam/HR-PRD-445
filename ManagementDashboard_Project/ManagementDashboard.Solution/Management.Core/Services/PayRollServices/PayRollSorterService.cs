using ManagementDashboard.Core.Domain.Entities;
using ManagementDashboard.Core.Enums;
using ManagementDashboard.Core.RepositoryContract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementDashboard.Core.Services.PayRollServices
{
    public class PayRollSorterService
    {
        public readonly IPayRollRepository payRollRepository;

        public PayRollSorterService(IPayRollRepository payRollRepository)
        {
            this.payRollRepository = payRollRepository;
        }

        public List<Salary_MySQL> GetSortedSalaries(List<Salary_MySQL> salaries, string sortBy, SortOrderOptions sortOrder)
        {

            if (string.IsNullOrEmpty(sortBy))
                return salaries;

            List<Salary_MySQL> sortedSalaries = (sortBy, sortOrder) switch
            {
                (nameof(Salary_MySQL.SalaryID), SortOrderOptions.Ascending) => salaries.OrderBy(temp => temp.SalaryID).ToList(),

                (nameof(Salary_MySQL.SalaryID), SortOrderOptions.Descending) => salaries.OrderByDescending(temp => temp.SalaryID).ToList(),

                (nameof(Salary_MySQL.EmployeeID), SortOrderOptions.Ascending) => salaries.OrderBy(temp => temp.EmployeeID).ToList(),

                (nameof(Salary_MySQL.EmployeeID), SortOrderOptions.Descending) => salaries.OrderByDescending(temp => temp.EmployeeID).ToList(),

                (nameof(Salary_MySQL.SalaryMonth), SortOrderOptions.Ascending) => salaries.OrderBy(temp => temp.SalaryMonth).ToList(),

                (nameof(Salary_MySQL.SalaryMonth), SortOrderOptions.Descending) => salaries.OrderByDescending(temp => temp.SalaryMonth).ToList(),

                (nameof(Salary_MySQL.BaseSalary), SortOrderOptions.Ascending) => salaries.OrderBy(temp => temp.BaseSalary).ToList(),

                (nameof(Salary_MySQL.BaseSalary), SortOrderOptions.Descending) => salaries.OrderByDescending(temp => temp.BaseSalary).ToList(),

                (nameof(Salary_MySQL.Bonus), SortOrderOptions.Ascending) => salaries.OrderBy(temp => temp.Bonus).ToList(),

                (nameof(Salary_MySQL.Bonus), SortOrderOptions.Descending) => salaries.OrderByDescending(temp => temp.Bonus).ToList(),

                (nameof(Salary_MySQL.Deductions), SortOrderOptions.Ascending) => salaries.OrderBy(temp => temp.Deductions).ToList(),

                (nameof(Salary_MySQL.Deductions), SortOrderOptions.Descending) => salaries.OrderByDescending(temp => temp.Deductions).ToList(),

                (nameof(Salary_MySQL.NetSalary), SortOrderOptions.Ascending) => salaries.OrderBy(temp => temp.NetSalary).ToList(),

                (nameof(Salary_MySQL.NetSalary), SortOrderOptions.Descending) => salaries.OrderByDescending(temp => temp.NetSalary).ToList(),

                (nameof(Salary_MySQL.CreatedAt), SortOrderOptions.Ascending) => salaries.OrderBy(temp => temp.CreatedAt).ToList(),

                (nameof(Salary_MySQL.CreatedAt), SortOrderOptions.Descending) => salaries.OrderByDescending(temp => temp.CreatedAt).ToList(),

               



                _ => salaries
            };

            return sortedSalaries;
        }

        public List<Attendance_MySql> GetSortedAttendances(List<Attendance_MySql> attendances, string sortBy, SortOrderOptions sortOrder)
        {
            if (string.IsNullOrEmpty(sortBy))
                return attendances;

            List<Attendance_MySql> sortedAttendances = (sortBy, sortOrder) switch
            {
                (nameof(Attendance_MySql.EmployeeID), SortOrderOptions.Ascending) => attendances.OrderBy(temp => temp.EmployeeID).ToList(),
                (nameof(Attendance_MySql.EmployeeID), SortOrderOptions.Descending) => attendances.OrderByDescending(temp => temp.EmployeeID).ToList(),

                (nameof(Attendance_MySql.AttendanceID), SortOrderOptions.Ascending) => attendances.OrderBy(temp => temp.AttendanceID).ToList(),
                (nameof(Attendance_MySql.AttendanceID), SortOrderOptions.Descending) => attendances.OrderByDescending(temp => temp.AttendanceID).ToList(),

                (nameof(Attendance_MySql.WorkDays), SortOrderOptions.Ascending) => attendances.OrderBy(temp => temp.WorkDays).ToList(),
                (nameof(Attendance_MySql.WorkDays), SortOrderOptions.Descending) => attendances.OrderByDescending(temp => temp.WorkDays).ToList(),

                (nameof(Attendance_MySql.AbsentDays), SortOrderOptions.Ascending) => attendances.OrderBy(temp => temp.AbsentDays).ToList(),
                (nameof(Attendance_MySql.AbsentDays), SortOrderOptions.Descending) => attendances.OrderByDescending(temp => temp.AbsentDays).ToList(),

                (nameof(Attendance_MySql.LeaveDays), SortOrderOptions.Ascending) => attendances.OrderBy(temp => temp.LeaveDays).ToList(),
                (nameof(Attendance_MySql.LeaveDays), SortOrderOptions.Descending) => attendances.OrderByDescending(temp => temp.LeaveDays).ToList(),

                (nameof(Attendance_MySql.AttendanceMonth), SortOrderOptions.Ascending) => attendances.OrderBy(temp => temp.AttendanceMonth).ToList(),
                (nameof(Attendance_MySql.AttendanceMonth), SortOrderOptions.Descending) => attendances.OrderByDescending(temp => temp.AttendanceMonth).ToList(),

                (nameof(Attendance_MySql.CreatedAt), SortOrderOptions.Ascending) => attendances.OrderBy(temp => temp.CreatedAt).ToList(),
                (nameof(Attendance_MySql.CreatedAt), SortOrderOptions.Descending) => attendances.OrderByDescending(temp => temp.CreatedAt).ToList(),

                _ => attendances
            };

            return sortedAttendances;
        }
    }
}
