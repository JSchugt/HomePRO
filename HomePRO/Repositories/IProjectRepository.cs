using HomePRO.Models;
using System.Collections.Generic;

namespace HomePRO.Repositories
{
    public interface IProjectRepository
    {
        public void Add(Project project);
        public Project GetProjectById(int id);
        public List<Project> GetProjectsByUserId(string id);

        public void DeleteProjectById(int id);

        public void EditPorject(Project project);

        public List<Project> GetAllProjects();
    }
}