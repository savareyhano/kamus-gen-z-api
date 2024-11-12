import express from "express";
import { kamusRoute } from "./routes/kamus.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

/**
 * TODO :
 * Untuk saat ini hanya endpoint berikut yang perlu dibuat
 * /api/v1/kamus
 * /api/v1/user
 * /api/v1/auth
 *
 */

app.use("/api/v1/kamus", kamusRoute);

/**
 * Buatin error handlingnya rek
 * middlewarenya buat di ./middleware
 * o iya sekalian buatin handling 404
 */

app.listen(PORT, "0.0.0.0", () => console.log(`Listening ${PORT}`));
