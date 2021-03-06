using HomePRO.Models;
using System.Collections.Generic;

namespace HomePRO.Repositories
{
    public interface IMaterialsRepository
    {
        void AddMaterialsToProject(int projectId, Materials materials);
        void AddMaterial(Materials materials);
        void DeleteMaterialsById(int id);
        void EditMaterials(Materials materials);
        Materials GetMaterialsById(int Id);
        List<Materials> GetMaterialsByUserId(string id);
    }
}