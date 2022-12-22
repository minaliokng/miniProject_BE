const database = require('../config/database');

class PostsMySQLRepository {
  createPost = async ({ title, content, categoryId }, imageKey, userId) => {
    await database.query(
      'INSERT INTO Posts(title, content, imageKey, categoryId, userId) VALUES (?, ?, ?, ?, ?)',
      [title, content, imageKey, categoryId, userId],
    );
  };

  getPagesNum = async (categoryId) => {
    const [[{ rowsNum }]] = await database.query(
      'SELECT COUNT(*) AS rowsNum FROM Posts WHERE categoryId = ?',
      [categoryId],
    );
    return Math.ceil(rowsNum / 6);
  };

  getPosts = async (categoryId, page, userId) => {
    const [posts] = await database.query(
      `SELECT
        P.postId,
        P.title,
        CONCAT(?, P.imageKey) AS imageUrl,
        EXISTS(SELECT * WHERE L.userId = ?) AS isLiked,
        U.nickname AS userNickname,
        P.userId
      FROM Posts P
      INNER JOIN Users U ON P.userId = U.userId
      LEFT JOIN Likes L ON P.postId = L.postId
      WHERE P.categoryId = ? ORDER BY postId DESC LIMIT ? OFFSET ?`,
      [process.env.AWS_S3_BUCKET_HOST, userId, categoryId, 6, 6 * (page - 1)],
    );
    return posts;
  };

  getPost = async (postId, userId) => {
    const [[post]] = await database.query(
      `SELECT
        P.postId,
        P.title,
        P.content,
        CONCAT(?, P.imageKey) AS imageUrl,
        DATE_FORMAT(CONVERT_TZ(P.createdAt, '+00:00', '+09:00'), '%Y. %m. %d. %H:%i') AS createdAt,
        P.hasUpdated,
        EXISTS(SELECT * WHERE L.userId = ?) AS isLiked,
        COUNT(L.userId) AS likesNum,
        U.nickname AS userNickname,
        P.userId,
        P.categoryId
      FROM Posts P
      INNER JOIN Users U ON P.userId = U.userId
      LEFT JOIN Likes L ON P.postId = L.postId
      WHERE P.postId = ?`,
      [process.env.AWS_S3_BUCKET_HOST, userId, postId],
    );
    return post;
  };

  checkForPost = async (postId) => {
    const [[result]] = await database.query(
      `SELECT userId, imageKey FROM Posts WHERE postId = ?`,
      [postId],
    );
    return result;
  };

  updatePost = async (postId, { title, content, categoryId }) => {
    await database.query(
      'UPDATE Posts SET title = ?, content = ?, categoryId = ?, hasUpdated = 1 WHERE postId = ?',
      [title, content, categoryId, postId],
    );
  };

  deletePost = async (postId) => {
    await database.query('DELETE FROM Posts WHERE postId = ?', [postId]);
  };
}

module.exports = PostsMySQLRepository;
