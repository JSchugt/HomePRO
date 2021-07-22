using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomePRO.Models
{
    public class Step
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public DateTime TimeEstimate { get; set; }
        public string Description { get; set; }
        public int StepNumber { get; set; }
        public Boolean IsComplete { get; set; }
    }
}
