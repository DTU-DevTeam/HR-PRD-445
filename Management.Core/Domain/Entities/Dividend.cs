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

        public int ShareholderID { get; set; }

        public decimal DividendAmount { get; set; }

        public DateOnly PaymentDate { get; set; }
    }

    
}
