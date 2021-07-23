using HomePRO.Models;
using HomePRO.Utils;
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

            throw new NotImplementedException();
        }
        public List<Project> GetProjectsByUserId(int id)
        {
            using (var conn = Connection) {
                conn.Open();
                using (var cmd = conn.CreateCommand()) {

                    cmd.CommandText = @"Select Id, Name, userId, Description
                                        From Project
                                        Where userId = @userId";
                    List<Project> projects = new List<Project>() { };
                    DbUtils.AddParameter(cmd, "@userId", id);
                    cmd.ExecuteReader();
              
                    return projects;
                }
            }
        }

    }
}
