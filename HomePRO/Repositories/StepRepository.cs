using HomePRO.Models;
using HomePRO.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomePRO.Repositories
{
    public class StepRepository : BaseRepository, IStepRepository
    {
        public StepRepository(IConfiguration configuration) : base(configuration) { }
        public List<Step> StepsByProjectId(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select Id, TimeEstimate, ProjectId, Step, Description, IsComplete  
                                        From [Step]
                                        where ProjectId = @id 
                                        order by Step";
                    DbUtils.AddParameter(cmd, "@id", id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    List<Step> steps = new List<Step>() { };
                    while (reader.Read())
                    {
                        Step step = new Step()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            IsComplete = reader.GetBoolean(reader.GetOrdinal("IsComplete")),
                            Description = DbUtils.GetString(reader, "Description"),
                            StepNumber = DbUtils.GetInt(reader, "Step"),
                            ProjectId = DbUtils.GetInt(reader, "ProjectId"),
                            TimeEstimate = DbUtils.GetNullableDateTime(reader, "TimeEstimate"),
                        };
                        steps.Add(step);
                    }
                    reader.Close();
                    return steps;
                }
            }
        }
        public void EditStep(Step step)
        { }

        public void DeleteStepByStepId(int id) { }
        public void DeleteStepsByProjectId(int id) { }

        public void AddStep(Step step) { }
        public Step GetStepById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select Id, TimeEstimate, ProjectId, Step, Description, IsComplete  from step where ProjectId = @id order by Step";
                    DbUtils.AddParameter(cmd, "@id", id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    Step step = null;
                    while (reader.Read())
                    {
                        step = new Step()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            IsComplete = reader.GetBoolean(reader.GetOrdinal("IsComplete")),
                            Description = DbUtils.GetString(reader, "Description"),
                            StepNumber = DbUtils.GetInt(reader, "Step"),
                            ProjectId = DbUtils.GetInt(reader, "ProjectId"),
                            TimeEstimate = DbUtils.GetNullableDateTime(reader, "TimeEstimate"),
                        };
                    }
                    reader.Close();
                    return step;
                }

            }
        }
    }
}
