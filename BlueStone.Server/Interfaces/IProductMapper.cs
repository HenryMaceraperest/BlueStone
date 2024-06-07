using BlueStone.Server.Models;

namespace BlueStone.Server.Interfaces;

public interface IProductMapper
{
	public Product Map(AddProductDTO productToAdd);
}
