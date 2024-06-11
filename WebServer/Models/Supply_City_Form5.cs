using Microsoft.EntityFrameworkCore;

namespace WebServer.Models
{
    public class Supply_City_Form5 : Base
    {
        public Guid FormId { get; set; }
        public virtual Report_Form? Form { get; set; }
        public int RefStreetId { get; set; }
        public virtual Ref_Street? RefStreet { get; set; }
        public int RefBuildingId { get; set; }
        public virtual Ref_Building? RefBuilding { get; set; }
        /// <summary>
        /// Водозабор
        /// </summary>
        [Comment("Водозабор")]
        public bool ScadaWaterIntake { get; set; } = false;

        /// <summary>
        /// Водоподготовка (0 или 1)
        /// </summary>
        [Comment("Водоподготовка (0 или 1)")]
        public bool ScadaWaterTreatment { get; set; } = false;

        /// <summary>
        /// Насосные станции (0 или 1)
        /// </summary>
        [Comment("Насосные станции (0 или 1)")]
        public bool ScadaStations { get; set; } = false;

        /// <summary>
        /// Сети водоснабжения (0 или 1)
        /// </summary>
        [Comment("Сети водоснабжения (0 или 1)")]
        public bool ScadaSupplyNetworks { get; set; } = false;
    }
}
