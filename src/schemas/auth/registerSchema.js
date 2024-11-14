import { z } from "zod"

/**
 * @typedef {z.infer<typeof registerSchema>} Register
 */
export const registerSchema = z.object({
 email: z.string().email("Email tidak valid"),
 username: z.string().trim().min(1),
 fullname: z.string().trim().min(1),
 password: z.string("Password wajib di isi").trim().min(1),
})
