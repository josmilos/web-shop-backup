using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using WebShopAPI.Dto;
using WebShopAPI.Interfaces;
using WebShopAPI.Models;
using WebShopAPI.Services;

namespace WebShopAPI.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("all")]
        [Authorize(Roles = "admin")]
        public IActionResult GetAll()
        {
            return Ok(_orderService.GetOrders());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_orderService.GetById(id));
        }

        [HttpGet("new-seller/{id}")]
        [Authorize(Roles = "seller")]
        public IActionResult GetSellerPendingOrders(int id)
        {
            return Ok(_orderService.GetSellerNewOrders(id));
        }

        [HttpGet("history-seller/{id}")]
        [Authorize(Roles = "seller")]
        public IActionResult GetSellerDeliveredOrders(int id)
        {
            return Ok(_orderService.GetSellerHistoryOrders(id));
        }

        [HttpGet("history-buyer/{id}")]
        [Authorize(Roles = "buyer")]
        public IActionResult GetBuyerOrders(int id)
        {
            return Ok(_orderService.GetBuyerOrders(id));
        }

        [HttpPatch("{id}")]
        [Authorize(Roles = "buyer")]
        public IActionResult EditOrder(int id, [FromBody] OrderEditDto order)
        {
            Dictionary<string, string> response = _orderService.EditStatusOrder(id, order);
            if (response["statusCode"] != "200")
            {
                return BadRequest(new { statusCode = response["statusCode"], message = response["message"] });
            }
            else
            {
                return Ok(new { StatusCode = response["statusCode"], message = response["message"] });
            }
        
        }

        [HttpPost]
        [Authorize(Roles = "buyer")]
        public IActionResult CreateOrder([FromBody] OrderDto order)
        {
            Dictionary<string, string> response = _orderService.AddOrder(order);
            if (response["statusCode"] != "200")
            {
                return BadRequest(new { statusCode = response["statusCode"], message = response["message"] });
            }
            else
            {
                return Ok(new { StatusCode = response["statusCode"] });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult ChangeOrder(int id, [FromBody] OrderDto order)
        {
            return Ok(_orderService.UpdateOrder(id, order));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult DeleteOrder(int id)
        {
            if(_orderService.DeleteOrder(id))
            {
                return Ok(new { StatusCode = "200", message = "User with ID " + id + " successfully deleted." });
            }
            return BadRequest(new { statusCode = "400", message = "Order with ID " + id + " does not exist" });
        }
    }
}
