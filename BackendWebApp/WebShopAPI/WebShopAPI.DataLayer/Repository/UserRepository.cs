using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebShopAPI.DataLayer.Infrastructure;
using WebShopAPI.DataLayer.Repository.IRepository;
using WebShopAPI.Models;

namespace WebShopAPI.DataLayer.Repository
{
    public class UserRepository : IUserRepository
    {
        private UserDbContext _db;

        public UserRepository(UserDbContext db)
        {
            _db = db;
        }

        public User GetByEmail(string email)
        {
            return _db.Users.FirstOrDefault(x => x.Email == email);
        }

        public List<User> GetAll()
        {
            return _db.Users.ToList();
        }

        public User GetById(int id)
        {
            return _db.Users.FirstOrDefault(x => x.UserId == id);
        }

        public void Add(User user)
        {
            _db.Users.Add(user);
            _db.SaveChanges();
        }

        public void Update(User user)
        {
            var existingUser = _db.Users.FirstOrDefault(x => x.UserId == user.UserId);
            if (existingUser != null)
            {
                existingUser.FirstName = user.FirstName;
                existingUser.LastName = user.LastName;
                existingUser.Address = user.Address;
                existingUser.DateOfBirth = user.DateOfBirth;
                existingUser.Password = user.Password;
                existingUser.Image = user.Image;
                existingUser.Verification = user.Verification;
                _db.SaveChanges();
            }
        }

        public bool Delete(int id)
        {
            try
            {
                User user = _db.Users.Find(id);
                _db.Users.Remove(user);
                _db.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
