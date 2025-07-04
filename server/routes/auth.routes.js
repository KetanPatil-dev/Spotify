import express from "express";
import { authCallback } from "../controllers/user.controller.js";
const AuthRoutes = express.Router();
AuthRoutes.post("/callback", authCallback);

export default AuthRoutes;
