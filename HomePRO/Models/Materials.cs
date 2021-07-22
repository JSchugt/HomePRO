using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomePRO.Models
{
    public class Materials
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Qty { get; set; }
    }
}
