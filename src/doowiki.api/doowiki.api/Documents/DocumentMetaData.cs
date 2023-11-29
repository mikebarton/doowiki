using doowiki.api.UserManagement;

namespace doowiki.api.Documents
{
    public class DocumentMetaData
    {
        public Guid DocumentMetaDataId { get; set; }
        public string? Slug { get; set; }
        public string Name { get; set; }
        public DateTimeOffset CreatedOn { get; set; }
        public DateTimeOffset UpdatedOn { get; set; }
        public WikiUser Author { get; set; }
    }
}
