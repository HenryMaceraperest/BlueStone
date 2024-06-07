using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Identity.Web;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authentication;


var builder = WebApplication.CreateBuilder(args);

// Add Azure Active Directory Authentication service
builder.Services.AddAuthentication(AzureADDefaults.BearerAuthenticationScheme)
	.AddAzureADBearer(options => builder.Configuration.Bind("AzureAd", options));

// Add Cors Service
string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
	options.AddPolicy(MyAllowSpecificOrigins, builder =>
	{
		builder.WithOrigins("*")
		.AllowAnyHeader()
		.AllowAnyMethod();
	});
});

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAntiforgery();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthentication();

app.UseAuthorization();
app.UseAntiforgery();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();