using doowiki.application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.WikiUser.Queries.GetUserList
{
    public class GetUserListHandler : IRequestHandler<GetUserListRequest, GetUserDto[]>
    {
        private readonly IApplicationDbContext _context;
        private readonly IIdentityService _identityService;
        private readonly IUser _user;

        public GetUserListHandler(IApplicationDbContext context, IIdentityService identityService, IUser user)
        {
            _context = context;
            _identityService = identityService;
            _user = user;
        }

        public async Task<GetUserDto[]> Handle(GetUserListRequest request, CancellationToken cancellationToken)
        {
            var users = await _context.Users.ToListAsync();
            var wikiUsers = new List<GetUserDto>();
            foreach (var user in users)
            {
                wikiUsers.Add(new GetUserDto
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Roles = (await _identityService.GetUserRoles(user.IdentityUserId)).ToArray()
                });
            }

            return wikiUsers.ToArray();
        }
    }
}
