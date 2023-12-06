﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Documents.Commands.SaveDocument
{
    public class SaveDocumentCommand : IRequest<Guid>
    {
        public Guid DocumentId { get; set; }
        public Guid SpaceId { get; set; }
        public Guid? ParentId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
    }
}
