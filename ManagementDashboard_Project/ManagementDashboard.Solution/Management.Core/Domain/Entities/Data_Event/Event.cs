using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Core.Domain.Entities.Data_Event
{
    public class Event
    {
        [Key]
        public Guid EventID { get; set; }
        public string? Title { get; set; }
        public DateTime StartEvent { get; set; }

        public DateTime EndEvent { get; set; }
    }
}
