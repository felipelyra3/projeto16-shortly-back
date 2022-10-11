import express from "express";
import { GetRanking } from "../controllers/ranking.controller.js";

const router = express.Router();

router.get('/ranking', GetRanking);

export default router;