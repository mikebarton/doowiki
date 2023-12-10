using doowiki.application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Spaces.Queries.GetSpacesList
{
    internal class GetSpacesHandler : IRequestHandler<GetSpacesListRequest, SpacesListDto>
    {
        private readonly IApplicationDbContext _context;

        public GetSpacesHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<SpacesListDto> Handle(GetSpacesListRequest request, CancellationToken cancellationToken)
        {
            var spaces = await _context.Spaces.Select(x => new SpaceDto(x.SpaceId, x.Name)).ToListAsync();
            return new SpacesListDto(spaces);
        }
    }
}
