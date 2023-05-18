import { Router } from "express";
import loginRouter from "./login.routes.js";
import urlsRouter from "./urls.routes.js";
import userRouter from "./users.routes.js";

const indexRouter = Router()

indexRouter.use(loginRouter)
indexRouter.use(urlsRouter)
indexRouter.use(userRouter)

export default indexRouter