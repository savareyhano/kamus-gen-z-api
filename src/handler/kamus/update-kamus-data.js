import { updateKamusOnDB } from '../../service/kamus.js'

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
        status: 'ERROR',
        data: [],
        message: 'word atau wordDescription tidak boleh kosong',
      })
    }

    // Update Kamus entry
    const updatedKamus = await updateKamusOnDB(id, { word, wordDescription })

    // Respond with updated Kamus entry
    return res.status(200).json({
      status: 'OK',
      data: updatedKamus,
      message: 'Kamus berhasil diperbarui',
    })
  } catch (error) {
    // Handle errors
    next(error)
  }
}
