using doowiki.application.Common.Interfaces;
using doowiki.application.Documents.Queries.GetDocumentList;
using doowiki.domain.Wiki;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Documents.Queries.GetDocumentTree
{
    public class GetDocumentTreeHandler : IRequestHandler<GetDocumentTreeRequest, DocumentTreeDto[]>
    {
        private readonly IApplicationDbContext _context;

        public GetDocumentTreeHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<DocumentTreeDto[]> Handle(GetDocumentTreeRequest request, CancellationToken cancellationToken)
        {
            var docMetaDatas = await _context.Documents
                .Include(x => x.Author)
                .Where(x => x.SpaceId == request.SpaceId)                
                .ToListAsync();

            var docs = docMetaDatas.Select(x => new DocumentTreeDto
            {
                AuthorName = x.Author.FullName,
                DocumentId = x.DocumentId,
                CreatedOn = x.CreatedOn,
                Name = x.Name,
                ParentId = x.Parent?.DocumentId,
                UpdatedOn = x.UpdatedOn
            });

            List<DocumentTreeDto> getTree(List<DocumentMetaData> list, Guid? parentId)
            {
                return list.Where(x => x.Parent?.DocumentId == parentId)
                .Select(x => new DocumentTreeDto
                {
                    AuthorName = x.Author.FullName,
                    DocumentId = x.DocumentId,
                    CreatedOn = x.CreatedOn,
                    Name = x.Name,
                    ParentId = x.Parent?.DocumentId,
                    UpdatedOn = x.UpdatedOn,
                    Children = getTree(list, x.Parent?.DocumentId)
                }).ToList();
            }

            return getTree(docMetaDatas, null).ToArray();
        }
    }
}
