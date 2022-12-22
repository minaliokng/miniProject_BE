const database = require('../config/database');

class CommentsRepository {
  existPost = async (postId) => {
    const [[post]] = await database.query(
      `SELECT * FROM Posts WHERE postId=${postId}`,
    );

    return post;
  };

  existComment = async (commentId) => {
    const [[comment]] = await database.query(
      `SELECT * FROM Comments WHERE commentId = ${commentId}`,
    );

    return comment;
  };

  postComment = async (postId, userId, content) => {
    const [result] = await database.query(
      'INSERT INTO Comments(postId, userId, content) VALUES (?, ?, ?)',
      [Number(postId), userId, content],
    );

    return result;
  }

  getComments = async (thisId, type) => {
    let query = `SELECT
                    C.content,
                    C.createdAt,
                    C.hasUpdated,
                    U.nickname AS userNickname
                    FROM Comments C
                    INNER JOIN Users U ON C.userId = U.userId `

    if(type === 0) query += `WHERE postId = ${thisId}`;
    else query += `WHERE commentId = ${thisId}`;

    const [comments] = await database.query(
      query
    );
    return comments;
  };

  updateComment = async (commentId, content) => {
    await database.query(
      `UPDATE Comments
      SET
        content = ${content},
        hasUpdated = 1
      WHERE
        commentId = ${commentId}`,
    );
  };

  deleteComment = async (commentId) => {
    await database.query(
      `DELETE FROM Comments WHERE commentId = ${commentId}`
    );
  }
}

module.exports = CommentsRepository;
