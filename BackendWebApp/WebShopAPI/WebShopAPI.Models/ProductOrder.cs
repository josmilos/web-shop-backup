namespace WebShopAPI.Models
{
    public class ProductOrder
    {
        public int ProductOrderId { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int ProductQuantity { get; set; }
        
        public Order Order { get; set; }

    }
}
