// Tab Switching Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Main tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs and buttons
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Job coach tab switching
    const jobTabButtons = document.querySelectorAll('.job-tab-button');
    jobTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all job tabs and buttons
            document.querySelectorAll('.job-tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.job-tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const tabId = this.getAttribute('data-job-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Resource Finder Functionality
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
        searchButton.addEventListener('click', performResourceSearch);
    }

    // Job Coach Functionality
    const analyzeResumeButton = document.getElementById('analyze-resume');
    if (analyzeResumeButton) {
        analyzeResumeButton.addEventListener('click', analyzeResume);
    }

    const startInterviewButton = document.getElementById('start-interview');
    if (startInterviewButton) {
        startInterviewButton.addEventListener('click', startInterview);
    }

    const submitAnswerButton = document.getElementById('submit-answer');
    if (submitAnswerButton) {
        submitAnswerButton.addEventListener('click', submitAnswer);
    }
});

// Sample Resource Data (would be replaced with API calls in production)
function performResourceSearch() {
    const searchTerm = document.getElementById('resource-search').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const resultsContainer = document.getElementById('search-results');
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    
    // Filter resources based on search
    let filteredResources = sampleResources.filter(resource => {
        const matchesSearch = resource.name.toLowerCase().includes(searchTerm) || 
                             resource.description.toLowerCase().includes(searchTerm) ||
                             resource.services.some(service => service.toLowerCase().includes(searchTerm));
        
        const matchesCategory = category === 'all' || resource.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    // Display results or "no results" message
    if (filteredResources.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <p>No resources found matching your search. Try different keywords or categories.</p>
            </div>
        `;
    } else {
        filteredResources.forEach(resource => {
            const resourceCard = document.createElement('div');
            resourceCard.className = 'resource-card';
            resourceCard.innerHTML = `
                <h3>${resource.name}</h3>
                <p>${resource.description}</p>
                <p><strong>Services:</strong> ${resource.services.join(', ')}</p>
                <p>📞 ${resource.phone} | 🌐 <a href="${resource.website}" target="_blank">${resource.website}</a></p>
                <p>📍 ${resource.address}</p>
            `;
            resultsContainer.appendChild(resourceCard);
        });
    }
}

// Job Coach Functions
function analyzeResume() {
    const resumeText = document.getElementById('resume-input').value;
    const feedbackList = document.getElementById('resume-feedback-list');
    
    // Clear previous feedback
    feedbackList.innerHTML = '';
    
    if (!resumeText.trim()) {
        feedbackList.innerHTML = '<li>Please paste your resume content to receive feedback</li>';
        return;
    }
    
    // Simple analysis (would be replaced with AI in production)
    const feedbackItems = [];
    
    // Check for contact information
    if (!resumeText.match(/email|phone|contact/i)) {
        feedbackItems.push('Add contact information (email, phone)');
    }
    
    // Check for action verbs
    const actionVerbs = ['managed', 'developed', 'created', 'led', 'improved', 'increased'];
    const hasActionVerbs = actionVerbs.some(verb => resumeText.toLowerCase().includes(verb));
    if (!hasActionVerbs) {
        feedbackItems.push('Include more action verbs (e.g., "managed", "developed") to describe your experience');
    }
    
    // Check for measurable results
    if (!resumeText.match(/\d+/)) {
        feedbackItems.push('Add quantifiable achievements (e.g., "increased sales by 20%")');
    }
    
    // Check length
    const wordCount = resumeText.split(/\s+/).length;
    if (wordCount < 50) {
        feedbackItems.push('Consider adding more details to your resume');
    } else if (wordCount > 500) {
        feedbackItems.push('Your resume might be too long - try to keep it concise');
    }
    
    // Display feedback
    if (feedbackItems.length === 0) {
        feedbackItems.push('Your resume looks good! Consider having a professional review it for further improvements');
    }
    
    feedbackItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        feedbackList.appendChild(li);
    });
}

let currentQuestionIndex = 0;
const interviewQuestions = [
    "Tell me about yourself.",
    "What are your greatest strengths?",
    "What is your greatest weakness?",
    "Why do you want to work here?",
    "Where do you see yourself in five years?",
    "Why should we hire you?"
];

function startInterview() {
    currentQuestionIndex = 0;
    document.getElementById('interview-question').innerHTML = `<p><strong>Question:</strong> ${interviewQuestions[currentQuestionIndex]}</p>`;
    document.getElementById('interview-answer').value = '';
    document.getElementById('interview-answer').disabled = false;
    document.getElementById('submit-answer').disabled = false;
    document.getElementById('start-interview').textContent = 'Next Question';
    document.getElementById('interview-feedback-content').innerHTML = '';
}

function submitAnswer() {
    const answer = document.getElementById('interview-answer').value;
    const feedbackContent = document.getElementById('interview-feedback-content');
    
    if (!answer.trim()) {
        feedbackContent.innerHTML = '<p>Please provide an answer to receive feedback</p>';
        return;
    }
    
    // Simple feedback (would be replaced with AI in production)
    const feedback = [];
    const wordCount = answer.split(/\s+/).length;
    
    if (wordCount < 20) {
        feedback.push('Your answer is quite short. Try to provide more details and examples.');
    } else if (wordCount > 150) {
        feedback.push('Your answer might be too long. Try to be more concise (1-2 minutes when spoken).');
    }
    
    if (!answer.match(/I|my|me/i)) {
        feedback.push('Make sure to speak about your personal experiences and achievements.');
    }
    
    if (feedback.length === 0) {
        feedback.push('Good answer! Practice saying it out loud to improve your delivery.');
    }
    
    feedbackContent.innerHTML = feedback.map(item => `<p>${item}</p>`).join('');
    
    // Prepare for next question
    document.getElementById('interview-answer').value = '';
    currentQuestionIndex++;
    
    if (currentQuestionIndex < interviewQuestions.length) {
        document.getElementById('interview-question').innerHTML = `<p><strong>Question:</strong> ${interviewQuestions[currentQuestionIndex]}</p>`;
    } else {
        document.getElementById('interview-question').innerHTML = '<p>Interview simulation complete! You can start again to practice more.</p>';
        document.getElementById('interview-answer').disabled = true;
        document.getElementById('submit-answer').disabled = true;
        document.getElementById('start-interview').textContent = 'Start Interview Simulation';
        feedbackContent.innerHTML += '<p>Great job completing the interview simulation! Practice regularly to improve.</p>';
    }
}