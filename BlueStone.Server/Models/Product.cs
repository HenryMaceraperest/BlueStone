using System.ComponentModel.DataAnnotations.Schema;

namespace BlueStone.Server.Models;

public class Product
{
	public int? Id { get; set; }
	public string? ImageUrl { get; set; }
	public string? Name { get; set; }
	public string? Code { get; set; }
	public string? Barcode { get; set; }
	public string? Model { get; set; }
	public int? Stock { get; set; }
    [Column(TypeName = "decimal(18,2)")]
    public decimal? AverageCost { get; set; }
    [Column(TypeName = "decimal(18,2)")]
    public decimal? RSP { get; set; }
	public bool? IsArchived { get; set; }
	public DateTime? LastUpdated { get; set; }
}
