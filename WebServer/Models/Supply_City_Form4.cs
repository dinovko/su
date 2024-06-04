using Microsoft.EntityFrameworkCore;

namespace WebServer.Models
{
    public class Supply_City_Form4 : Base
    {
        public Guid FormId { get; set; }
        public virtual Report_Form Form { get; set; }
        public int RefStreetId { get; set; }
        public virtual Ref_Street RefStreet { get; set; }
        public int RefBuildingId { get; set; }
        public virtual Ref_Building RefBuilding { get; set; }
        /// <summary>
        /// Количество зданий и сооружений, подлежащих к установке общедомовых приборов учета (единиц)
        /// </summary>
        [Comment("Количество зданий и сооружений, подлежащих к установке общедомовых приборов учета (единиц)")]
        public int CoverageHouseholdNeedNumberBuildings { get; set; } = 0;

        /// <summary>
        /// Количество зданий и сооружений с установленными общедомовыми приборами учета (единиц)
        /// </summary>
        [Comment("Количество зданий и сооружений с установленными общедомовыми приборами учета (единиц)")]
        public int CoverageHouseholdInstalledBuildings { get; set; } = 0;

        /// <summary>
        /// Количество установленных общедомовых приборов учета (единиц)
        /// </summary>
        [Comment("Количество установленных общедомовых приборов учета (единиц)")]
        public int CoverageHouseholdInstalledCount { get; set; } = 0;

        /// <summary>
        /// в том числе с дистанционной передачей данных в АСУЭ обслуживающего предприятия (единиц)
        /// </summary>
        [Comment("в том числе с дистанционной передачей данных в АСУЭ обслуживающего предприятия (единиц)")]
        public int CoverageHouseholdRemoteData { get; set; } = 0;

    }
}
