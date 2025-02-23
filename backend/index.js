import express from 'express';
import { PORT, git_PAT } from "./config.js";
import cors from 'cors';

// import routes
import gitRoute from './api/routes/git.route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// change for deployment
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// use route
app.use(`/api/git`, gitRoute);