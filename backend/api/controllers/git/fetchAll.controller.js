import express from 'express';
import dotenv from 'dotenv';
import { Octokit } from "@octokit/rest";
import { git_PAT, api_key } from '../../../config.js';
import axios from 'axios';

dotenv.config();
const router = express.Router();

// Route to handle adding medical report records with optional file upload
export const fetchAll = async (req, res) => {
    try {
        if (!req.query.username) {
            return res.status(400).send({ message: `Please send username` });
        }

        const { username,jobDescription } = req.query;

        const octokit = new Octokit({
            auth: git_PAT
        })
        
        // fetch all repositories from user
        const gitRes = await octokit.request('GET /users/{username}/repos', {
            username: `${username}`,
            type: "all", // fetch all repos by default only owned by user
            per_page: 10, // set to 10 for now for development
            headers: {
            'X-GitHub-Api-Version': '2022-11-28'
            }
        })

        // Extract fetch repo data
        const repoData = await Promise.all(gitRes.data.map(async (repo) => {
            const fullName = repo.full_name;
            let readmeContent = "";

            try {
                const readmeRes = await octokit.request('GET /repos/{owner}/{repo}/readme', {
                    owner: repo.owner.login,
                    repo: repo.name,
                    headers: { 'X-GitHub-Api-Version': '2022-11-28' }
                }).catch(() => null);

                if (readmeRes && readmeRes.data && readmeRes.data.content) {
                    readmeContent = Buffer.from(readmeRes.data.content, 'base64').toString();
                }

                return {
                    name: repo.name,
                    fullName,
                    topics: repo.topics,
                    mainLanguage: repo.language,
                    readme: readmeContent
                };

            } catch (error) {
                console.error(`Error fetching README for ${fullName}:`, error);
                return {
                    name: repo.name,
                    fullName,
                    topics: repo.topics,
                    mainLanguage: repo.language,
                    readme: null
                };
            }
        }));

        console.log(jobDescription);

        // gemini call part
        const prompt = `You are an AI assistant that matches job descriptions with GitHub repositories. Given a job description and a list of repositories, analyze each repository based on its name, topics, primary programming language, and README content. Select the top 3 most relevant repositories that best match the job description and provide a brief justification for each selection.`;
        const geminiRes = await axios({
            url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + api_key,
            method: "post",
            timeout: 60000,
            data: {
                "contents": [{
                    "parts": [{
                        "text": prompt + "\nJob Description:" + `${jobDescription}` + "\nRepositories: " + JSON.stringify(repoData)
                    }]
                }]
            }
        });

        return res.status(200).json(geminiRes.data);

        return res.status(200).json(repoData);

        // return res.status(201).send(gitRes);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};

export default router;