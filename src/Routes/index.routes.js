import { Router } from "express";
import loginRouter from "./login.routes.js";
import urlsRouter from "./urls.routes.js";

const indexRouter = Router()

indexRouter.use(loginRouter)
indexRouter.use(urlsRouter)

export default indexRouter