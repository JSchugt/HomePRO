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
                            TimeEstimate = DbUtils.GetNullableInt(reader, "TimeEstimate"),
                        };
                        steps.Add(step);
                    }
                    reader.Close();
                    return steps;
                }
            }
        }
        public void EditStep(Step step)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Update Step 
                                        set projectId = @projectid, description = @description, TimeEstimate = @time, step = @step, IsComplete = @isCompleted
                                        where id = @id";
                    DbUtils.AddParameter(cmd, "@projectid", step.ProjectId);
                    DbUtils.AddParameter(cmd, "@time", step.TimeEstimate);
                    DbUtils.AddParameter(cmd, "@step", step.StepNumber);
                    DbUtils.AddParameter(cmd, "@isCompleted", step.IsComplete);
                    DbUtils.AddParameter(cmd, "@description", step.Description);
                    DbUtils.AddParameter(cmd, "@id", step.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteStepByStepId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Delete from [Step] 
                                        Where id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();

                }

            }
        }

        public void DeleteStepsByProjectId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Delete from [Step] 
                                        Where projectid = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void AddStep(Step step)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Insert Into Step (Step, IsComplete, Description, ProjectId, TimeEstimate)
                                        OUTPUT INSERTED.ID
                                        Values (@step, @complete, @description, @projId, @time)";

                    DbUtils.AddParameter(cmd, "@step", step.StepNumber);
                    DbUtils.AddParameter(cmd, "@complete", step.IsComplete);
                    DbUtils.AddParameter(cmd, "@description", step.Description);
                    DbUtils.AddParameter(cmd, "@projId", step.ProjectId);
                    DbUtils.AddParameter(cmd, "@time", step.TimeEstimate);
                    step.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

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
                            TimeEstimate = DbUtils.GetNullableInt(reader, "TimeEstimate"),
                        };
                    }
                    reader.Close();
                    return step;
                }

            }
        }
    }
}
