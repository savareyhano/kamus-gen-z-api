import { client } from "../database.js";

export async function findAllKamusData(){
    return await client.words.findMany()
}