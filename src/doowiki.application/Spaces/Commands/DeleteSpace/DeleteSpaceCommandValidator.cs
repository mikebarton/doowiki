using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Spaces.Commands.DeleteSpace
{
    internal class DeleteSpaceCommandValidator : AbstractValidator<DeleteSpaceCommand>
    {
        public DeleteSpaceCommandValidator()
        {
            RuleFor(x => x.SpaceId)
                .NotNull()
                .NotEqual(Guid.Empty);
        }
    }
}
