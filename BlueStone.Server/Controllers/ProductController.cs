using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using BlueStone.Server.Data;
using BlueStone.Server.Interfaces;
using BlueStone.Server.Mappers;
using BlueStone.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Identity.Web.Resource;

namespace BlueStone.Server.Controllers;


[Route("api/[controller]")]
[ApiController]
public class ProductController : Controller//, IProductController
{
	//private readonly BlueStoneDbContext _dbContext;
	//public ProductController(BlueStoneDbContext dbContext)
	//{
	//	this._dbContext = dbContext;
	//}

	[RequiredScope("product-stock-order-readwrite-access")]
	[HttpGet("all")]
	[Authorize]
	public async Task<ActionResult<List<Product>>> GetAllProducts()
	{
		return new List<Product>
		{
			new Product
			{
				Id = 1,
				ImageUrl = "https://test.com/image/1",
				Name = "TestName",
				Code = "TestCode",
				Barcode = "00TestBarcode00",
				Model = "TestModel",
				Stock = 2,
				AverageCost = 3.45m,
				RSP = 3.5m,
				LastUpdated = DateTime.Now
			}
		};
	}

	//[HttpGet("{id}")]
	//public async Task<ActionResult<Product>> GetProductById(int id)
	//{
	//	var foundProduct = await _dbContext.Products.FindAsync(id);

	//	if (foundProduct != null)
	//	{
	//		return Ok(foundProduct);
	//	}
	//	return NotFound();
	//}

	//[HttpPost("Add")]
	//[ValidateAntiForgeryToken]
	//public async Task<ActionResult> AddProduct(AddProductDTO request)
	//{
	//	var productMapper = new ProductMapper();
	//	var domainModelProduct = new Product();
	//	try
	//	{
	//		domainModelProduct = productMapper.Map(request);

	//	}
	//	catch (Exception ex)
	//	{
	//		Console.Write(ex.ToString());
	//	}
	//	_dbContext.Products.Add(domainModelProduct);
	//	await _dbContext.SaveChangesAsync();
	//	return Ok(domainModelProduct);
	//}

	//[HttpPatch]
	//[ValidateAntiForgeryToken]
	//public async Task<ActionResult> UpdateProduct(Product product)
	//{
	//	try
	//	{
	//		_dbContext.Entry(product).State = EntityState.Modified;
	//		await _dbContext.SaveChangesAsync();
	//	}
	//	catch (Exception ex)
	//	{
	//		Console.Write(ex.ToString());
	//	}
	//	return Ok(product);
	//}

	//[HttpPost("Archive/{id}")]
	//[ValidateAntiForgeryToken]
	//public async Task<ActionResult> ArchiveProduct(int id)
	//{
	//	try
	//	{
	//		var product = await _dbContext.Products.FindAsync(id);
	//		if (product != null)
	//		{
	//			product.IsArchived = true;
	//			_dbContext.Entry(product).State = EntityState.Modified;
	//			await _dbContext.SaveChangesAsync();
	//			return Ok();
	//		}
	//	}
	//	catch (Exception ex)
	//	{
	//		Console.Write(ex.ToString());
	//	}
	//	return NotFound();
	//}
}
