using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;


namespace api.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {
            
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<BankingDetail> BankingDetails { get; set; }
        public DbSet<JobGrade> JobGrades { get; set; }
        public DbSet<JobTitle> JobTitles { get; set; }
        public DbSet<LeavePolicy> LeavePolicies { get; set; }
        public DbSet<Qualification> Qualifications { get; set; }

    }
}