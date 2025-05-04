// CommunityConnect.API/Models/JobCoachSession.cs
namespace CommunityConnect.API.Models;

public class JobCoachSession
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public string? ResumeText { get; set; }
    public string? ResumeFeedback { get; set; }
    public string? TargetCountry { get; set; }
    public ICollection<InterviewQuestion> InterviewQuestions { get; set; } = new List<InterviewQuestion>();
}