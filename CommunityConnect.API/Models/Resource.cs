// CommunityConnect.API/Models/Resource.cs
namespace CommunityConnect.API.Models;

public class Resource
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ContactPhone { get; set; } = string.Empty;
    public string? Website { get; set; }
    public string? Address { get; set; }
    public string Country { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    
    // Navigation properties
    public ICollection<ResourceCategory> Categories { get; set; } = new List<ResourceCategory>();
    public ICollection<ResourceTag> Tags { get; set; } = new List<ResourceTag>();
}