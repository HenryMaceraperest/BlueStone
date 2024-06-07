using BlueStone.Server.Interfaces;
using BlueStone.Server.Models;

namespace BlueStone.Server.Mappers;

public class ProductMapper : IProductMapper
{
	public Product Map(AddProductDTO productToAdd)
	{
		return new Product
		{
			Name = productToAdd.Name,
			ImageUrl = productToAdd.ImageUrl,
			Code = productToAdd.Code,
			Barcode = productToAdd.Barcode,
			Model = productToAdd.Model,
			Stock = productToAdd.Stock,
			AverageCost = productToAdd.AverageCost,
			RSP = productToAdd.RSP
		};
	}
}
