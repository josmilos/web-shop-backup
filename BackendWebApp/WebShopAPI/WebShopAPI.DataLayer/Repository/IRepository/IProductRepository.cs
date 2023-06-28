using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebShopAPI.Models;

namespace WebShopAPI.DataLayer.Repository.IRepository
{
    public  interface IProductRepository
    {
        void AddProduct(Product product);
        bool DeleteProduct(int id);
        void UpdateProduct(Product product);
        Product GetProductById(int id);
        List<Product> GetAllProducts();
    }
}
