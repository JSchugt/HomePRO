using HomePRO.Models;

namespace HomePRO.Repositories
{
    public interface IProjectMaterialsRepository
    {
        public ProjectMaterials GetProjectMaterialsByProjectId(int id);
        public void DeleteProjectMaterialsByProjectId(int id);
        public void DeleteProjectMaterialsById(int id);
        public void AddMaterialsToProject(ProjectMaterials project);
        public void deleteProjectMaterialsByProjectIdAndMaterial(int projId, int matInt);
    }
}