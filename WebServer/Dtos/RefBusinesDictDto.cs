namespace WebServer.Dtos
{
    public class RefBusinesDictDto
    {
        public Guid Id { get; set; }
        public Guid? ParentId { get; set; }
        public required string Code { get; set; }
        public required string Type { get; set; }
        public string? BusinessDecription { get; set; }
        public string NameRu { get; set; }
        public string? NameKk { get; set; }
        public bool IsDel { get; set; } = false;
        public string? Description { get; set; }
    }
}
