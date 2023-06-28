using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebShopAPI.Models;

namespace WebShopAPI.DataLayer.Repository.IRepository
{
    public interface IProductOrderRepository
    {
        void AddProductOrder(ProductOrder productOrder);

        List<ProductOrder> GetAllProductOrders();
    }
}
