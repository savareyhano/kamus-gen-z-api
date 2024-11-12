import { registerSchema } from "../../schemas/auth/registerSchema.js";
import { register } from "../../service/auth.js";

export default async function registeringNewUser(req, res, next) {
  try {
    const data = registerSchema.parse(req.body);

    await register(data);

    return res.json({
      status: "OK",
      data: [],
    });
  } catch (error) {
    next(error);
  }
}
