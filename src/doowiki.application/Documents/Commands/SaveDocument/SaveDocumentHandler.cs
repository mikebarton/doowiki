using doowiki.application.Common.Exceptions;
using doowiki.application.Common.Interfaces;
using doowiki.domain.Wiki;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Documents.Commands.SaveDocument
{
    internal class SaveDocumentHandler : IRequestHandler<SaveDocumentCommand, Guid>
    {
        private readonly IApplicationDbContext _applicationDbContext;
        private readonly IUser _user;
        private Guid _defaultSpace = new Guid("08dbf655-39e7-417c-859d-f59caaf8e9b8");

        public SaveDocumentHandler(IApplicationDbContext applicationDbContext, IUser user)
        {
            _applicationDbContext = applicationDbContext;
            _user = user;
        }

        public async Task<Guid> Handle(SaveDocumentCommand request, CancellationToken cancellationToken)
        {
            DocumentMetaData documentMetaData = null;
            var wikiUser = await _applicationDbContext.Users.FirstOrDefaultAsync(x => x.IdentityUserId == _user.Id);
            if (wikiUser == null)
                throw new AuthenticationException("Cannot Save Document without authenticated user", _user);
            
            if(request.DocumentId != Guid.Empty)
            {
                documentMetaData = await _applicationDbContext.Documents.Include(x => x.Content).SingleAsync(x => x.DocumentId == request.DocumentId);                
                if(documentMetaData.Content == null)
                {
                    documentMetaData.Content = new DocumentContent() { DocumentId = documentMetaData.DocumentId };
                }
            }
            else
            {
                documentMetaData = new DocumentMetaData();                
                if (documentMetaData.Content == null)
                {
                    documentMetaData.Content = new DocumentContent();
                }
                _applicationDbContext.Documents.Add(documentMetaData);
            }

            documentMetaData.SpaceId = request.SpaceId == Guid.Empty ? _defaultSpace : request.SpaceId;            
            documentMetaData.UpdatedOn = DateTimeOffset.UtcNow;
            documentMetaData.Author = wikiUser;
            documentMetaData.Name = request.Name;
            documentMetaData.Content.DocumentMarkup = request.Content;

            if(request.ParentId != null && request.ParentId != Guid.Empty)
            {
                documentMetaData.Parent = await _applicationDbContext.Documents.FirstAsync(x=>x.DocumentId == request.ParentId);
            }
            
            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return documentMetaData.DocumentId;
        }
    }
}
