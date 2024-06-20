using Microsoft.EntityFrameworkCore;
using WebServer.Models;

namespace WebServer.Dtos
{
    public class ApprovedFormItemColumnDto
    {
        public Guid Id { get; set; }
        public Guid ApprovedFormItemId { get; set; }
        public int DataType { get; set; }
        public string ThRu { get; set; } = "";        
        public string ThKk { get; set; } = "";        
        public int DisplayOrder { get; set; } = 1;
    }
}
