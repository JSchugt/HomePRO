using HomePRO.Models;
using System.Collections.Generic;

namespace HomePRO.Repositories
{
    public interface IUserRepository
    {
        public void Add(User user);
        public User GetByFirebaseUserId(string firebaseUserId);
        public List<User> GetAllUserProfiles();
    }
}