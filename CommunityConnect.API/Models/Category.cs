// CommunityConnect.API/Models/Category.cs
namespace CommunityConnect.API.Models;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    
    // Navigation properties
    public ICollection<ResourceCategory> Resources { get; set; } = new List<ResourceCategory>();
}