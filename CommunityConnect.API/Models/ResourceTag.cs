// CommunityConnect.API/Models/ResourceTag.cs
namespace CommunityConnect.API.Models;

public class ResourceTag
{
    public int ResourceId { get; set; }
    public Resource Resource { get; set; } = null!;
    
    public int TagId { get; set; }
    public Tag Tag { get; set; } = null!;
}