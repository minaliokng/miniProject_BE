const database = require('../config/database');

class LikeRepository {
  existPost = async (postId) => {
    const [[isExist]] = await database.query(
      `SELECT * FROM Posts WHERE postid=${postId}`
    );

    return isExist;
  }

  changeLike = async (postId, userId) => {
    try {
      return await database.query(
        'INSERT INTO Likes(userId, postId) VALUES (?, ?)',
        [userId, postId],
      );
    }
    catch {
      const [result] = await database.query(
        `DELETE FROM Likes where userId=${userId} AND postId=${postId}`
      );
      throw ('already');
    }
  }
}

module.exports = LikeRepository;
