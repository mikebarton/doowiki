using doowiki.application.Common.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Spaces.Commands.DeleteSpace
{
    internal class DeleteSpaceHandler : IRequestHandler<DeleteSpaceCommand>
    {
        private IApplicationDbContext _context;

        public DeleteSpaceHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Handle(DeleteSpaceCommand request, CancellationToken cancellationToken)
        {
            var space = await _context.Spaces.FindAsync(request.SpaceId);
            if (space == null)
                throw new InvalidDataException("No space with Id: " + request.SpaceId);

            if (string.Equals(space.Name, "Default", StringComparison.OrdinalIgnoreCase))
                return;

            _context.Spaces.Remove(space);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
