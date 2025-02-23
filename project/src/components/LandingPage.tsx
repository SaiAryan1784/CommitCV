import { useState } from "react";

const LandingPage = () => {
  const [githubId, setGithubId] = useState("");
  const [jobType, setJobType] = useState("");
  const [projects, setProjects] = useState([]);

  const handleGenerateResume = () => {
    if (!githubId.trim()) {
      alert("Please enter your GitHub username.");
      return;
    }
    if (!jobType.trim()) {
      alert("Please enter the job type.");
      return;
    }
    console.log("Generating resume for:", githubId, "Job Type:", jobType);
    
    // Simulating a response for now
    const mockProjects = [
      { name: "Awesome Repo", topics: ["React", "Tailwind"], lastActivity: "2 days ago", link: "https://github.com/example/awesome-repo" },
      { name: "AI Project", topics: ["Machine Learning", "NLP"], lastActivity: "5 days ago", link: "https://github.com/example/ai-project" }
    ];
    setProjects(mockProjects);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6 font-mono">
      <h1 className="text-3xl font-bold mb-6">CommitCV</h1>
      <div className="p-6 border-2 border-white text-center w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">GitHub Resume Generator</h2>
        <input
          type="text"
          placeholder="GitHub Username"
          value={githubId}
          onChange={(e) => setGithubId(e.target.value)}
          className="w-full p-2 border border-white bg-black text-white mb-4"
        />
        <input
          type="text"
          placeholder="Enter job type"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="w-full p-2 border border-white bg-black text-white mb-4"
        />
        <button
          onClick={handleGenerateResume}
          className="w-full border-2 border-white py-2 mt-2 hover:bg-white hover:text-black"
        >
          Generate Resume
        </button>
      </div>

      {/* Projects Section */}
      <div className="w-full max-w-md mt-6">
        {projects.length > 0 && (
          <div className="border-2 border-white p-4">
            <h3 className="text-xl font-bold mb-4">Relevant Projects</h3>
            {projects.map((project, index) => (
              <div key={index} className="mb-4 border-b border-gray-500 pb-2">
                <h4 className="text-lg font-semibold">{project.name}</h4>
                <p className="text-sm">Topics: {project.topics.join(", ")}</p>
                <p className="text-sm">Last Activity: {project.lastActivity}</p>
                <a href={project.link} className="text-blue-400" target="_blank" rel="noopener noreferrer">Repo Link</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
  