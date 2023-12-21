using doowiki.application.Common.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Security.Query.GetUserRoles
{
    public class GetUserRolesHandler : IRequestHandler<GetUserRolesRequest, GetUserRolesDto>
    {
        private readonly IIdentityService _identityService;

        public GetUserRolesHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<GetUserRolesDto> Handle(GetUserRolesRequest request, CancellationToken cancellationToken)
        {
            var roles = await _identityService.GetUserRoles(request.IdentityUserId);
            return new GetUserRolesDto { Roles = roles.ToArray() };
        }
    }
}
