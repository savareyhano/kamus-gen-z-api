/**
 * @typedef {object} ResponseStatus
 * @property {"OK"} OK
 * @property {"UNAUTHORIZED"} UNAUTHORIZED
 * @property {"ERROR"} ERROR
 * @property {"SERVER_ERROR"} SERVER_ERROR
 * @property {"CREATED"} CREATED
 * @property {"SUCCESS"} SUCCESS
 * @property {"DELETED"} DELETED
 * @property {"FAILED"} FAILED
 * @property {"NOT_FOUND"} NOT_FOUND
 */

/** @type {ResponseStatus}*/

export const responseStatus = {
  OK: 'OK',
  UNAUTHORIZED: 'UNAUTHORIZED',
  ERROR: 'ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  CREATED: 'CREATED',
  SUCCESS: 'SUCCESS',
  DELETED: 'DELETED',
  FAILED: 'FAILED',
  NOT_FOUND: 'NOT_FOUND',
}

// OK = Berhasil
// UNAUTHORIZED = User ngga punya izin, bisa jadi karna gak login, atau gak punya akses admin
// ERROR = Error yang disebabkan user
// SERVER_ERROR = Error masalah SERVER_ERROR
// CREATED = Data berhasil dibuat, cuma dipake kalau untuk membuat data baru
// SUCCESS = Data berhasil diubah, cuma dipake kalau untuk mengubah data baru
// DELETED = Data berhasil dihapus
// FAILED = Proses gagal, baik gagal dibuat, gagal diubah, atau gagal dihapus
