import express from "express";
import { UrlsShorten } from "../controllers/urls.controllers.js";

const router = express.Router();

router.post('/urls/shorten', UrlsShorten);

export default router;