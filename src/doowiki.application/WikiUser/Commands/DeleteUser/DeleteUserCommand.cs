using doowiki.application.Common.Security;
using doowiki.domain.Constants;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.WikiUser.Commands.DeleteUser
{
    [Authorize(Roles = Roles.Admin)]
    public class DeleteUserCommand : IRequest
    {
        public Guid UserId { get; set; }
    }
}
