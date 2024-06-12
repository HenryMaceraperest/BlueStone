using BlueStone.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BlueStone.Server.Data;

public class BlueStoneDbContext : DbContext
{
	public IConfiguration _config {  get; set; }
	
	public BlueStoneDbContext(IConfiguration config)
	{
		this._config = config;
	}

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
		optionsBuilder.UseSqlServer(_config.GetConnectionString("DatabaseConnection"));
    }

    public DbSet<Product> Products { get; set; }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
    {
        var entries = ChangeTracker
            .Entries()
            .Where(e => e.Entity is Product &&
                        (e.State == EntityState.Added || e.State == EntityState.Modified));

        foreach (var entityEntry in entries)
        {
            ((Product)entityEntry.Entity).LastUpdated = DateTime.Now;
        }

        return await base.SaveChangesAsync(cancellationToken);
    }
}
