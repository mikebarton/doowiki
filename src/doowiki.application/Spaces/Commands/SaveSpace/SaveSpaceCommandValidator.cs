using doowiki.application.WikiUser.Commands;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Spaces.Commands.SaveSpace
{
    internal class SaveSpaceCommandValidator : AbstractValidator<SaveSpaceCommand>
    {
        public SaveSpaceCommandValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
        }
    }
}
