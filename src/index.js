import express from "express";
import { kamusRoute } from "./routes/kamus.js";
import { authRoute } from "./routes/auth.js";
import { verifyToken } from "./middleware/verify-token.js";

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
app.use("/api/v1/auth", authRoute);

app.get("/api/v1/test-auth", verifyToken, (req, res) => {
  return res.status(200).json({
    status: "OK",
    data: req.user,
  });
});

/**
 * Buatin error handlingnya rek
 * middlewarenya buat di ./middleware
 * o iya sekalian buatin handling 404
 */

app.listen(PORT, "0.0.0.0", () => console.log(`Listening ${PORT}`));
