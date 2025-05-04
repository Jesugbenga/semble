// CommunityConnect.API/Models/InterviewQuestion.cs
namespace CommunityConnect.API.Models;

public class InterviewQuestion
{
    public int Id { get; set; }
    public int JobCoachSessionId { get; set; }
    public JobCoachSession Session { get; set; } = null!;
    public string Question { get; set; } = string.Empty;
    public string? UserAnswer { get; set; }
    public string? Feedback { get; set; }
    public DateTime CreatedAt { get; set; }
}