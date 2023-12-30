using doowiki.application.WikiUser.Commands.CreateUser;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.WikiUser.Commands.DeleteUser
{
    internal class DeleteUserRequestValidator : AbstractValidator<DeleteUserCommand>
    {
        public DeleteUserRequestValidator()
        {
            RuleFor(v => v.UserId)
                .NotNull()
                .NotEqual(Guid.Empty);
        }
    }
}
