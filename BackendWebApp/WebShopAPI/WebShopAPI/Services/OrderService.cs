using AutoMapper;
using Dapr.Client;
using Microsoft.EntityFrameworkCore;
using WebShopAPI.DataLayer.Infrastructure;
using WebShopAPI.DataLayer.Repository;
using WebShopAPI.DataLayer.Repository.IRepository;
using WebShopAPI.Dto;

using WebShopAPI.Interfaces;
using WebShopAPI.Models;
using WebShopAPI.Repository;

namespace WebShopAPI.Services
{
    public class OrderService : IOrderService
    {
        private readonly IMapper _mapper;
        private readonly IConfigurationSection _secretKey;
        private readonly IOrderRepository _orderDb;
        //private readonly IUserRepository _userDb;
        private readonly DaprClient _daprClient;
        private readonly IProductRepository _productDb;
        private readonly IProductOrderRepository _productOrderDb;

        public OrderService(IMapper mapper, IConfiguration config, IOrderRepository orderRepository, DaprClient daprClient, IProductRepository productRepository, IProductOrderRepository productOrderRepository)
        {
            _mapper = mapper;
            _secretKey = config.GetSection("SecretKey");
            _orderDb = orderRepository;
            //_userDb = userRepository;
            _daprClient = daprClient;
            _productDb = productRepository;
            _productOrderDb = productOrderRepository;
        }

        public Dictionary<string, string> AddOrder(OrderDto newOrder)
        {

            Dictionary<string, string> response = new Dictionary<string, string>();
            response["statusCode"] = "200";
            response["message"] = "";

            Order order = _mapper.Map<Order>(newOrder);
            List<ProductDto> products = newOrder.Products;
            List<Product> dbProducts = _productDb.GetAllProducts();

            foreach(ProductDto product in products)
            {
                Product prod = _productDb.GetProductById(product.ProductId);
                if(prod == null)
                {
                    response["statusCode"] = "400";
                    response["message"] = "Product " + product.Name + " does not exist in our database.";
                    return response;
                }
                else if(prod.Quantity < product.Quantity) 
                {
                    response["statusCode"] = "400";
                    response["message"] = "Product " + product.Name + " has only " + prod.Quantity + " available units.";
                    return response;
                }
            }

            foreach (ProductDto product in products)
            {
                ProductOrder productOrder = new ProductOrder() { OrderId = order.OrderId, ProductId = product.ProductId, ProductQuantity = product.Quantity, Order = order };
                _productOrderDb.AddProductOrder(productOrder);
                order.OrderProducts.Add(productOrder);
                Product dbProduct = _productDb.GetProductById(product.ProductId);
                dbProduct.Quantity = dbProduct.Quantity - product.Quantity;
                _productDb.UpdateProduct(dbProduct);
            }

            try
            {
                _orderDb.AddOrder(order);
            }
            catch (Exception ex)
            {
                return response;
            }
            


            return response;
        }

        public bool DeleteOrder(int id)
        {
            return _orderDb.DeleteOrder(id);

        }

        public OrderDto GetById(int id)
        {
            return _mapper.Map<OrderDto>(_orderDb.GetOrderById(id));

        }

        public List<OrderDto> GetOrders()
        {/*
            List<OrderDto> returnOrders = new List<OrderDto>();
            List<User> usersTemp = await _daprClient.InvokeMethodAsync<List<User>>(HttpMethod.Get, "userswebapi", "api/users/all");
            List<User> users = usersTemp.Where(u => u.UserType == "buyer").ToList();

            foreach (User user in users)
            {
                returnOrders.AddRange(GetBuyerOrders(user.UserId));
            }*/
            
            return _mapper.Map<List<OrderDto>>(_orderDb.GetAllOrders());
        }

