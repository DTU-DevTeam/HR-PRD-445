using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementDashboard.Core.Domain.Entities
{
    public class Applicant
    {

    }

    public class Applicant_SqlServer
    {
        [Key]
        public int ApplicantId { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public DateOnly? ApplicationDate { get; set; }

        public string? Status { get; set; }

        public int JobID { get; set; }
    } 


}
