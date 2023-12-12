using doowiki.application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Documents.Queries.GetDocumentList
{
    public class GetDocumentListHandler : IRequestHandler<GetDocumentListRequest, DocumentMetaDto[]>
    {
        private readonly IApplicationDbContext _context;

        public GetDocumentListHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public Task<DocumentMetaDto[]> Handle(GetDocumentListRequest request, CancellationToken cancellationToken)
        {
            var docs = _context.Documents
                .Include(x => x.Author)
                .Where(x => x.SpaceId == request.SpaceId)
                .Select(x =>
                    new DocumentMetaDto
                    {
                        DocumentId = x.DocumentId,
                        CreatedOn = x.CreatedOn,
                        UpdatedOn = x.UpdatedOn,
                        AuthorName = x.Author.FullName,
                        Name = x.Name
                    })
                .ToArrayAsync();

            return docs;
        }
    }
}
