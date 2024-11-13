import { Router } from 'express'
import getAllKamusData from '../handler/kamus/get-all-kamus-data.js'
import createKamus from '../handler/kamus/create-kamus-data.js'
import updateKamus from '../handler/kamus/update-kamus-data.js'
import deleteKamus from '../handler/kamus/delete-kamus-data.js'

export const kamusRoute = Router()

// Route to get all Kamus data
kamusRoute.get('/', getAllKamusData)

// Route to create a new Kamus entry
kamusRoute.post('/', createKamus)

// Route to update an existing Kamus entry
kamusRoute.put('/:id', updateKamus)

// Route to delete an existing Kamus entry
kamusRoute.delete('/:id', deleteKamus)
