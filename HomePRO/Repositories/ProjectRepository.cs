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
    public class ProjectRepository : BaseRepository, IProjectRepository
    {
        public ProjectRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(Project project)
        {
        }
        public Project GetProjectById(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"Select Id, Name, userId, Description
                                        From Projects
                                        Where Id = @Id";
                    DbUtils.AddParameter(cmd, "Id", id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    Project project = null;
                    if (reader.Read())
                    {
                        project = new Project()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description"),
                            UserId = id,
                        };
                    }
                    reader.Close();
                    return project;
                }
            }
        }
        public List<Project> GetProjectsByUserId(string id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"Select p.Id, p.Name, p.userId, p.Description, u.firebaseId, u.id uid
                                        From Projects p
                                        Left join [User] u on p.UserId = u.id
                                        where u.firebaseId = @userId";
                    List<Project> projects = new List<Project>() { };
                    DbUtils.AddParameter(cmd, "@userId", id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    Project project = null;
                    if (reader.Read())
                    {
                        project = new Project()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description"),
                            UserId = DbUtils.GetInt(reader, "uid"),
                        };
                        projects.Add(project);
                    }
                    reader.Close();
                    return projects;
                }
            }
        }

    }
}

