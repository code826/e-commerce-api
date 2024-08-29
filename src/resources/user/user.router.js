import express from "express";
import UserController from "./user.controller.js";

const router = express.Router();

const userController = new UserController();

router.post("/", userController.register);

router.post("/login", userController.login);

export default router;
