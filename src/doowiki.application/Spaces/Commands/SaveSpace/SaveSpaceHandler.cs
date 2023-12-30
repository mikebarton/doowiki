using doowiki.application.Common.Interfaces;
using doowiki.domain.Wiki;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Spaces.Commands.SaveSpace
{
    internal class SaveSpaceHandler : IRequestHandler<SaveSpaceCommand, Guid>
    {
        private readonly IApplicationDbContext _applicationDbContext;

        public SaveSpaceHandler(IApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<Guid> Handle(SaveSpaceCommand request, CancellationToken cancellationToken)
        {
            Space? space = null;
            if (request.SpaceId != null && request.SpaceId != Guid.Empty)
            {
                space = await _applicationDbContext.Spaces.FindAsync(request.SpaceId.Value);

                if (space == null)
                    throw new InvalidDataException("No space with ID: " + request.SpaceId);
            }
            else
            {
                space = new Space();
                _applicationDbContext.Spaces.Add(space);
            }
            space.Name = request.Name;

            await _applicationDbContext.SaveChangesAsync(cancellationToken);
            return space.SpaceId;
        }
    }
}
