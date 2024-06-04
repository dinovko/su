using Microsoft.EntityFrameworkCore;

namespace WebServer.Models
{
    public class Waste_City_Form3 : Base
    {
        public Guid FormId { get; set; }
        public virtual Report_Form Form { get; set; }
        public int RefStreetId { get; set; }
        public virtual Ref_Street RefStreet { get; set; }

        [Comment("Сети канализации (0 или 1)")]
        public bool HasSewerNetworks { get; set; } = false;

        [Comment("Канализационные насосные станции (0 или 1)")]
        public bool HasSewagePumpingStations { get; set; } = false;

        [Comment("Канализационно-очистные сооружения (0 или 1)")]
        public bool HasSewageTreatmentPlants { get; set; } = false;
    }
}
