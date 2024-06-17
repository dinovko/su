using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebServer.Models
{
    public class ApprovedFormItemColumn
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid Id { get; set; }
        public Guid ApprovedFormItemId { get; set; }
        public ApprovedFormItem? ApprovedFormItem { get; set; }

        [Comment("Тип хранимых данных: Label(Просто отображение), IntegerType, DecimalType, StringType, BooleanType, DateType, CalcType")]
        public int DataType { get; set; }

        [Comment("Заголовок столбца на ру")]
        public string ThRu { get; set; } = "";
        [Comment("Заголовок столбца на Qaz")]
        public string ThKk { get; set; } = "";

        [Comment("Порядок отображения")]
        public int DisplayOrder { get; set; } = 1;
    }
}
