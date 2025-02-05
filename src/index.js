import express from 'express'
import { kamusRoute } from './routes/kamus.js'
import { adminRoute } from './routes/admin.js'
import { cors } from './middleware/cors.js'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './docs/swagger.js'
import { pathNotFound, serverError } from './middleware/errors-handler.js'

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cors)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

/**
 * TODO :
 * Untuk saat ini hanya endpoint berikut yang perlu dibuat
 * /api/v1/kamus
 * /api/v1/user
 * /api/v1/auth
 *
 */

app.use('/api/v1/kamus', kamusRoute)
app.use('/api/v1/admin', adminRoute)

/**
 * Buatin error handlingnya rek
 * middlewarenya buat di ./middleware
 * o iya sekalian buatin handling 404
 */

app.use('*', pathNotFound)
app.use(serverError)

app.listen(PORT, '0.0.0.0', () => console.log(`Listening ${PORT}`))
