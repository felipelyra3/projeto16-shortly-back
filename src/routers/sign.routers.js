import express from "express";
import { SignUp, SignIn } from "../controllers/sign.controllers.js";
import ComparePasswordAndConfirmPassowrd from "../middlewares/sign.middlewares.js";

const router = express.Router();

router.post('/signin', SignIn);

router.use(ComparePasswordAndConfirmPassowrd); //middleware
router.post('/signup', SignUp);

export default router;