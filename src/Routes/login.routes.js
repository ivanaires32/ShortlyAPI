import { Router } from "express";
import { signinSchema, signupSchema } from "../Schema/login.schemas.js";
import { signIn, signUp } from "../Controllers/login.controllers.js";
import { validateSignIn, validateSignUp } from "../Middlewares/login.middleware.js";
import { validationSchema } from "../Middlewares/validadeSchema.middlewares.js";

const loginRouter = Router()

loginRouter.post("/signup", validationSchema(signupSchema), validateSignUp, signUp)
loginRouter.post("/signin", validationSchema(signinSchema), validateSignIn, signIn)

export default loginRouter