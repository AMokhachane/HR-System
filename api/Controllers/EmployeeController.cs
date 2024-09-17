using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Employee;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using api.Models;

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
public IActionResult Create([FromBody] Employee employee)
{
    // Assuming you no longer need a DTO conversion here
    _context.Employees.Add(employee);
    _context.SaveChanges();
    
    return CreatedAtAction(nameof(GetById), new { id = employee.EmployeeId }, employee);
}
    }
}