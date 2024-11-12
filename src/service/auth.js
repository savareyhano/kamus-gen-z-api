import { client } from "../database.js";

import bcrypt from "bcrypt";
import * as jose from "jose";

/**
 * @param {import("../schemas/auth/loginSchema").Login} data
 */
export async function login(data) {
  const existingUser = await client.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!existingUser) {
    throw new Error("Email tidak ditemukan");
  }

  const verifiedPassword = await bcrypt.compare(
    data.password,
    existingUser.password,
  );

  if (!verifiedPassword) {
    throw new Error("Email/Password tidak cocok");
  }

  const userPayload = {
    id: existingUser.id,
    username: existingUser.username,
    email: existingUser.email,
    fullname: existingUser.fullname,
  };

  const jwt = new jose.SignJWT(userPayload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt();

  const accessToken = await jwt
    .setExpirationTime("2h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  const refreshToken = await jwt
    .setExpirationTime("3d")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  return { accessToken, refreshToken };
}

/**
 * @param {import("../schemas/auth/registerSchema").Register} data
 */
export async function register(data) {
  const existingUser = await client.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("Email sudah pernah di daftarkan"); // Biarin aja ntar juga di brute force
  }

  data.password = await bcrypt.hash(data.password, 10);

  await client.user.create({
    data,
  });
}
