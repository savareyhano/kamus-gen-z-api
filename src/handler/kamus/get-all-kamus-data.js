import { findAllKamusData } from "../../service/kamus.js"

export default async function getAllKamusData(req, res, next) {
    try{
        const kamusData = await findAllKamusData()

        return res.json({
            status: "OK",
            data: kamusData
        })
    }
    catch(error){
        next(error)
    }
}