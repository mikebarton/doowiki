using doowiki.application.WikiUser.Commands.SaveUser;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.WikiUser.Commands.CreateUser
{
    internal class UpdateUserRequestValidator : AbstractValidator<UpdateUserCommand>
    {
        public UpdateUserRequestValidator()
        {
            RuleFor(v => v.Email)
                .EmailAddress();

            
        }
    }
}
