using HomePRO.Models;
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

        public ProjectMaterials GetProjectMaterialsByProjectId(int id)
        {
            throw new NotImplementedException();

        }
    }
}
