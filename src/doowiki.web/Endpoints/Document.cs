using doowiki.api.Infrastructure;
using doowiki.application.Documents.Queries.GetDocument;
using doowiki.application.Documents.Commands.SaveDocument;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System;

namespace doowiki.api.Endpoints
{
    public class Document : EndpointGroupBase
    {
        public override void Map(WebApplication app)
        {
            app.MapGroup(this)            
                .MapPost(SaveDocument)
                .MapGet(GetDocument, "{id}");
        }

        public async Task<IResult> SaveDocument(ISender sender, SaveDocumentCommand command)
        {
            var id = await sender.Send(command);
            return Results.Ok();
        }

        public async Task<DocumentDto?> GetDocument(ISender sender, Guid id)
        {
            if (id == Guid.Empty) return null;
            var document = await sender.Send(new GetDocumentRequest() { DocumentId = id });
            return document;
        }
    }
}
