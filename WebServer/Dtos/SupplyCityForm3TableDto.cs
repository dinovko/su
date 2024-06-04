using Microsoft.EntityFrameworkCore;

namespace WebServer.Dtos
{
    public class SupplyCityForm3TableDto : FormKatoDto
    {
        public Guid FormId { get; set; }
        public int? RefStreetId { get; set; }
        public int? RefBuildingId { get; set; }
        [Comment("всего с нарастающим (единиц)")]
        public int CoverageMetersTotalCumulative { get; set; } = 0;
        [Comment("в том числе с дистанционной передачей данных в АСУЭ обслуживающего предприятия (единиц)")]
        public int CoverageMetersRemoteData { get; set; } = 0;
    }
}
