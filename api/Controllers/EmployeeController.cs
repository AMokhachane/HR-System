using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Employee;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

using Microsoft.Extensions.Logging;

using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using System.Security.Claims;

using api.Interfaces;

namespace api.Controllers
{


[ApiController]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly ApplicationDBContext _context;
    private readonly ISenderEmail _emailSender;

    public EmployeeController(UserManager<AppUser> userManager, ApplicationDBContext context, ISenderEmail emailSender)
    {
        _userManager = userManager;
        _context = context;
        _emailSender = emailSender;
    }

    [HttpPost]
public async Task<IActionResult> CreateEmployee([FromBody] EmployeeDto employeeDto)
{
    // Step 1: Create a new user in AspNetUsers
    var user = new AppUser
    {
        UserName = employeeDto.Email,
        Email = employeeDto.Email,
        EmailConfirmed = false
    };


// Create user and set password
    var resultp = await _userManager.CreateAsync(user, employeeDto.PasswordHash);
    if (!resultp.Succeeded)
    {
        return BadRequest(resultp.Errors);
    }

 // Step 2: Generate an email confirmation token
    var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
    var confirmationLink = Url.Action(nameof(ConfirmEmail), "Employee", new { token, email = user.Email }, Request.Scheme);


  // Step 4: Send confirmation and reset password emails
    var emailBody = $"Please confirm your account by clicking this link: {confirmationLink}<br/>";
                 

    await _emailSender.SendEmailAsync(user.Email, "Confirm your email and set your password", emailBody);



    // Create user and set password
    var result = await _userManager.CreateAsync(user, employeeDto.PasswordHash);
    if (!result.Succeeded)
    {
        return BadRequest(result.Errors);
    }

    // Step 2: Create an employee record
    var employee = new Employee
    {
        Name = employeeDto.Name,
        Surname = employeeDto.Surname,
        Email = employeeDto.Email,
        IdentityNumber = employeeDto.IdentityNumber,
        PassportNumber = employeeDto.PassportNumber,
        DateOfBirth = employeeDto.DateOfBirth,
        Gender = employeeDto.Gender,
        TaxNumber = employeeDto.TaxNumber,
        MaritalStatus = employeeDto.MaritalStatus,
        PhysicalAddress = employeeDto.PhysicalAddress,
        PostalAddress = employeeDto.PostalAddress,
        Salary = employeeDto.Salary,
        ContractType = employeeDto.ContractType,
        StartDate = employeeDto.StartDate,
        EndDate = employeeDto.EndDate,
        Url = employeeDto.Url,
        AspNetUserId = user.Id // Link Employee to User
    };

    _context.Employees.Add(employee);
    await _context.SaveChangesAsync();

    return Ok(new { Message = "User created successfully." });
}



    [HttpGet("ConfirmEmail")]
    public async Task<IActionResult> ConfirmEmail(string token, string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            return BadRequest("Invalid Email.");
        }

        var result = await _userManager.ConfirmEmailAsync(user, token);
        if (result.Succeeded)
        {
            return Ok("Email confirmed successfully.");
        }

        return BadRequest("Email confirmation failed.");
    }
}


}