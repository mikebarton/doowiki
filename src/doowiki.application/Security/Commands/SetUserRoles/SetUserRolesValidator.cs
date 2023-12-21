using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Security.Commands.SetUserRoles
{
    internal class SetUserRolesValidator : AbstractValidator<SetUserRolesCommand>
    {
        public SetUserRolesValidator()
        {
            RuleFor(x => x.UserId)
                .NotNull()
                .Must(x => x != Guid.Empty);

            RuleFor(x => x.Roles)
                .NotNull();
        }
    }
}
