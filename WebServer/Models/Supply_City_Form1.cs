namespace WebServer.Models
{
    public class Supply_City_Form1 : Base
    {
        public Guid FormId { get; set; }
        public virtual Report_Form? Form { get; set; }
        public int? RefStreetId { get; set; }
        public virtual Ref_Street? RefStreet { get; set; }
        public int? RefBuildingId { get; set; }
        public virtual Ref_Building? RefBuilding { get; set; }
        public decimal Volume { get; set; }
    }
}
