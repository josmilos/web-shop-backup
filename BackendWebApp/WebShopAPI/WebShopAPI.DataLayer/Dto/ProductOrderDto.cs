using WebShopAPI.Models;

namespace WebShopAPI.Dto
{
    public class ProductOrderDto
    {
        public int ProductOrderId { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int ProductQuantity { get; set; }
        
    }
}
