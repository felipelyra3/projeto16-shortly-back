import express from "express";
import { UrlsShorten, GetUrlsById, GetUrlsOpenShortenUrl } from "../controllers/urls.controllers.js";

const router = express.Router();

router.post('/urls/shorten', UrlsShorten);
router.get('/urls/:id', GetUrlsById);
router.get('/urls/open/:shortUrl', GetUrlsOpenShortenUrl);

export default router;