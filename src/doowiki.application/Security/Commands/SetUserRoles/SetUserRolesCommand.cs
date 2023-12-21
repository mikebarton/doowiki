using doowiki.application.Common.Security;
using doowiki.domain.Constants;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Security.Commands.SetUserRoles
{
    [Authorize(Roles = domain.Constants.Roles.Admin)]
    public class SetUserRolesCommand : IRequest
    {
        public Guid UserId { get; set; }
        public string[] Roles { get; set; }
    }
}
