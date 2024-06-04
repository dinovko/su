namespace WebServer.Models
{
    public class Ref_Kato : Ref_Base
    {
        public int ParentId { get; set; }

        /// <summary>
        /// код
        /// </summary>
        public long Code { get; set; }
        /// <summary>
        /// Широта
        /// </summary>
        public decimal? Latitude { get; set; }

        /// <summary>
        /// Долгота
        /// </summary>
        public decimal? Longitude { get; set; }

        /// <summary>
        /// Данные заполненные пользователем
        /// </summary>
        public Guid? UserId { get; set; }
        /// <summary>
        /// Возможность создания отчета для данного н.п.
        /// </summary>
        public bool IsReportable { get; set; } = false;

    }
}
