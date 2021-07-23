using HomePRO.Models;
using System.Collections.Generic;

namespace HomePRO.Repositories
{
    public interface IProjectRepository
    {
        void Add(Project project);
        Project GetProjectById(int id);
        List<Project> GetProjectsByUserId(int id);
    }
}