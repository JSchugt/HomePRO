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
        public void EditPorject(Project project)
        {
            using (var conn = Connection) {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Update Projects 
                                        set name = @name, description = @description
                                        where id = @id";
                    DbUtils.AddParameter(cmd, "@name", project.Name);
                    DbUtils.AddParameter(cmd, "@description", project.Description);
                    DbUtils.AddParameter(cmd, "@id", project.Id);
                    cmd.ExecuteNonQuery();
                }
            }

        }
        public void Add(Project project)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Insert into Projects (Name, Description, UserId)
                                        OUTPUT INSERTED.ID
                                        VALUES(@Name, @Description, @UserId);";
                    DbUtils.AddParameter(cmd, "@Name", project.Name);
                    DbUtils.AddParameter(cmd, "@Description", project.Description);
                    DbUtils.AddParameter(cmd, "@UserId", project.UserId);
                    project.Id = (int)cmd.ExecuteScalar();
                }
            }
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
                            UserId = DbUtils.GetString(reader, "userId"),
                        };
                    }
                    reader.Close();
                    return project;
                }
            }
        }
        public void DeleteProjectById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Projects 
                                        where id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
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

                    cmd.CommandText = @"Select p.Id as pid, p.Name, p.userId, p.Description, u.firebaseId as fbid, u.id uid
                                        From Projects p
                                        Left join [User] u on p.userid = u.firebaseid
                                        where u.firebaseId = @userId";
                    List<Project> projects = new List<Project>() { };
                    DbUtils.AddParameter(cmd, "@userId", "qCCBmyvDWKcJ23mPFaKALLrpW0r2");
                    SqlDataReader reader = cmd.ExecuteReader();
                    Project project = null;
                    while (reader.Read())
                    {
                        project = new Project()
                        {
                            Id = DbUtils.GetInt(reader, "pid"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description"),
                            UserId = DbUtils.GetString(reader, "fbid"),
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

