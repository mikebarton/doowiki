﻿using doowiki.application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.WikiUser.Queries.GetUserList
{
    public class GetUserListHandler : IRequestHandler<GetUserListRequest, GetUserItemDto[]>
    {
        private readonly IApplicationDbContext _context;
        private readonly IIdentityService _identityService;

        public GetUserListHandler(IApplicationDbContext context, IIdentityService identityService)
        {
            _context = context;
            _identityService = identityService;
        }

        public async Task<GetUserItemDto[]> Handle(GetUserListRequest request, CancellationToken cancellationToken)
        {
            var users = await _context.Users.ToListAsync();
            var wikiUsers = new List<GetUserItemDto>();
            foreach (var user in users)
            {
                wikiUsers.Add(new GetUserItemDto
                {
                    UserId = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Roles = (await _identityService.GetUserRoles(user.IdentityUserId)).ToArray()
                });
            }

            return wikiUsers.ToArray();
        }
    }
}
