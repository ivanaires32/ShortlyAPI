import { Router } from "express";
import { authValidation } from "../Middlewares/authValidation.middleware.js";
import { myUrls, ranking } from "../Controllers/users.controller.js";

const userRouter = Router()

userRouter.get("/users/me", authValidation, myUrls)
userRouter.get("/ranking", ranking)

export default userRouter