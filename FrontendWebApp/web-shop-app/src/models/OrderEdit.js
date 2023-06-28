export class OrderEdit{
    constructor(
        OrderId = 0,
        Status = "",
    )
    {
        this.orderId = OrderId;
        this.status = Status;
    }
}

export default OrderEdit;