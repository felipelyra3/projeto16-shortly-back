import express from "express";
import { UrlsShorten, GetUrlsById, GetUrlsOpenShortenUrl, DeleteUrlsById } from "../controllers/urls.controllers.js";

const router = express.Router();

router.post('/urls/shorten', UrlsShorten);
router.get('/urls/:id', GetUrlsById);
router.get('/urls/open/:shortUrl', GetUrlsOpenShortenUrl);
router.delete('/urls/:id', DeleteUrlsById);

export default router;