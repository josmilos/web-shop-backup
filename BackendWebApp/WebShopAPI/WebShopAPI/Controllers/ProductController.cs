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
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            return Ok(_productService.GetProducts());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_productService.GetById(id));
        }

        [HttpGet("seller-products/{id}")]
        public IActionResult GetSellerItems(int id)
        {
            return Ok(_productService.GetSellerProducts(id));
        }

        [HttpPost]
        [Authorize(Roles = "seller")]
        public IActionResult CreateProduct([FromBody] ProductDto product)
        {
            Dictionary<string, string> response = _productService.AddProduct(product);
            if (response["statusCode"] != "200") 
            {
                return BadRequest(new { statusCode = response["statusCode"], message = response["message"] });
            }
            else
            {
                return Ok(new { StatusCode = response["statusCode"], message = response["message"] });
            }
                
        }

        [HttpPatch("{id}")]
        [Authorize(Roles = "seller")]
        public IActionResult ChangeProduct(int id, [FromBody] ProductDto product)
        {
            Dictionary<string, string> response = _productService.UpdateProduct(id, product);
            if (response["statusCode"] != "200")
            {
                return BadRequest(new { statusCode = response["statusCode"], message = response["message"] });
            }
            else
            {
                return Ok(new { StatusCode = response["statusCode"], message = response["message"] });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "seller")]
        public IActionResult DeleteProduct(int id)
        {
            if (_productService.DeleteProduct(id))
            {
                return Ok(new { StatusCode = "200", message = "Product with ID " + id + " successfully deleted." });
            }
            return BadRequest(new { statusCode = "400", message = "Product with ID " + id + " does not exist" });

        }
    }
}
