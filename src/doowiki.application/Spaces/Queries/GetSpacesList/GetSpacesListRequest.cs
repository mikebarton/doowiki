﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.application.Spaces.Queries.GetSpacesList
{
    public class GetSpacesListRequest : IRequest<SpacesListDto>
    {
    }
}
