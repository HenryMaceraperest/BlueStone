using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using BlueStone.Server.Data;
using BlueStone.Server.Interfaces;
using BlueStone.Server.Mappers;
using BlueStone.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Identity.Web.Resource;
using System.Reflection;
using Serilog;

namespace BlueStone.Server.Controllers;


[Route("api/[controller]")]
[ApiController]
public class ProductController : Controller, IProductController
{
    private readonly BlueStoneDbContext _dbContext;
    private readonly ILogger<ProductController> _logger;
    public ProductController(ILogger<ProductController> _logger, BlueStoneDbContext dbContext)
    {
        this._logger = _logger;
        this._dbContext = dbContext;
    }

    // In the future can implement 501 - Not Implemented error handling, 502 - Bad Gateway, 503 - Service Unavailable, and 504 - Gateway Timed Out

    //[RequiredScope("product-stock-order-readwrite-access")]
    [HttpGet("All")]
	//[Authorize]
	public async Task<ActionResult<List<Product>>> GetAllProducts()
	{
        try
        {
            var products = await _dbContext.Products.Where(x => x.IsArchived != true).ToListAsync();
            return Ok(products);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return StatusCode(500, "Error retrieving data from the database.");
        }
	}

	[HttpGet("{id}")]
	public async Task<ActionResult<Product>> GetProductById(int id)
    {
        try
        {
            var foundProduct = await _dbContext.Products.FindAsync(id);
            if (foundProduct == null)
            {
                return NotFound($"A product with the ID {id} was not found.");
            }
            return Ok(foundProduct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return StatusCode(500, "Error retrieving data from the database.");
        }
    }

    [HttpPost("Add")]
    //[ValidateAntiForgeryToken]
    public async Task<ActionResult> AddProduct([FromBody] AddProductDTO request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var productMapper = new ProductMapper();
        var domainModelProduct = new Product();
        try
        {
            domainModelProduct = productMapper.Map(request);
            _dbContext.Products.Add(domainModelProduct);
            await _dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProductById), new { id = domainModelProduct.Id }, domainModelProduct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return StatusCode(500, "Error retrieving data from the database.");
        }
    }

    [HttpPatch("Update")]
    //[ValidateAntiForgeryToken]
    public async Task<ActionResult> UpdateProduct(Product product)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            _dbContext.Entry(product).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (!_dbContext.Products.Any(p => p.Id == product.Id))
            {
                _logger.LogError(ex.Message);
                return NotFound($"A product with the ID {product.Id} was not found!");
            }
            else
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, "Error updating data in the database.");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return StatusCode(500, "An unexpected error occurred.");
        }
    }

    [HttpPatch("Archive/{id}")]
    //[ValidateAntiForgeryToken]
    public async Task<ActionResult> ArchiveProduct(int id)
    {
        try
        {
            var product = await _dbContext.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound($"A product with the ID {product.Id} was not found!");
            }
            product.IsArchived = true;
            _dbContext.Entry(product).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return StatusCode(500, "An error occurred while archiving the product!");
        }
    }
}
