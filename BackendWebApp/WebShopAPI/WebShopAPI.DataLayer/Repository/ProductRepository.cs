using Microsoft.EntityFrameworkCore;
using WebShopAPI.DataLayer.Infrastructure;
using WebShopAPI.DataLayer.Repository.IRepository;
using WebShopAPI.Models;

namespace WebShopAPI.Repository
{
    public class ProductRepository : IProductRepository
    {
        private WebShopDbContext _db;

        public ProductRepository(WebShopDbContext db)
        {
            _db = db;
        }

        public void AddProduct(Product product)
        {
            _db.Products.Add(product);
            _db.SaveChanges();
        }

        public bool DeleteProduct(int id)
        {
            try
            {
                Product product = _db.Products.Find(id);
                _db.Products.Remove(product);
                _db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public void UpdateProduct(Product product)
        {
            var existingProduct = _db.Products.FirstOrDefault(x => x.ProductId == product.ProductId);
            if (existingProduct != null)
            {
                existingProduct.Price = product.Price;
                existingProduct.Description = product.Description;
                existingProduct.Image = product.Image;
                existingProduct.Name = product.Name;
                existingProduct.Quantity = product.Quantity;

                _db.SaveChanges();
            }
        }

        public List<Product> GetAllProducts()
        {
            return _db.Products.ToList();
        }

        public Product GetProductById(int id)
        {
            return _db.Products.FirstOrDefault(x => x.ProductId == id);

        }
    }
}
