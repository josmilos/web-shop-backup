namespace WebShopAPI.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }
        public DateTime OrderDate { get; set; }
        //public User UserBuyer { get; set; }
        public int UserBuyerId { get; set; }
        public  string Status { get; set; }
        public DateTime DeliveryTime { get; set; }
        public double TotalAmount { get; set; }
        public List<ProductOrder> OrderProducts { get; set; }
    }
}
