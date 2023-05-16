import { Router } from "express";
import loginRouter from "./login.routes.js";

const indexRouter = Router()

indexRouter.use(loginRouter)

export default indexRouter