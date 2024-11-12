import { loginSchema } from '../../schemas/auth/loginSchema.js'
import { login } from '../../service/auth.js'

export default async function authenticateSession(req, res, next) {
  try {
    const data = loginSchema.parse(req.body)
    const token = await login(data)

    return res.json({
      status: 'OK',
      data: token,
    })
  } catch (error) {
    next(error)
  }
}
