using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementDashboard.Core.Domain.Entities
{
    public class Dividend
    {
       
    }

    public class Dividend_SqlServer
    {
        public int DividendID { get; set; }

        public int EmployeeID { get; set; }

        public decimal DividendAmount { get; set; }

        public DateOnly DividendDate { get; set; }

        public DateTime CreateAt { get; set; }
    }

    
}
