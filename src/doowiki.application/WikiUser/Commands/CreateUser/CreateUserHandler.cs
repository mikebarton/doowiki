using doowiki.application.Common.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.WikiUser.Commands.CreateUser
{
    internal class CreateUserHandler : IRequestHandler<CreateUserCommand, Guid>
    {
        private readonly IIdentityService _identityService;
        private readonly IApplicationDbContext _applicationDbContext;

        public CreateUserHandler(IIdentityService identityService, IApplicationDbContext applicationDbContext)
        {
            _identityService = identityService;
            _applicationDbContext = applicationDbContext;
        }

        public async Task<Guid> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var (result, userId) = await _identityService.CreateUserAsync(request.Email, request.Password);
            if (!result.Succeeded)
                throw new Exception($"Unable to create new user - {string.Join(',', result.Errors)}");

            var user = new domain.Wiki.WikiUser()
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                IdentityUserId = userId
            };

            await _applicationDbContext.Users.AddAsync(user);

            await _applicationDbContext.SaveChangesAsync(cancellationToken);
            return user.Id;
        }
    }
}
