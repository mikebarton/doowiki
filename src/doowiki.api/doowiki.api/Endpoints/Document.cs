using doowiki.api.Infrastructure;
using doowiki.application.Documents.Queries.GetDocument;
using MediatR;

namespace doowiki.api.Endpoints
{
    public class Document : EndpointGroupBase
    {
        public override void Map(WebApplication app)
        {
            app.MapGroup(this)            
            //.MapGet(GetDocumentList, "List/{id}")
            .MapPost(GetDocument, "{id}");
        }

        public async Task<IResult> GetDocument(ISender sender, Guid id, GetDocumentRequest query)
        {
            if (id != query.DocumentId) return Results.BadRequest();
            await sender.Send(query);
            return Results.NoContent();
        }
    }
}
