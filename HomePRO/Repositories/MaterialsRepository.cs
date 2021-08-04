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
    public class MaterialsRepository : BaseRepository, IMaterialsRepository
    {

        public MaterialsRepository(IConfiguration configuration) : base(configuration) { }

        public void AddMaterial(Materials materials)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"Insert into Materials (UserId, Name, Qty, Price)
                                    OUTPUT INSERTED.ID
                                    Values (@userId, @name, @qty, @price);";
                    DbUtils.AddParameter(cmd, "@userId", materials.UserId);
                    DbUtils.AddParameter(cmd, "@name", materials.Name);
                    DbUtils.AddParameter(cmd, "@qty", materials.Qty);
                    DbUtils.AddParameter(cmd, "@price", materials.Price);

                    materials.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public Materials GetMaterialsById(int Id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select Id, UserId, Price, Qty, Name
                                       From Materials
                                        where Id = @id";
                    DbUtils.AddParameter(cmd, "@id", Id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    Materials materials = null;
                    if (reader.Read())
                    {
                        materials = new Materials()
                        {
                            Id = Id,
                            Price = reader.GetFloat(reader.GetOrdinal("Price")),
                            UserId = DbUtils.GetString(reader, "UserId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Qty = DbUtils.GetInt(reader, "Qty"),
                        };
                    }
                    reader.Close();
                    return materials;
                }
            }
        }
        public List<Materials> GetMaterialsByUserId(string id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select m.Id, m.UserId, m.Price, m.Qty, m.Name
                                       From Materials as m
                                        left join [User] as u on m.UserId = u.Id
                                        where u.firebaseid = @userId";
                    DbUtils.AddParameter(cmd, "@userId", id);
                    SqlDataReader reader = cmd.ExecuteReader();
                    List<Materials> MaterialsList = new List<Materials>() { };
                    while (reader.Read())
                    {
                        MaterialsList.Add(new Materials()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Price = reader.GetFloat(reader.GetOrdinal("Price")),
                            UserId = DbUtils.GetString(reader, "userId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Qty = DbUtils.GetInt(reader, "Qty"),
                        });
                    }
                    reader.Close();
                    return MaterialsList;
                }
            }
        }
        public void AddMaterialsToProject(int projectId, Materials materials)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Insert into Materials (UserId, Name, Qty, Price)
                                    OUTPUT INSERTED.ID
                                    Values (@userId, @name, @qty, @price);";
                    DbUtils.AddParameter(cmd, "@userId", materials.UserId);
                    DbUtils.AddParameter(cmd, "@name", materials.Name);
                    DbUtils.AddParameter(cmd, "@qty", materials.Qty);
                    DbUtils.AddParameter(cmd, "@price", materials.Price);
                    materials.Id = (int)cmd.ExecuteScalar();
                    cmd.CommandText = @"Insert into ProjectMaterials (projectid, materialId)
                                        output inserted.id
                                        values (@projectId, @materialsId)";
                    DbUtils.AddParameter(cmd, "@projectId", projectId);
                    DbUtils.AddParameter(cmd, "@materialsId", materials.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void EditMaterials(Materials materials)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"Update Materials
                                        set UserId = @userId, Name = @name, Qty = @qty, Price = @price
                                        where id = @id";
                    DbUtils.AddParameter(cmd, "@userId", materials.UserId);
                    DbUtils.AddParameter(cmd, "@name", materials.Name);
                    DbUtils.AddParameter(cmd, "@qty", materials.Qty);
                    DbUtils.AddParameter(cmd, "@price", materials.Price);
                    DbUtils.AddParameter(cmd, "@id", materials.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeleteMaterialsById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"Delete From Materials
                                        where id = @id;";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                    
                }
            }
        }
        
    }
}
