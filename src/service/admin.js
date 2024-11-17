import { client } from '../database.js'

/**
 * Update action column in WordsGateaway by ID
 * @param {number} id
 * @param {number} action
 * @returns {Promise<Object>}
 */
export async function updateWordsAction(id, action) {
  return client.wordsGateaway.update({
    where: { id: parseInt(id, 10) },
    data: { action },
  })
}

/**
 * Move entry to Dictionaries table
 * @param {Object} param0
 * @param {string} param0.word
 * @param {string} param0.wordDescription
 * @returns {Promise<Object>}
 */
export async function moveToDictionaries({ word, wordDescription }) {
  return client.words.create({
    data: {
      word,
      wordDescription,
    },
  })
}

/**
 * Create a new Kamus entry in WordsGateaway
 * @param {Object} param0
 * @param {string} param0.word
 * @param {string} param0.wordDescription
 * @returns {Promise<Object>}
 */
export async function createWordsGateaway({ word, wordDescription }) {
    return client.wordsGateaway.create({
      data: {
        word,
        wordDescription,
        action: 1,
      },
    })
  }

/**
 * Retrieve all Kamus entries from WordsGateaway
 * @returns {Promise<Array<Object>>}
 */
export async function getAllWords() {
    return client.wordsGateaway.findMany({
      select: {
        id: true,
        word: true,
        wordDescription: true,
        action: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }
  