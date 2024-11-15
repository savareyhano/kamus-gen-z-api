import { updateKamusOnDB } from '../../service/kamus.js'
import { responseStatus } from '../../utils/response.js'

/**
 * @swagger
 * /api/v1/kamus/{id}:
 *   put:
 *     summary: Update a Kamus entry
 *     description: Update an existing Kamus entry by its ID.
 *     tags:
 *       - Kamus
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Kamus entry to update
 *     requestBody:
 *       description: Kamus data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - word
 *               - wordDescription
 *             properties:
 *               word:
 *                 type: string
 *                 example: "Gen Z"
 *                 description: The updated word in the Kamus
 *               wordDescription:
 *                 type: string
 *                 example: "Generasi yang lahir antara tahun 1997 hingga 2012"
 *                 description: The updated description of the word
 *     responses:
 *       200:
 *         description: Kamus entry successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     word:
 *                       type: string
 *                       example: "Gen Z"
 *                     wordDescription:
 *                       type: string
 *                       example: "Generasi yang lahir antara tahun 1997 hingga 2012"
 *                 message:
 *                   type: string
 *                   example: Kamus berhasil diperbarui
 *       400:
 *         description: Bad request, missing required fields
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
 *                   example: "word atau wordDescription tidak boleh kosong"
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
export default async function updateKamus(req, res, next) {
  try {
    const { id } = req.params
    const { word, wordDescription } = req.body

    // Validate request body
    if (!word || !wordDescription) {
      return res.status(400).json({
        status: responseStatus.ERROR,
        data: [],
        message: 'word atau wordDescription tidak boleh kosong',
      })
    }

    // Update Kamus entry
    const updatedKamus = await updateKamusOnDB(id, { word, wordDescription })

    // Respond with updated Kamus entry
    return res.status(200).json({
      status: responseStatus.OK,
      data: updatedKamus,
      message: 'Kamus berhasil diperbarui',
    })
  } catch (error) {
    // Handle errors
    next(error)
  }
}
