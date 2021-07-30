using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomePRO.Models
{
    public class ProjectMaterials
    {
        public int? Id { get; set; }
        public int? Projectid { get; set; }
        public int? MaterialId { get; set; }

        public List<Materials>? Materials { get; set; }
    }
}
