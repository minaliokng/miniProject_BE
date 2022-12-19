const PostsService = require('../services/posts.service');

class PostsController {
  constructor() {
    this.postsService = new PostsService();
  }
  createPost = async (req, res, next) => {
    try {
      const userId = res.locals.userId || 1;
      const post = { ...req.body, userId };

      await this.postsService.createPost(post);

      res.status(201).json({ message: '작성 완료' });
    } catch (err) {
      next(err);
    }
  };
  getPosts = async (req, res, next) => {
    try {
      const posts = await this.postsService.getPosts();

      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = PostsController;
