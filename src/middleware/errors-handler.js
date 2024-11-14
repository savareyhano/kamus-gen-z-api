export const pathNotFound = (req, res) => {
 res.status(404).json({
  status: "NOT_FOUND",
  message: `cannot find path ${req.originalUrl}`,
 })
}
