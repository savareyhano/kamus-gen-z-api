import { deleteKamusOnDB } from '../../service/kamus.js'
import { responseStatus } from '../../utils/response.js'

/**
 * @swagger
 * /api/v1/kamus/{id}:
 *   delete:
 *     summary: Delete a Kamus entry
 *     description: Delete a Kamus entry by its ID.
 *     tags:
 *       - Kamus
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Kamus entry to delete
 *     responses:
 *       200:
 *         description: Kamus entry successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: DELETED
 *                 message:
 *                   type: string
 *                   example: Kamus berhasil dihapus
 *       404:
 *         description: Kamus entry not found
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
 *                   example: Kamus tidak ditemukan
 *       500:
 *         description: Internal server error
 */

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default async function deleteKamus(req, res, next) {
  try {
    const { id } = req.params

    // Delete Kamus entry
    await deleteKamusOnDB(id)

    // Respond with success message
    return res.status(200).json({
      status: responseStatus.DELETED,
      message: 'Kamus berhasil dihapus',
    })
  } catch (error) {
    // Handle errors
    next(error)
  }
}
