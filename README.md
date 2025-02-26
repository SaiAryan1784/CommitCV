# CommitCV: AI-Powered GitHub Project Ranking for Job Applications
## 📺 Live Demo  
[![Watch the Demo](https://img.youtube.com/vi/brghI0f89-s/0.jpg)](https://www.youtube.com/watch?v=brghI0f89-s)  


Overview

CommitCV analyzes job descriptions and ranks your GitHub repositories based on relevance. It fetches repository details using the GitHub API and processes them using AI to help developers identify the most relevant projects for job applications.

Key Features

    GitHub Integration: Fetches repository details, including README files, programming languages, and topics using a GitHub personal access token.
    Project Ranking: Scores repositories based on alignment with job descriptions using AI.
    Tech Stack Analysis: Extracts technologies from each repository for relevance assessment.
    Google Gemini API: Processes job descriptions to extract key skills and match them with project details.

Installation & Usage
Prerequisites

    Node.js & npm
    GitHub personal access token
    Google Gemini API key

Setup

    Clone the repository:

    git clone https://github.com/SaiAryan1784/CommitCV.git  
    cd CommitCV  

Install dependencies:

- Backend
    
        cd backend  
        npm i  
        npm run dev  

- Frontend

        cd project  
        npm i  
        npm run dev  

- Set up environment variables:

        Create a .env file in the backend folder and add:
    
            git_PAT = "your_github_personal_access_token"
            api_key = "your_google_gemini_api_key"
    
        Access the frontend at http://localhost:5173/.

Current Limitations

    GitHub authentication is via a personal access token (OAuth not implemented yet).
    Basic ranking logic using AI, improvements needed for better accuracy.
    Resume generation is not implemented yet.

Tech Stack

    Frontend: React.js
    Backend: Node.js (Express.js)
    AI: Google Gemini API
    Database: Not required yet

Next Steps

    Improve ranking using embeddings and advanced NLP techniques.
    Implement OAuth for seamless GitHub authentication.
    Add resume generation based on ranked projects.