        public List<OrderDto> GetSellerHistoryOrders(int id)
        {
            List<Order> orders = _orderDb.GetAllOrders();
            List<Order> myOrders = new List<Order>();
            List<Product> myProducts = _productDb.GetAllProducts().Where(p => p.SellerId == id).ToList();
            List<ProductOrder> myProductOrders = new List<ProductOrder>();

            
                foreach(Product product in myProducts)
                {
                    myProductOrders.AddRange(_productOrderDb.GetAllProductOrders().Where(po => po.ProductId == product.ProductId).ToList());
            }
            
            foreach (ProductOrder po in myProductOrders)
            {
                myOrders.AddRange(_orderDb.GetAllOrders().Where(o => o.OrderId == po.OrderId).ToList());
            }

            myOrders = myOrders.Distinct().ToList();

            List<OrderDto> returnOrders = new List<OrderDto>();

            foreach (Order o in myOrders)
            {
                OrderDto returnOrder = _mapper.Map<OrderDto>(o);

                foreach (ProductOrder po in myProductOrders)
                {
                    if(returnOrder.OrderId == po.OrderId)
                    {
                        Product tempProduct = _productDb.GetAllProducts().Where(p => p.ProductId == po.ProductId).FirstOrDefault();
                        tempProduct.Quantity = po.ProductQuantity;
                        ProductDto productDto = _mapper.Map<ProductDto>(tempProduct);
                        returnOrder.Products.Add(productDto);
                    }
                    
                }
                returnOrders.Add(returnOrder);

            }


            return returnOrders;
        }

        public List<OrderDto> GetSellerNewOrders(int id)
        {
            throw new NotImplementedException();
        }

        public List<OrderDto> GetBuyerOrders(int id)
        {
            List<Order> orders = _orderDb.GetAllOrders().Where(o => o.UserBuyerId == id).ToList();
            List<ProductOrder> productOrders = _productOrderDb.GetAllProductOrders();
            List<OrderDto> returnOrders = new List<OrderDto>();

            foreach(Order o in orders)
            {
                OrderDto returnOrder = _mapper.Map<OrderDto>(o);

                foreach (ProductOrder po in o.OrderProducts)
                {
                    Product tempProduct = _productDb.GetAllProducts().Where(p => p.ProductId == po.ProductId).FirstOrDefault();
                    tempProduct.Quantity = po.ProductQuantity;
                    ProductDto productDto = _mapper.Map<ProductDto>(tempProduct);
                    returnOrder.Products.Add(productDto);
                }
                returnOrders.Add(returnOrder);
                
            }
            

            return returnOrders;
        }
        public Dictionary<string, string> EditStatusOrder(int id, OrderEditDto newOrderData)
        {
            Dictionary<string, string> response = new Dictionary<string, string>();
            response["statusCode"] = "200";
            response["message"] = "";

            Order order = _orderDb.GetAllOrders().Where(o => o.OrderId == id).FirstOrDefault();
            
            if(order == null)
            {
                response["statusCode"] = "400";
                response["message"] = "This order does not exist";
                return response;
            }


            if (newOrderData == null)
            {
                response["statusCode"] = "500";
                response["message"] = "The server has encountered a situation it does not know how to handle.";
                return response;
            }
            if (newOrderData.Status != string.Empty && newOrderData.Status != null)
            {
                if(newOrderData.Status != "cancelled")
                {
                    response["statusCode"] = "400";
                    response["message"] = "There was an error with your request. Try again";
                }
                else
                {
                    order.Status = newOrderData.Status;
                }
                
            }

            if(order.Status == "cancelled")
            {
                List<ProductOrder> productsOrder = order.OrderProducts;
                foreach (ProductOrder productOrder in productsOrder) 
                {
                Product product = _productDb.GetProductById(productOrder.ProductId);
                    if (product != null) 
                    {
                        product.Quantity = product.Quantity + productOrder.ProductQuantity;

                    }
                }
            }

            _orderDb.UpdateOrder(order);
            return response;
        }

        public Dictionary<string, string> UpdateOrder(int id, OrderDto newOrderData)
        {
            Dictionary<string, string> response = new Dictionary<string, string>();
            response["statusCode"] = "200";
            response["message"] = "";

            Order order = _orderDb.GetOrderById(id);
            if(order == null) 
            {
                response["statusCode"] = "400";
                response["message"] = "Order with ID " + id + " does not exist!";
                return response;
            }

            order.Comment = newOrderData.Comment;
            order.Address = newOrderData.Address;

            return response;
        }
    }
}
