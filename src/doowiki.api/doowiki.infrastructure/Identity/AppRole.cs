using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.infrastructure.Identity
{
    public class AppRole : IdentityRole<Guid>
    {
        public AppRole()
        {
            
        }

        public AppRole(string role) : base(role)
        {
            
        }
    }
}
