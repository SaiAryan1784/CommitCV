import { useState } from "react";
import axios from "axios";

const LandingPage = () => {
  const [githubId, setGithubId] = useState("");
  const [jobType, setJobType] = useState("");
  const [responseText, setResponseText] = useState("");

  const handleGenerateResume = async () => {
    if (!githubId.trim()) {
      alert("Please enter your GitHub username.");
      return;
    }
    if (!jobType.trim()) {
      alert("Please enter the job Description.");
      return;
    }
    
    try {
      const res = await axios.get("http://localhost:5555/api/git/fetchAll", {
        params: { username: githubId, jobDescription: jobType },
      });
      
      setResponseText(res.data); // Assuming backend returns only text
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponseText("Error fetching data. Please try again.");
    }
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
          placeholder="Enter job Description"
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

      {/* Response Section */}
      {responseText && (
        <div className="w-full max-w-md mt-6 border-2 border-white p-4">
          <h3 className="text-xl font-bold mb-4">AI Response</h3>
          <p className="text-sm">{responseText}</p>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
