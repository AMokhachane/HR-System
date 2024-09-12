using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Employee
{
    public class CreateEmployeeRequestDto
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string IdentityNumber { get; set; } = string.Empty;
        public int DateOfBirth { get; set; }
        public string Gender { get; set; } = string.Empty;
        public int ImageId { get; set; }
        public string TaxNumber { get; set; } = string.Empty;
        public string MaritalStatus { get; set; } = string.Empty;
        public string PhysicalAddress { get; set; } = string.Empty;
        public string PostalAddress { get; set; } = string.Empty;
        public int Salary { get; set; }
        public string ContractType { get; set; } = string.Empty;
        public DateTime StartDate { get; set; } = DateTime.Now;
        public DateTime EndDate { get; set; }
    }
}