import { findAllKamusData, findAllKamusDataBy } from "../../service/kamus.js"

/**
 * @swagger
 * /api/v1/kamus:
 *   get:
 *     summary: Get all Kamus data
 *     description: Retrieve all Kamus data or search Kamus data by query.
 *     tags:
 *       - Kamus
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Query to search Kamus data by term
 *     responses:
 *       200:
 *         description: Successful response with Kamus data
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
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       term:
 *                         type: string
 *                         example: "Gen Z"
 *                       definition:
 *                         type: string
 *                         example: "Generasi yang lahir antara tahun 1997 hingga 2012"
 *                 message:
 *                   type: string
 *                   example: Data kamus berhasil diambil
 *       500:
 *         description: Internal server error
 */

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns
 */
export default async function getAllKamusData(req, res, next) {
 try {
  const query = req.query.q
  let kamusData

  if (query) {
   kamusData = await findAllKamusDataBy(query)
  } else {
   kamusData = await findAllKamusData()
  }

  return res.json({
   status: "OK",
   data: kamusData,
   message: "Data kamus berhasil diambil",
  })
 } catch (error) {
  next(error)
 }
}
