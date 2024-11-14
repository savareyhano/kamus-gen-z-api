import { findAllKamusData, findAllKamusDataBy } from '../../service/kamus.js'

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

    console.log('dssdf')

    if (query) {
      kamusData = await findAllKamusDataBy(query)
    } else {
      kamusData = await findAllKamusData()
    }

    return res.json({
      status: 'OK',
      data: kamusData,
      message: 'Data kamus berhasil diambil',
    })
  } catch (error) {
    next(error)
  }
}
