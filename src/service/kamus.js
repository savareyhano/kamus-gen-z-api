import { client } from "../database.js";

export async function findAllKamusData(){
    return await client.words.findMany()
}

export async function findAllKamusDataBy(query){
    return await client.words.findMany({
        where: {
            word: {
                contains: query
            }
        }
    })
}

export async function createKamusOnDB(data){
    return await client.words.create({
        data: data
    });
}