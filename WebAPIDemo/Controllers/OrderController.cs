using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using WebAPIDemoDataAcess.EntityModels;
using Microsoft.Extensions.Logging;
using WebAPIDemoDataAcess.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPIDemo.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
       private readonly OrderRepository _or = new OrderRepository();
       private readonly ILogger<OrderController> _logger;

        public OrderController(ILogger<OrderController> logger)
        {
            _logger = logger;
        }

        // GET: api/<OrderController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<OrderController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<OrderController>
        [HttpPost]
        public Order Place(Order o)
        {
            //change from viewOrder to Order
            //call the repo to insert the order


            //try
            //{
            //    _or.Place(o);
            //}
            //catch (ArgumentNullException ex)
            //{
            //    _logger.LogError(ex, "We caught this exception trying to place an order");
            //}
            return o;
        }

        // PUT api/<OrderController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<OrderController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
