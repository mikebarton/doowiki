using doowiki.application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.WikiUser.Queries.GetUser
{
    public class GetUserHandler : IRequestHandler<GetUserRequest, GetUserDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IIdentityService _identityService;

        public GetUserHandler(IApplicationDbContext context, IIdentityService identityService)
        {
            _context = context;
            _identityService = identityService;
        }

        public async Task<GetUserDto> Handle(GetUserRequest request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FindAsync(request.UserId, cancellationToken);
            var username = await _identityService.GetUserNameAsync(user.IdentityUserId);
            var userDto = new GetUserDto
                {
                    UserId = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = username,
                    Roles = (await _identityService.GetUserRoles(user.IdentityUserId)).ToArray()
                };
            return userDto;            
        }
    }
}
