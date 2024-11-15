import { createKamusOnDB } from '../../service/kamus.js'
import { responseStatus } from '../../utils/response.js'

/**
 * @swagger
 * /api/v1/kamus:
 *   post:
 *     summary: Create a new Kamus entry
 *     description: Create a new Kamus word and its description.
 *     tags:
 *       - Kamus
 *     requestBody:
 *       description: Data needed to create a Kamus entry
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
 *                 description: The word to add to the Kamus
 *               wordDescription:
 *                 type: string
 *                 example: "Generasi yang lahir antara tahun 1997 hingga 2012"
 *                 description: The description of the word
 *     responses:
 *       201:
 *         description: Kamus entry successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: CREATED
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
 *                   example: Kamus berhasil dibuat
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
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                 message:
 *                   type: string
 *                   example: "word atau description tidak boleh kosong"
 *       500:
 *         description: Internal server error
 */

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default async function createKamus(req, res, next) {
  try {
    /**
     * @typedef CreateKamus
     * @type {object}
     * @property {string} word
     * @property {string} wordDescription
     */

    /** @type {CreateKamus} */
    const { word, wordDescription } = req.body

    if (!word || !wordDescription) {
      return res.status(400).json({
        status: responseStatus.ERROR,
        data: [],
        message: 'word atau description tidak boleh kosong',
      })
    }

    const kamus = await createKamusOnDB({
      word,
      wordDescription,
    })

    return res.status(201).json({
      status: responseStatus.CREATED,
      data: kamus,
      message: 'Kamus berhasil dibuat',
    })
  } catch (error) {
    next(error)
  }
}
