import { loginSchema } from '../../schemas/auth/loginSchema.js'
import { login } from '../../service/auth.js'
import { responseStatus } from '../../utils/response.js'

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user and return a JWT token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: User credentials for authentication
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 example: "password123"
 *                 description: The password of the user
 *     responses:
 *       200:
 *         description: Successful authentication, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Invalid input, missing or incorrect email/password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
 *       500:
 *         description: Internal server error
 */

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default async function authenticateSession(req, res, next) {
  try {
    const data = loginSchema.parse(req.body)
    const token = await login(data)

    return res.json({
      status: responseStatus.OK,
      data: token,
    })
  } catch (error) {
    next(error)
  }
}
