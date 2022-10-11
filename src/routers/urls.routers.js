import express from "express";
import { UrlsShorten, GetUrlsById } from "../controllers/urls.controllers.js";

const router = express.Router();

router.post('/urls/shorten', UrlsShorten);
router.get('/urls/:id', GetUrlsById);

export default router;