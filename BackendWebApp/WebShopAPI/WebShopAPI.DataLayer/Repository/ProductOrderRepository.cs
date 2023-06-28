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
    public class ProductOrderRepository : IProductOrderRepository
    {
        private WebShopDbContext _db;

        public ProductOrderRepository(WebShopDbContext db)
        {
            _db = db;
        }
        public void AddProductOrder(ProductOrder productOrder)
        {
            _db.ProductOrders.Add(productOrder);
            _db.SaveChanges();
        }

        public List<ProductOrder> GetAllProductOrders()
        {
            return _db.ProductOrders.ToList();
        }
    }
}
