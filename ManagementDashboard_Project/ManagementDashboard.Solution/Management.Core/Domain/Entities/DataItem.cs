using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Core.Domain.Entities
{
    public class DataItem
    {
        public string Label { get; set; }
        public int Value { get; set; }
    }

    public class CalendarDataItem
    {
        public string Label { get; set; }
        public DateTime Value { get; set; }
    }


}
