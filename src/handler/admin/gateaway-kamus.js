import { getAllWords, updateWordsAction, moveToDictionaries } from '../../service/admin.js';
import { responseStatus } from '../../utils/response.js';

/**
 * @swagger
 * /api/v1/admin/:
 *   get:
 *     summary: Get all data from words_gateaway
 *     description: ini descending agar kata yang baru ditambahkan langsung paling atas.
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Successfully retrieved Kamus entries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       word:
 *                         type: string
 *                       wordDescription:
 *                         type: string
 *                       action:
 *                         type: integer
 *                 message:
 *                   type: string
 *                   example: Data retrieved successfully
 */
export async function getAllWordsHandler(req, res, next) {
  try {
    const words = await getAllWords();

    return res.status(200).json({
      status: responseStatus.OK,
      data: words,
      message: 'Data kamus berhasil diambil',
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @swagger
 * /api/v1/admin/update:
 *   put:
 *     summary: Update multiple Words entries
 *     description: Update the action field of multiple Words entries.
 *     tags:
 *       - Admin
 *     requestBody:
 *       description: An array of updates for Kamus entries
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 action:
 *                   type: integer
 *                   example: 2
 *                   description: The action status (1 = Suspend, 2 = Accepted, 3 = Rejected)
 *     responses:
 *       200:
 *         description: Successfully updated Kamus entries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       action:
 *                         type: integer
 *                 message:
 *                   type: string
 *                   example: Actions successfully updated
 */
export async function updateWordsHandler(req, res, next) {
  try {
    const updates = req.body;

    if (!Array.isArray(updates)) {
      return res.status(400).json({
        status: responseStatus.ERROR,
        message: 'Invalid request body, harus array',
      });
    }

    const updatedWords = [];
    for (const { id, action } of updates) {
      if (!id || typeof action !== 'number' || ![1, 2, 3].includes(action)) {
        continue;
      }

      const updated = await updateWordsAction(id, action);
      updatedWords.push(updated);

      if (action === 2) {
        await moveToDictionaries({
          word: updated.word,
          wordDescription: updated.wordDescription,
        });
      }
    }

    return res.status(200).json({
      status: responseStatus.OK,
      data: updatedWords,
      message: 'Kamu berhasil mengubah status',
    });
  } catch (error) {
    next(error);
  }
}
