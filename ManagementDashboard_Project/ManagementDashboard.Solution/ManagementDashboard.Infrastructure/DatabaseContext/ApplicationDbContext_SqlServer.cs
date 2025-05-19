using ManagementDashboard.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagementDashboard.Infrastructure.DatabaseContext
{
    public class ApplicationDbContext_SqlServer : DbContext
    {
        public ApplicationDbContext_SqlServer(DbContextOptions<ApplicationDbContext_SqlServer> options) : base(options) 
        { 

        }

        public DbSet<Employee_SqlServer> Employees { get; set; }
        public DbSet<Department_SqlServer> Departments { get; set; }

        public DbSet<Position_SqlServer> Positions { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Employee_SqlServer>().ToTable("Employees");

            modelBuilder.Entity<Department_SqlServer>().ToTable("Departments");

            modelBuilder.Entity<Position_SqlServer>().ToTable("Positions");

          
        }
    }
}
