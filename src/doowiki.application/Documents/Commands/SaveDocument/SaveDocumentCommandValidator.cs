using doowiki.application.WikiUser.Commands.CreateUser;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Documents.Commands.SaveDocument
{
    internal class SaveSpaceCommandValidator : AbstractValidator<SaveDocumentCommand>
    {
        public SaveSpaceCommandValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MinimumLength(1);
        }
    }
}
