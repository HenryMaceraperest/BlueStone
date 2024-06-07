using BlueStone.Server.Models;
using Microsoft.AspNetCore.Mvc;


namespace BlueStone.Server.Interfaces;

public interface IProductController
{
	public Task<ActionResult<List<Product>>> GetAllProducts();
	public Task<ActionResult<Product>> GetProductById(int id);
	public Task<ActionResult> AddProduct(AddProductDTO request);
	public Task<ActionResult> UpdateProduct(Product product);
	public Task<ActionResult> ArchiveProduct(int id);
}
