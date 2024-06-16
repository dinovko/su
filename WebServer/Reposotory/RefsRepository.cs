using WebServer.Emuns;
using WebServer.Interfaces;

namespace WebServer.Reposotory
{
    public class RefsRepository: IRefs
    {
        public RefsRepository()
        {
            
        }

        public Dictionary<int,string> GetDataTypes()
        {
            Dictionary<int,string> enums = new Dictionary<int,string>();
            foreach (var item in Enum.GetValues(typeof(Enums.DataTypeEnum)))
            {
                enums.Add((int)item, item.ToString());
            }
            return enums;
        }
    }
}
