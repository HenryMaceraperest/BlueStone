using BlueStone.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BlueStone.Server.Data;

public class BlueStoneDbContext : DbContext
{
	public BlueStoneDbContext(DbContextOptions options) : base(options)
	{

	}

	public DbSet<Product> Products { get; set; }
}
