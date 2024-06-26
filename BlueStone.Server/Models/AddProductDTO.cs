﻿namespace BlueStone.Server.Models;

public class AddProductDTO
{
	public string? ImageUrl { get; set; }
	public string? Name { get; set; }
	public string? Code { get; set; }
	public string? Barcode { get; set; }
	public string? Model { get; set; }
	public int? Stock { get; set; }
	public decimal? AverageCost { get; set; }
	public decimal? RSP { get; set; }
}
