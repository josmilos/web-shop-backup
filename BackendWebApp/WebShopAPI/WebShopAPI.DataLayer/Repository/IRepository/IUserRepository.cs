using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebShopAPI.Dto;
using WebShopAPI.Models;

namespace WebShopAPI.DataLayer.Repository.IRepository
{
    public interface IUserRepository
    {
        User GetByEmail(string email);
        List<User> GetAll();
        User GetById(int id);
        void Add(User user);
        void Update(User user);
        bool Delete(int id);
    }
}
