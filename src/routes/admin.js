import { Router } from 'express'
import { getAllWordsHandler, updateWordsHandler } from '../handler/admin/gateaway-kamus.js'

export const adminRoute = Router()

// Route to get all Kamus on Words Gateaway
adminRoute.get('/', getAllWordsHandler)

// Route to update action on Words Gateaway
adminRoute.put('/update', updateWordsHandler)

