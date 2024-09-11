using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Employee;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/employee")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public EmployeeController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var employees = _context.Employees.ToList()
            .Select(s => s.ToEmployeeDto());

            return Ok(employees);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var employee = _context.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee.ToEmployeeDto());
        }

        //This is the post form for a new employee
        [HttpPost]
        public IActionResult Create([FromBody] CreateEmployeeRequestDto employeeDto)
        {
            var employeeModel = employeeDto.ToEmployeeFromCreateDTO();
            _context.Employees.Add(employeeModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = employeeModel.EmployeeId }, employeeModel.ToEmployeeDto());
        }
    }
}