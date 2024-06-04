using Microsoft.EntityFrameworkCore;

namespace WebServer.Models
{
    public class Waste_City_Form1 : Base
    {
        public Guid FormId { get; set; }
        public virtual required Report_Form Form { get; set; }
        public int RefStreetId { get; set; }
        public virtual required Ref_Street RefStreet { get; set; }
        public int RefBuildingId { get; set; }
        public virtual required Ref_Building RefBuilding { get; set; }

        [Comment("Объем воды в тысячах кубических метров.")]
        public double WaterVolume { get; set; }
    }
}
