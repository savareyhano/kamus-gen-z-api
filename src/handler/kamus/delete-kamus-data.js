import { deleteKamusOnDB } from '../../service/kamus.js'

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
      status: 'DELETED',
      message: 'Kamus berhasil dihapus',
    })
  } catch (error) {
    // Handle errors
    next(error)
  }
}
