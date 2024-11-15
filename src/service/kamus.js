import { client } from "../database.js"

// Fetch all Kamus data
export async function findAllKamusData() {
 return await client.words.findMany()
}

// Fetch Kamus data by query
export async function findAllKamusDataBy(query) {
 return await client.words.findMany({
  where: {
   word: {
    contains: query,
   },
  },
 })
}

// Create a new Kamus entry in the database
export async function createKamusOnDB(data) {
 return await client.words.create({
  data: data,
 })
}

// Update an existing Kamus entry in the database
export async function updateKamusOnDB(id, data) {
  return await client.words.update({
    where: { id: parseInt(id, 10) },
    data: data,
  })
}

// Delete a Kamus entry from the database
export async function deleteKamusOnDB(id) {
  return await client.words.delete({
    where: { id: parseInt(id, 10) },
  })
}

// Find a Kamus by Id
export async function findKamusById(id) {
  return await client.words.findUnique({
    where: { id: parseInt(id, 10) },
  })
}
