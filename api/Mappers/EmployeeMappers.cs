using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Employee;
using api.Models;

namespace api.Mappers
{
    public static class EmployeeMappers
    {
        public static EmployeeDto ToEmployeeDto(this Employee employeeModel)
        {
            return new EmployeeDto
            {
                EmployeeId = employeeModel.EmployeeId,
                FullName = employeeModel.FullName,
                Email = employeeModel.Email,
                Password = employeeModel.Password,
                IdentityNumber = employeeModel.IdentityNumber,
                DateOfBirth = employeeModel.DateOfBirth,
                Gender = employeeModel.Gender,
                ImageId = employeeModel.ImageId,
                TaxNumber = employeeModel.TaxNumber,
                MaritalStatus = employeeModel.MaritalStatus,
                PhysicalAddress = employeeModel.PhysicalAddress,
                PostalAddress = employeeModel.PostalAddress,
                Salary = employeeModel.Salary,
                ContractType = employeeModel.ContractType,
                StartDate = employeeModel.StartDate,
                EndDate = employeeModel.EndDate
                
            };
        }
    }
}