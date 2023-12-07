using doowiki.application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Documents.Queries.GetDocument
{
    internal class GetDocumentHandler : IRequestHandler<GetDocumentRequest, DocumentDto?>
    {
        private IApplicationDbContext _applicationDbContext;
        public GetDocumentHandler(IApplicationDbContext dbContext)
        {
            _applicationDbContext = dbContext;            
        }

        public async Task<DocumentDto?> Handle(GetDocumentRequest request, CancellationToken cancellationToken)
        {
            var document = await _applicationDbContext.Documents
                .Include(x => x.Content)
                .Include(x=>x.Author)
                .FirstOrDefaultAsync(x => x.DocumentId == request.DocumentId);

            if (document == null)
                return null;

            var result = new DocumentDto
            {
                AuthorName = document.Author.FullName,
                CreatedOn = document.CreatedOn,
                Name = document.Name,
                UpdatedOn = document.UpdatedOn,
                DocumentId = document.DocumentId,
                Content = document.Content.DocumentMarkup
            };

            return result;
        }
    }
}
