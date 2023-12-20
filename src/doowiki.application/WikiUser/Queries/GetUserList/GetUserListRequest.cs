using doowiki.application.Common.Security;
using doowiki.domain.Constants;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.WikiUser.Queries.GetUserList
{
    [Authorize(Roles = Roles.Admin)]
    public class GetUserListRequest : IRequest<GetUserDto[]>
    {
    }
}
