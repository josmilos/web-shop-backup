using Microsoft.EntityFrameworkCore;
using WebShopAPI.DataLayer.Infrastructure;
using WebShopAPI.DataLayer.Repository.IRepository;
using WebShopAPI.Models;

namespace WebShopAPI.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private WebShopDbContext _db;

        public OrderRepository(WebShopDbContext db)
        {
            _db = db;
        }
        public void AddOrder(Order order)
        {
            _db.Orders.Add(order);
            //_db.Entry(order).State = EntityState.Added;
            _db.SaveChanges();
        }

        public bool DeleteOrder(int id)
        {
            try
            {
                Order order = _db.Orders.Find(id);
                _db.Orders.Remove(order);
                _db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<Order> GetAllOrders()
        {
            return _db.Orders.Include(o => o.OrderProducts).ToList();
        }

        public Order GetOrderById(int id)
        {
            return _db.Orders.Find(id);
        }

        public void UpdateOrder(Order order)
        {
            var existingOrder = _db.Orders.FirstOrDefault(x => x.OrderId == order.OrderId);
            if (existingOrder != null)
            {
                existingOrder.Comment = order.Comment;
                existingOrder.Address = order.Address;
                existingOrder.Status = order.Status;
                existingOrder.TotalAmount = order.TotalAmount;
                _db.SaveChanges();
            }
        }
    }
}
