using WebShopAPI.Dto;

namespace WebShopAPI.Interfaces
{
    public interface IProductOrderService
    {
        List<ProductOrderDto> GetProductOrders();
        ProductOrderDto GetProductOrder(int id);
        ProductOrderDto AddProductOrder(ProductOrderDto newProductOrder);
        ProductOrderDto UpdateProductOrder(int id, ProductOrderDto newProductOrder);
        bool DeleteProductOrder(int id);
    }
}
