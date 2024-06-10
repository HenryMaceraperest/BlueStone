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

	//[RequiredScope("product-stock-order-readwrite-access")]
	[HttpGet("all")]
	//[Authorize]
	public async Task<ActionResult<List<Product>>> GetAllProducts([FromQuery]SortQueryParameters parameters)
	{
		List<Product> listToReturn = new List<Product>
		{
			new Product
			{
				Id = 1,
				ImageUrl = "https://test.com/image/1",
				Name = "TestName1",
				Code = "TestCode1",
				Barcode = "11TestBarcode11",
				Model = "TestModel1",
				Stock = 5,
				AverageCost = 3.45m,
				RSP = 3.5m,
				LastUpdated = DateTime.Now
			},
            new Product
            {
                Id = 2,
                ImageUrl = "https://test.com/image/1",
                Name = "TestName2",
                Code = "TestCode2",
                Barcode = "22TestBarcode22",
                Model = "TestModel2",
                Stock = 5,
                AverageCost = 3.45m,
                RSP = 3.5m,
                LastUpdated = DateTime.Now
            },
            new Product
            {
                Id = 3,
                ImageUrl = "https://test.com/image/1",
                Name = "TestName3",
                Code = "TestCode3",
                Barcode = "33TestBarcode33",
                Model = "TestModel3",
                Stock = 5,
                AverageCost = 3.45m,
                RSP = 3.5m,
                LastUpdated = DateTime.Now
            },
             new Product
            {
                Id = 4,
                ImageUrl = "https://test.com/image/1",
                Name = "TestName4",
                Code = "TestCode4",
                Barcode = "44TestBarcode44",
                Model = "TestModel4",
                Stock = 5,
                AverageCost = 3.45m,
                RSP = 3.5m,
                LastUpdated = DateTime.Now
            }
        };

		if (parameters.Column != null && parameters.Sort != null && typeof(Product).GetProperty(parameters.Column) != null)
		{
			PropertyInfo parametersColumn = typeof(Product).GetProperty(parameters.Column);
			if (parameters.Sort == "desc")
			{
                listToReturn = listToReturn.OrderByDescending(x => parametersColumn.GetValue(x, null)).ToList();
            }
            else
			{
                listToReturn = listToReturn.OrderBy(x => parametersColumn.GetValue(x, null)).ToList();
            }
        }
		return listToReturn;
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
