using doowiki.application.Common.Security;
using doowiki.domain.Constants;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Spaces.Commands.SaveSpace
{

    [Authorize(Roles = $"{Roles.Author}, {Roles.Admin}")]
    public class SaveSpaceCommand : IRequest<Guid>
    {
        public Guid? SpaceId { get; set; }
        public string Name { get; set; }
    }
}
