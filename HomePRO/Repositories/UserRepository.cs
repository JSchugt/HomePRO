using HomePRO.Models;
using HomePRO.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomePRO.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(User user)
        {
            Console.WriteLine(user.Name, "user name registrations");
            using (var conn = Connection) {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Insert into [User] (name, firebaseid, email)
                                        Output Inserted.Id
                                        values (@name, @fbid, @email)";

                    DbUtils.AddParameter(cmd, "@name", user.Name);
                    DbUtils.AddParameter(cmd, "@fbid", user.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@email", user.Email);
                    user.Id = (int)cmd.ExecuteScalar();
                }
            
            }
        }

        public List<User> GetAllUserProfiles()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name, Email, FirebaseId
                          FROM [User]";


                    List<User> Users = new List<User>() { };
                    User User = null;
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        User = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                        };
                        Users.Add(User);
                    }
                    reader.Close();

                    return Users;
                }
            }

        }

        public User GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name, Email, FirebaseId
                          FROM [User]
                         WHERE FirebaseId = @FirebaseId";

                    DbUtils.AddParameter(cmd, "@FirebaseId", firebaseUserId);

                    User User = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        User = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                        };
                    }
                    reader.Close();

                    return User;
                }
            }
        }
    }
}
