using doowiki.application.Common.Interfaces;
using doowiki.domain.Wiki;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Spaces.Commands
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
            Space space = null;
            if(request.SpaceId != null && request.SpaceId != Guid.Empty)
            {
                space = await _applicationDbContext.Spaces.FindAsync(request.SpaceId.Value);
            }
            else
            {
                space = new Space();
            }
            space.Name = request.Name;

            _applicationDbContext.Spaces.Add(space);
            await _applicationDbContext.SaveChangesAsync(cancellationToken);
            return space.SpaceId;
        }
    }
}
