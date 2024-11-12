import { Router } from "express";
import getAllKamusData from "../handler/kamus/get-all-kamus-data.js";

export const kamusRoute = Router()

kamusRoute.get("/", getAllKamusData)