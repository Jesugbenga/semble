const apiKey = process.env.OPENAI_API_KEY;

// Configuration
const AI_CONFIG = {
    openaiApiKey: apiKey, // In production, get this from a secure backend
    model: 'gpt-3.5-turbo', // or 'gpt-4'
    temperature: 0.7
};

// AI Helper Functions
async function callOpenAI(prompt, systemMessage = "") {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_CONFIG.openaiApiKey}`
            },
            body: JSON.stringify({
                model: AI_CONFIG.model,
                messages: [
                    { role: "system", content: systemMessage },
                    { role: "user", content: prompt }
                ],
                temperature: AI_CONFIG.temperature
            })
        });

        const data = await response.json();
        return data.choices[0]?.message?.content || "No response from AI";
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        return "Error getting AI response";
    }
}


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
async function analyzeResume() {
    const resumeText = document.getElementById('resume-input').value;
    const feedbackList = document.getElementById('resume-feedback-list');
    
    // Clear previous feedback
    feedbackList.innerHTML = '<li>Analyzing your resume... (this may take a moment)</li>';
    
    if (!resumeText.trim()) {
        feedbackList.innerHTML = '<li>Please paste your resume content to receive feedback</li>';
        return;
    }
    
    // AI-powered analysis
    const prompt = `Please analyze this resume and provide specific, actionable feedback in bullet points. Focus on:
    - Formatting and structure
    - Content quality and relevance
    - Areas for improvement
    - Missing elements
    - Strengths to highlight
    
    Resume:
    ${resumeText}`;
    
    const systemMessage = "You are a professional career coach providing resume feedback. Be constructive, specific, and professional. Provide 5-7 bullet points of feedback.";
    
    const aiResponse = await callOpenAI(prompt, systemMessage);
    
    // Format the response
    feedbackList.innerHTML = aiResponse.split('\n')
        .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
        .map(line => `<li>${line.replace(/^-|\•/, '').trim()}</li>`)
        .join('');
    
    if (feedbackList.innerHTML === '') {
        feedbackList.innerHTML = '<li>Received feedback from AI. Here are the suggestions:</li>' + 
                                 `<li>${aiResponse.replace(/\n/g, '</li><li>')}</li>`;
    }
}

// Interview Similutaion
let interviewContext = [];
let currentQuestion = "";

async function startInterview() {
    const position = document.getElementById('position-input').value || 'a general position';
    const industry = document.getElementById('industry-input').value || 'your industry';
    
    interviewContext = [
        { role: "system", content: `You are conducting a mock job interview for a ${position} in ${industry}. 
        Ask relevant questions one at a time, then provide constructive feedback on the candidate's answers.
        Focus on content, structure, and presentation. Be professional but encouraging.` }
    ];
    
    await askNextQuestion();
    document.getElementById('start-interview').textContent = 'Next Question';
}

async function askNextQuestion() {
    const interviewQuestion = document.getElementById('interview-question');
    interviewQuestion.innerHTML = '<p>Generating question...</p>';
    
    // Ask AI to generate or select the next question
    interviewContext.push({ role: "user", content: "Please ask me the next interview question." });
    
    const aiResponse = await callOpenAI("", interviewContext);
    currentQuestion = aiResponse;
    
    interviewQuestion.innerHTML = `<p><strong>Question:</strong> ${currentQuestion}</p>`;
    document.getElementById('interview-answer').value = '';
    document.getElementById('interview-answer').disabled = false;
    document.getElementById('submit-answer').disabled = false;
    document.getElementById('interview-feedback-content').innerHTML = '';
    
    interviewContext.push({ role: "assistant", content: currentQuestion });
}
