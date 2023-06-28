using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebShopAPI.Models;

namespace WebShopAPI.DataLayer.Repository.IRepository
{
    public interface IOrderRepository
    {
        void AddOrder(Order order);
        bool DeleteOrder(int id);
        void UpdateOrder(Order order);
        Order GetOrderById(int id);
        List<Order> GetAllOrders();
    }
}
