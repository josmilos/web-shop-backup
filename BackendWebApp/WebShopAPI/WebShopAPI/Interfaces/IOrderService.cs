using WebShopAPI.Dto;


namespace WebShopAPI.Interfaces
{
    public interface IOrderService
    {
        List<OrderDto> GetOrders();
        OrderDto GetById(int id);
        Dictionary<string, string> AddOrder(OrderDto newOrder);
        Dictionary<string, string> UpdateOrder(int id, OrderDto newOrderData);
        Dictionary<string, string> EditStatusOrder(int id, OrderEditDto newOrderData);
        bool DeleteOrder(int id);
        List<OrderDto> GetSellerNewOrders(int id);
        List<OrderDto> GetSellerHistoryOrders(int id);
        List<OrderDto> GetBuyerOrders(int id);
    }
}
