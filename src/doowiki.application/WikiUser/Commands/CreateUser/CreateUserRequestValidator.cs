using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.WikiUser.Commands.CreateUser
{
    internal class CreateUserRequestValidator : AbstractValidator<CreateUserCommand>
    {
        public CreateUserRequestValidator()
        {
            RuleFor(v => v.Email)
                .EmailAddress();

            RuleFor(v => v.Password)
                .MinimumLength(6)
                .MaximumLength(30)
                .Matches(@"[A-Z]+")
                .Matches(@"[a-z]")
                .Matches(@"[0-9]")
                .NotEmpty();
        }
    }
}
