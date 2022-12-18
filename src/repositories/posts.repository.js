const database = require('../config/database');

class PostsRepository {
  createPost = async ({ title, content, imageUrl, categoryId, userId }) => {
    await database.query(
      'INSERT INTO Posts(title, content, imageUrl, categoryId, userId) VALUES (?, ?, ?, ?, ?)',
      [title, content, imageUrl, categoryId, userId],
    );
  };

  getPosts = async () => {
    const [posts] = await database.query(
      'SELECT * FROM Posts ORDER BY postId DESC',
    );
    return posts;
  };
}

module.exports = PostsRepository;
