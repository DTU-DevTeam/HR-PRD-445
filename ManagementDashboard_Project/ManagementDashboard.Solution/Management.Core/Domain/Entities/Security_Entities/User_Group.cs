using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Management.Core.Domain.Entities.Security_Entities
{
    [PrimaryKey(nameof(GroupID), nameof(UserID))]
    public class User_Group
    {
       
        public Guid GroupID { get; set; }

       
        public Guid UserID { get; set; }
    }
}
