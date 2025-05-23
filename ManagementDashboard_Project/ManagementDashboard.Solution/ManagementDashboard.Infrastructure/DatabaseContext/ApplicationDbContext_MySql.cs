﻿using ManagementDashboard.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace ManagementDashboard.Infrastructure.DatabaseContext
{
    public class ApplicationDbContext_MySql : DbContext
    {
        public ApplicationDbContext_MySql(DbContextOptions<ApplicationDbContext_MySql> options) : base(options)
        {

        }

        public DbSet<Employee_MySql> Employees { get; set; }
        public DbSet<Salary_MySQL> PayRolls { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Employee_MySql>().ToTable("employees");

            modelBuilder.Entity<Salary_MySQL>().ToTable("salaries");
        }

      
    }
}
