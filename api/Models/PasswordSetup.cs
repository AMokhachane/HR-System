using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class PaaswordSetup
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public string Password { get; set; }
    }
}