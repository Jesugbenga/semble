// CommunityConnect.API/Models/ResourceCategory.cs
namespace CommunityConnect.API.Models;

public class ResourceCategory
{
    public int ResourceId { get; set; }
    public Resource Resource { get; set; } = null!;
    
    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;
}