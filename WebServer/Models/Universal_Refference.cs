using Microsoft.EntityFrameworkCore;

namespace WebServer.Models
{    
    public class Universal_Refference : Ref_Base
    {
        /// <summary>
        /// ключ на ИД (своего типа или стороннего)
        /// </summary>
        [Comment("ключ на ИД (своего типа или стороннего)")]
        public Guid ParentId { get; set; }
        /// <summary>
        /// Код*
        /// </summary>
        [Comment("Код*")]
        public required string Code { get; set; }
        /// <summary>
        /// Тип*
        /// </summary>
        [Comment("Тип*")]
        public required string Type { get; set; }
        /// <summary>
        /// Бизнес описание
        /// </summary>
        [Comment("Бизнес описание")]
        public string? BusinessDecription { get; set; }
    }
}
