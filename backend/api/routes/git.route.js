import express from "express";

import { fetchAll } from "../controllers/git/fetchAll.controller.js";

const router = express.Router();

router.get('/fetchAll', fetchAll);

export default router;
