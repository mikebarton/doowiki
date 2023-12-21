using doowiki.application.Common.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Security.Commands.SetUserRoles
{
    internal class SetUserRolesHandler : IRequestHandler<SetUserRolesCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly IIdentityService _identityService;

        public SetUserRolesHandler(IApplicationDbContext context, IIdentityService identityService)
        {
            _context = context;
            _identityService = identityService;
        }

        public async Task Handle(SetUserRolesCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FindAsync(request.UserId);
            if (user == null)
                throw new InvalidDataException("there is not user with supplied id");

            await _identityService.SetUserRoles(user.IdentityUserId, request.Roles);
        }
    }
}
