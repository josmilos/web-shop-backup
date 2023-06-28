import Product from "./Product";

export class Order {
  constructor(
    OrderId = 0,
    Comment = "",
    Address = "",
    OrderDate = null,
    UserBuyerId = 0,
    TotalAmount = 0,
    SellerCount = 0,
    Status = "",
    DeliveryTime = "",
    Products = [],
    
  ) {
    this.orderId = OrderId;
    this.comment = Comment;
    this.address = Address;
    this.orderDate = OrderDate;
    this.userBuyerId = UserBuyerId;
    this.totalAmount = TotalAmount;
    this.sellerCount = SellerCount;
    this.status = Status;
    this.deliveryTime = DeliveryTime;
    this.products = Products;
  }
}
export default Order;
