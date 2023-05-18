import { Router } from "express";
import { authValidation } from "../Middlewares/authValidation.middleware.js";
import { validationSchema } from "../Middlewares/validadeSchema.middlewares.js";
import { shortenSchema } from "../Schema/urls.schema.js";
import { deleteUrl, urlOpen, urlsId, urlsShorten } from "../Controllers/urls.controller.js";
import { delShortUrl, open, urlsValidation } from "../Middlewares/urlsValidation.middleware.js";

const urlsRouter = Router()

urlsRouter.post("/urls/shorten", authValidation, validationSchema(shortenSchema), urlsShorten)
urlsRouter.get("/urls/:id", urlsValidation, urlsId)
urlsRouter.get("/urls/open/:shortUrl", open, urlOpen)
urlsRouter.delete("/urls/:id", authValidation, urlsValidation, delShortUrl, deleteUrl)

export default urlsRouter