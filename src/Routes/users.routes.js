import { Router } from "express";
import { authValidation } from "../Middlewares/authValidation.middleware.js";
import { myData } from "../Controllers/users.controller.js";

const userRouter = Router()

userRouter.get("/users/me", authValidation, myData)

export default userRouter