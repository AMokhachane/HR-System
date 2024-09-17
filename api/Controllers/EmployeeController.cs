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
[HttpPost]
public IActionResult Create([FromBody] CreateEmployeeRequestDto employeeDto)
{
    // Validate the incoming request
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    // Manually map properties from DTO to the Employee model
    var employeeModel = new Employee
    {
        Name = employeeDto.Name,
        Surname = employeeDto.Surname,
        Email = employeeDto.Email
        // Map other properties as needed
    };

    // Add the employee to the context
    _context.Employees.Add(employeeModel);

    try
    {
        // Save changes to the database
        _context.SaveChanges();
    }
    catch (Exception ex)
    {
        // Handle any exceptions that might occur
        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
    }

    // Return a response with status code 201 (Created)
    return CreatedAtAction(nameof(GetById), new { id = employeeModel.EmployeeId }, employeeModel);
}
    }
}