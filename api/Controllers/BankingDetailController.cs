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
    public class BankingDetailController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ApplicationDBContext _context;

        public BankingDetailController(UserManager<AppUser> userManager, ApplicationDBContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBankingDetails([FromBody] BankingDetailDto bankingDetailDto)
        {
            // Step 1: Find the user using AppUserId
            var user = await _userManager.FindByIdAsync(bankingDetailDto.AppUserId);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            // Step 2: Create a new BankingDetails record
            var bankingDetail = new BankingDetail
            {
                BankName = bankingDetailDto.BankName,
                AccountNumber = bankingDetailDto.AccountNumber,
                AccountType = bankingDetailDto.AccountType,
                BranchCode = bankingDetailDto.BranchCode,
                AppUserId = bankingDetailDto.AppUserId // Link BankingDetails to AppUser via AppUserId
            };

            // Step 3: Add the banking details to the context
            _context.BankingDetails.Add(bankingDetail);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Banking details created successfully." });
        }


[HttpGet]
public async Task<IActionResult> GetAllBankingDetails()
{
    // Step 1: Retrieve all banking details from the database
    var bankingDetails = await _context.BankingDetails.ToListAsync();

    // Step 2: Check if there are any banking details
    if (bankingDetails == null || bankingDetails.Count == 0)
    {
        return NotFound("No banking details found.");
    }

    // Step 3: Create a list of DTOs to return the banking details
    var bankingDetailsDtos = bankingDetails.Select(b => new BankingDetailDto
    {
        BankName = b.BankName,
        AccountNumber = b.AccountNumber,
        AccountType = b.AccountType,
        BranchCode = b.BranchCode,
        AppUserId = b.AppUserId
    }).ToList();

    return Ok(bankingDetailsDtos);
}






        [HttpGet("{id}")]
public async Task<IActionResult> GetBankingDetailsById(int id)
{
    // Step 1: Find the banking details using the provided ID
    var bankingDetail = await _context.BankingDetails.FindAsync(id);
    
    // Step 2: Check if the banking details were found
    if (bankingDetail == null)
    {
        return NotFound("Banking details not found.");
    }

    // Step 3: Return the banking details
    var bankingDetailDto = new BankingDetailDto
    {
        BankName = bankingDetail.BankName,
        AccountNumber = bankingDetail.AccountNumber,
        AccountType = bankingDetail.AccountType,
        BranchCode = bankingDetail.BranchCode,
        AppUserId = bankingDetail.AppUserId
    };

    return Ok(bankingDetailDto);
}
    }
}