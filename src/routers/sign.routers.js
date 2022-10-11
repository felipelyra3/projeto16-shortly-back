import express from "express";
import { SignUp } from "../controllers/sign.controllers.js"
import ComparePasswordAndConfirmPassowrd from "../middlewares/sign.middlewares.js"

const router = express.Router();

router.use(ComparePasswordAndConfirmPassowrd); //middleware
router.post('/signup', SignUp);

export default router;