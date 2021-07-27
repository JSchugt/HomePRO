using HomePRO.Models;

namespace HomePRO.Repositories
{
    public interface IProjectMaterialsRepository
    {
        ProjectMaterials GetProjectMaterialsByProjectId(int id);
    }
}