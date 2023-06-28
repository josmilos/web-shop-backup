using WebShopAPI.Models;

namespace WebShopAPI.Dto
{
    public class OrderDto
    {
        public int OrderId { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }

        public DateTime OrderDate { get; set; }
        public int UserBuyerId { get; set; }
        public double TotalAmount { get; set; }
        public double SellerCount { get; set; }
        public string Status { get; set; }
        public DateTime DeliveryTime { get; set; }
        public List<ProductDto> Products { get; set; } = new List<ProductDto>();
    }
}
