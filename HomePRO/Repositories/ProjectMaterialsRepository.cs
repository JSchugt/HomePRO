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
    public class ProjectMaterialsRepository : BaseRepository, IProjectMaterialsRepository
    {
        public ProjectMaterialsRepository(IConfiguration configuration) : base(configuration) { }
        public void AddMaterialsToProject(ProjectMaterials project)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Insert into ProjectMaterials  (projectId, materialId)
                                        Output inserted.id  
                                        values (@projId, @matId);";
                    DbUtils.AddParameter(cmd, "@projId", project.Projectid);
                    DbUtils.AddParameter(cmd, "@matId", project.MaterialId);
                    project.Id = (int)cmd.ExecuteScalar();

                }
            }
        }

        public void DeleteProjectMaterialsByProjectId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Delete from ProjectMaterials
                                        where ProjectId = @projId";
                    DbUtils.AddParameter(cmd, "@projId", id);
                    cmd.ExecuteNonQuery();

                }

            }
        }
        public void deleteProjectMaterialsByProjectIdAndMaterial(int projId, int matInt)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Delete from ProjectMaterials
                                        where ProjectId = @projId and MaterialId = @matInt";
                    DbUtils.AddParameter(cmd, "@projId", projId);
                    DbUtils.AddParameter(cmd, "@matInt", matInt);
                    cmd.ExecuteNonQuery();

                }

            }

        }
        public void DeleteProjectMaterialsById(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Delete from ProjectMaterials
                                        where ProjectId = @projId";
                    DbUtils.AddParameter(cmd, "@projId", id);
                    cmd.ExecuteNonQuery();

                }

            }
        }
        public ProjectMaterials GetProjectMaterialsByProjectId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select pm.id as pmid, pm.MaterialId, pm.ProjectId, m.id as mid, m.name as mname, m.price as mprice, m.userid as muserid, m.qty as mqty
                                        from ProjectMaterials as pm
                                        left join Materials as m on pm.MaterialId = m.id 
                                        where pm.ProjectId = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    ProjectMaterials projectMaterials = null;
                    while (reader.Read())
                    {
                        if (projectMaterials == null)
                        {
                            projectMaterials = new ProjectMaterials()
                            {
                                Id = DbUtils.GetNullableInt(reader, "pmid"),
                                Projectid = id,
                                MaterialId = DbUtils.GetNullableInt(reader, "mid"),
                                Materials = new List<Materials>() { },
                            };
                        }
                        float price =(float) reader.GetDouble(reader.GetOrdinal("mprice"));
                        DateTime time = DateTime.Now;
                        projectMaterials.Materials.Add(new Materials()
                        {
                            Id = DbUtils.GetInt(reader, "mid"),
                            Name = DbUtils.GetString(reader, "mname"),
                            Price = price,
                            Qty = DbUtils.GetInt(reader, "mqty"),

                        }); ;


                    }
                    reader.Close();
                    return projectMaterials;
                }


            }

        }

    }
}
