const PostsService = require('../services/posts.service');
const postsValidation = require('../validations/posts.validation');

class PostsController {
  constructor() {
    this.postsService = new PostsService();
  }

  createPost = async (req, res, next) => {
    try {
      const { postInput, userId } =
        await postsValidation.createPost.input.validateAsync({
          postInput: req.body,
          userId: res.locals.userId,
        });

      await this.postsService.createPost(postInput, userId);

      res.status(201).json({ message: '작성 완료' });
    } catch (err) {
      next(err);
    }
  };

  getPosts = async (req, res, next) => {
    try {
      const { categoryId, page, userId } =
        await postsValidation.getPosts.input.validateAsync({
          categoryId: req.query.categoryId,
          page: req.query.page,
          userId: res.locals.userId,
        });

      const result = await this.postsService.getPosts(categoryId, page, userId);

      await postsValidation.getPosts.output.validateAsync(result);

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  getPost = async (req, res, next) => {
    try {
      const { postId, userId } =
        await postsValidation.getPost.input.validateAsync({
          postId: req.params.postId,
          userId: res.locals.userId,
        });

      const post = await this.postsService.getPost(postId, userId);

      await postsValidation.getPost.output.validateAsync(post);

      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const { postId, postInput, userId } =
        await postsValidation.updatePost.input.validateAsync({
          postId: req.params.postId,
          postInput: req.body,
          userId: res.locals.userId,
        });

      await this.postsService.updatePost(postId, postInput, userId);

      res.status(200).json({ message: '수정 완료' });
    } catch (err) {
      next(err);
    }
  };

  deletePost = async (req, res, next) => {
    try {
      const { postId, userId } =
        await postsValidation.deletePost.input.validateAsync({
          postId: req.params.postId,
          userId: res.locals.userId,
        });

      await this.postsService.deletePost(postId, userId);

      res.status(200).json({ message: '삭제 완료' });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = PostsController;
