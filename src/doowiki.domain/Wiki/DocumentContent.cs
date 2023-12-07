using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace doowiki.domain.Wiki
{
    public class DocumentContent
    {
        public Guid DocumentId { get; set; }
        public string DocumentMarkup { get; set; }
    }
}
