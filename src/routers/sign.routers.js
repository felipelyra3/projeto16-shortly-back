import express from "express";
import { SignUp, SignIn, SignOut, SignOutAll } from "../controllers/sign.controllers.js";
import ComparePasswordAndConfirmPassowrd from "../middlewares/sign.middlewares.js";
import UserAuthentication from "../middlewares/users.middlewares.js";

const router = express.Router();

router.post('/signin', SignIn);

//router.use(ComparePasswordAndConfirmPassowrd); //middleware
router.post('/signup', ComparePasswordAndConfirmPassowrd, SignUp);
router.delete('/signout', UserAuthentication, SignOut);
router.delete('/signoutall', UserAuthentication, SignOutAll);

export default router;