const database = require('../config/database');

class CommentsRepository {
  existPost = async(postId) => {
    const [[post]] = await database.query(
      `SELECT * FROM Posts WHERE postId=${postId}`
    );

    return post;
  }

  postComment = async(postId, userId, content) => {
    await database.query(
      'INSERT INTO Comments(postId, userId, content) VALUES (?, ?, ?)',
      [Number(postId), userId, content],
    );
  }

  getComments = async(postId) => {
    const [comments] = await database.query(
      `SELECT * FROM Comments`
    );
    return comments;
  }
}

module.exports = CommentsRepository;
