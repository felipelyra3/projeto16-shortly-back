import express from "express";
import { GetUsersMe } from "../controllers/users.controllers.js";
import UserAuthentication from "../middlewares/users.middlewares.js";

const router = express.Router();

//router.use(UserAuthentication); //middleware
router.get('/users/me', UserAuthentication, GetUsersMe);

export default router;