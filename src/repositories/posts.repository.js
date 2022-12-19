const database = require('../config/database');

const postsNum = 15;
class PostsRepository {
  createPost = async ({ title, content, imageUrl, categoryId }, userId) => {
    await database.query(
      'INSERT INTO Posts(title, content, imageUrl, categoryId, userId) VALUES (?, ?, ?, ?, ?)',
      [title, content, imageUrl, categoryId, userId],
    );
  };

  getPagesNum = async (categoryId) => {
    const [[{ rowsNum }]] = await database.query(
      'SELECT COUNT(*) AS rowsNum FROM Posts WHERE categoryId = ?',
      [categoryId],
    );
    return Math.ceil(rowsNum / postsNum);
  };

  getPosts = async (categoryId, page, userId) => {
    const [posts] = await database.query(
      `SELECT P.postId, P.title, P.imageUrl, P.createdAt, P.updatedAt,
      EXISTS(SELECT * WHERE L.userId = ?) AS isLiked,
      U.nickname AS userNickname, P.userId
      FROM Posts P
      INNER JOIN Users U ON P.userId = U.userId
      LEFT JOIN Likes L ON P.postId = L.postId
      WHERE P.categoryId = ? ORDER BY postId DESC LIMIT ? OFFSET ?`,
      [userId, categoryId, postsNum, postsNum * (page - 1)],
    );
    return posts;
  };

  getPost = async (postId, userId) => {
    const [[post]] = await database.query(
      `SELECT P.postId, P.title, P.content, P.imageUrl, P.createdAt, P.updatedAt,
      EXISTS(SELECT * WHERE L.userId = ?) AS isLiked,
      COUNT(L.userId) AS likesNum,
      U.nickname AS userNickname, P.userId
      FROM Posts P
      INNER JOIN Users U ON P.userId = U.userId
      LEFT JOIN Likes L ON P.postId = L.postId
      WHERE P.postId = ?`,
      [userId, postId],
    );
    return post;
  };

  checkForPost = async (postId) => {
    const [[result]] = await database.query(
      `SELECT userId FROM Posts WHERE postId = ?`,
      [postId],
    );
    return result;
  };

  updatePost = async (postId, { title, content, imageUrl, categoryId }) => {
    await database.query(
      'UPDATE Posts SET title = ?, content = ?, imageUrl = ?, categoryId = ? WHERE postId = ?',
      [title, content, imageUrl, categoryId, postId],
    );
  };

  deletePost = async (postId) => {
    await database.query('DELETE FROM Posts WHERE postId = ?', [postId]);
  };
}

module.exports = PostsRepository;
