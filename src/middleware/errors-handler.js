import { Prisma } from '@prisma/client'
import { responseStatus } from '../utils/response'

export const pathNotFound = (req, res) => {
  res.status(404).json({
    status: responseStatus.NOT_FOUND,
    message: `cannot find path ${req.originalUrl}`,
  })
}

export const serverError = (err, req, res, next) => {
  if (!err) {
    return next()
  }

  if (err instanceof Prisma.PrismaClientInitializationError) {
    return res.status(500).json({
      status: responseStatus.SERVER_ERROR,
      message: 'Gagal Terhubung ke database',
    })
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    return res.status(500).json({
      status: responseStatus.SERVER_ERROR,
      message: 'Internal Server Error',
    })
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(500).json({
      status: responseStatus.SERVER_ERROR,
      message: 'Table tidak ditemukan di Database',
    })
  }

  return res.status(500).json({
    status: responseStatus.SERVER_ERROR,
    message: 'Ups.., Terjadi Kesalahan Tidak Terduga',
  })
}
