import { Router } from 'express'
import getAllKamusData from '../handler/kamus/get-all-kamus-data.js'
import createKamus from '../handler/kamus/create-kamus-data.js'

export const kamusRoute = Router()

kamusRoute.get('/', getAllKamusData)
kamusRoute.post('/', createKamus)
