import { findKamusById } from '../../service/kamus.js'
import { Prisma } from '@prisma/client'
import { responseStatus } from '../../utils/response.js'

/**
 * @swagger
 * /api/v1/kamus/{id}:
 *   get:
 *     summary: Retrieve a dictionary entry by ID.
 *     description: Fetches a dictionary entry either by the specified ID.
 *     tags:
 *       - Kamus
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the dictionary entry to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved dictionary data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 data:
 *                   type: object
 *                   description: The dictionary data retrieved.
 *                 message:
 *                   type: string
 *                   example: "Data kamus berhasil diambil"
 *       404:
 *         description: The dictionary entry was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "NOT_FOUND"
 *                 message:
 *                   type: string
 *                   example: "Data kamus tidak ditemukan"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 message:
 *                   type: string
 *                   example: "An error occurred while processing the request"
 */

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns
 */
export default async function findKamusId(req, res, next) {
  try {
    const { id } = req.params
    const kamusData = await findKamusById(id)

    if (!kamusData) {
      return res.status(404).json({
        status: responseStatus.NOT_FOUND,
        message: 'Data kamus tidak ditemukan',
      })
    }

    return res.json({
      status: responseStatus.OK,
      data: kamusData,
      message: 'Data kamus berhasil diambil',
    })
  } catch (err) {
    if (err instanceof Prisma.PrismaClientValidationError) {
      return res.status(403).json({
        status: responseStatus.ERROR,
        message: 'ID harus berupa Integer atau Number',
      })
    }
    next(err)
  }
}
