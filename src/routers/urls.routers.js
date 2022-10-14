import express from "express";
import { UrlsShorten, GetUrlsById, GetUrlsOpenShortenUrl, DeleteUrlsById } from "../controllers/urls.controllers.js";
import UserAuthentication from "../middlewares/users.middlewares.js";

const router = express.Router();

router.post('/urls/shorten', UserAuthentication, UrlsShorten);
router.get('/urls/:id', GetUrlsById);
router.get('/urls/open/:shortUrl', GetUrlsOpenShortenUrl);
router.delete('/urls/:id', UserAuthentication, DeleteUrlsById);

export default router;