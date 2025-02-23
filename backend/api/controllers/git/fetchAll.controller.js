import express from 'express';
import dotenv from 'dotenv';
import { Octokit } from "@octokit/rest";
import { git_PAT } from '../../../config.js';

dotenv.config(); 
const router = express.Router();

// Route to handle adding medical report records with optional file upload
export const fetchAll = async (req, res) => {
    try {
        if (!req.body.username) {
            return res.status(400).send({ message: `Please send username` });
        }

        const { username } = req.body;

        const octokit = new Octokit({
            auth: git_PAT
        })
        
        const gitRes = await octokit.request('GET /users/{username}/repos', {
            username: `${username}`,
            type: "all", // fetch all repos by default only owned by user
            per_page: 10, // max 100 repos fetch
            headers: {
            'X-GitHub-Api-Version': '2022-11-28'
            }
        })

        // Extract only repository names
        const repoNames = gitRes.data.map(repo => repo.full_name);

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

        return res.status(200).json(repoData);

        // return res.status(201).send(gitRes);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
};

export default router;
