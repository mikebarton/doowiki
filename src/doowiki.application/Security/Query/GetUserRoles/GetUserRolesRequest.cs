using doowiki.application.Common.Security;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Security.Query.GetUserRoles
{
    [Authorize]
    public class GetUserRolesRequest : IRequest<GetUserRolesDto>
    {
        public Guid IdentityUserId { get; set; }
    }
}
