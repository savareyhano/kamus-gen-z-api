import { Router } from "express";
import authenticateSession from "../handler/auth/authenticate-session.js";
import registeringNewUser from "../handler/auth/registering-new-user.js";

export const authRoute = Router();

authRoute.post("/login", authenticateSession);
authRoute.post("/register", registeringNewUser);
