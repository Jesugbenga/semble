// CommunityConnect.API/Data/ApplicationDbContext.cs
using Microsoft.EntityFrameworkCore;
using CommunityConnect.API.Models;

namespace CommunityConnect.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    
    public DbSet<Resource> Resources { get; set; } = null!;
    public DbSet<Category> Categories { get; set; } = null!;
    public DbSet<Tag> Tags { get; set; } = null!;
    public DbSet<ResourceCategory> ResourceCategories { get; set; } = null!;
    public DbSet<ResourceTag> ResourceTags { get; set; } = null!;
    public DbSet<JobCoachSession> JobCoachSessions { get; set; } = null!;
    public DbSet<InterviewQuestion> InterviewQuestions { get; set; } = null!;
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Configure many-to-many relationship for Resource-Category
        modelBuilder.Entity<ResourceCategory>()
            .HasKey(rc => new { rc.ResourceId, rc.CategoryId });
            
        modelBuilder.Entity<ResourceCategory>()
            .HasOne(rc => rc.Resource)
            .WithMany(r => r.Categories)
            .HasForeignKey(rc => rc.ResourceId);
            
        modelBuilder.Entity<ResourceCategory>()
            .HasOne(rc => rc.Category)
            .WithMany(c => c.Resources)
            .HasForeignKey(rc => rc.CategoryId);
            
        // Configure many-to-many relationship for Resource-Tag
        modelBuilder.Entity<ResourceTag>()
            .HasKey(rt => new { rt.ResourceId, rt.TagId });
            
        modelBuilder.Entity<ResourceTag>()
            .HasOne(rt => rt.Resource)
            .WithMany(r => r.Tags)
            .HasForeignKey(rt => rt.ResourceId);
            
        modelBuilder.Entity<ResourceTag>()
            .HasOne(rt => rt.Tag)
            .WithMany(t => t.Resources)
            .HasForeignKey(rt => rt.TagId);
    }
}