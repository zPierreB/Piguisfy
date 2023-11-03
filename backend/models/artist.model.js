import dbConnect from '../controllers/db/index.js'

export const findOneArtistByUserId = async (arg) => {
  const sql_string = 'SELECT artists.* FROM artists WHERE artists.user_id = ? LIMIT 1';

  return await dbConnect(sql_string, arg)
}