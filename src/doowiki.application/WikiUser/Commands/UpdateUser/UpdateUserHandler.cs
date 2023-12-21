using doowiki.application.Common.Interfaces;
using doowiki.application.WikiUser.Commands.CreateUser;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.WikiUser.Commands.SaveUser
{
    public class UpdateUserHandler : IRequestHandler<UpdateUserCommand, Guid>
    {
        private readonly IIdentityService _identityService;
        private readonly IApplicationDbContext _applicationDbContext;

        public UpdateUserHandler(IIdentityService identityService, IApplicationDbContext applicationDbContext)
        {
            _identityService = identityService;
            _applicationDbContext = applicationDbContext;
        }


        public async Task<Guid> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _applicationDbContext.Users.FindAsync(request.UserId);

            if (user == null)
                throw new InvalidDataException($"There is no user with id {request.UserId}");

            user.FirstName = request.FirstName;
            user.LastName = request.LastName;            

            await _applicationDbContext.SaveChangesAsync(cancellationToken);
            return user.Id;
        }
    }
}
