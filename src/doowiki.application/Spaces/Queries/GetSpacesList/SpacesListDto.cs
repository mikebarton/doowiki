using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Spaces.Queries.GetSpacesList
{
    public record SpacesListDto(List<SpaceDto> Spaces);
    public record SpaceDto(Guid Id, string Name);
    
}
