using Microsoft.EntityFrameworkCore;

namespace WebServer.Dtos
{
    public class WasteCityForm2TableDto : FormKatoDto
    {
        public Guid? FormId { get; set; }
        public int? RefStreetId { get; set; }
        public int? RefBuildingId { get; set; }

        [Comment("Охваченные централизованным водоотведением (0-1)")]
        public bool IsConnectedToCentralizedWastewaterSystem { get; set; }

        [Comment("Наличие канализационно-очистных сооружений, (1-0)")]
        public bool HasSewageTreatmentFacilities { get; set; }

        [Comment("С механичес-кой очисткой (1-0)")]
        public bool HasMechanicalTreatment { get; set; }

        [Comment("С механической и биологической очист-кой (1-0)")]
        public bool HasMechanicalAndBiologicalTreatment { get; set; }

        [Comment("Численность населения, охваченного централизованным водоотведением, (человек)")]
        public int PopulationCoveredByCentralizedWastewater { get; set; } = 0;
    }
}
