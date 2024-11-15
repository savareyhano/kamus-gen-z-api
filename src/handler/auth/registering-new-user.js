import { registerSchema } from '../../schemas/auth/registerSchema.js'
import { register } from '../../service/auth.js'
import { responseStatus } from '../../utils/response.js'

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with provided credentials.
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: User credentials for registration
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 example: "newuser@example.com"
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 example: "newpassword123"
 *                 description: The password for the new user account
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *                 description: The full name of the user
 *     responses:
 *       200:
 *         description: Successful registration of the new user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items: {}
 *       400:
 *         description: Invalid input, missing or incorrect user data
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
 *                   example: "Email already exists or invalid input"
 *       500:
 *         description: Internal server error
 */

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default async function registeringNewUser(req, res, next) {
  try {
    const data = registerSchema.parse(req.body)

    await register(data)

    return res.json({
      status: responseStatus.OK,
      data: [],
    })
  } catch (error) {
    next(error)
  }
}
