using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.domain.Wiki
{
    public class Space
    {
        public Guid SpaceId { get; set; }
        public string Name { get; set; }
        public List<DocumentMetaData> Documents { get; set; }
    }
}
