using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class AppUser : IdentityUser
    {
        
     
        public string Name { get; set; }

     
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        
        public DateTime ModifiedDate { get; set; } = DateTime.Now;

     
        public DateTime LastLogin { get; set; } = DateTime.Now;


        
    }
}