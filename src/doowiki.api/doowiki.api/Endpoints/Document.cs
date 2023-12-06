using doowiki.api.Infrastructure;
using doowiki.application.Documents.Queries.GetDocument;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace doowiki.api.Endpoints
{
    public class Document : EndpointGroupBase
    {
        public override void Map(WebApplication app)
        {
            app.MapGroup(this)            
            //.MapGet(GetDocumentList, "List/{id}")
            .MapGet(GetDocument, "{id}");
        }

        public async Task<IResult> GetDocument(ISender sender, Guid id)
        {
            //if (id != query.DocumentId) return Results.BadRequest();
            await sender.Send(new GetDocumentRequest() { DocumentId = id });
            return Results.NoContent();
        }
    }
}
