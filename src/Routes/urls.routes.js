import { Router } from "express";
import { authValidation } from "../Middlewares/authValidation.middleware.js";
import { validationSchema } from "../Middlewares/validadeSchema.middlewares.js";
import { shortenSchema } from "../Schema/urls.schema.js";
import { urlsShorten } from "../Controllers/urls.controller.js";

const urlsRouter = Router()

urlsRouter.post("/urls/shorten", authValidation, validationSchema(shortenSchema), urlsShorten)

export default urlsRouter