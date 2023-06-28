using WebShopAPI.Dto;

namespace WebShopAPI.Interfaces
{
    public interface IProductService
    {
        List<ProductDto> GetProducts();
        ProductDto GetById(int id);
        Dictionary<string, string> AddProduct(ProductDto newProduct);
        Dictionary<string, string> UpdateProduct(int id, ProductDto newProductData);
        bool DeleteProduct(int id);

        List<ProductDto> GetSellerProducts(int id);
    }
}
