import { z } from "zod"

/**
 * @typedef {z.infer<typeof loginSchema>} Login
 */
export const loginSchema = z.object({
 email: z.string().email("Email tidak valid"),
 password: z.string("Password wajib di isi").trim(),
})
