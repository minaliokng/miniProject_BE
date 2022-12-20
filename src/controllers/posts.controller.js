const PostsService = require('../services/posts.service');
const postsValidation = require('../validations/posts.validation');

class PostsController {
  constructor() {
    this.postsService = new PostsService();
  }

  createPost = async (req, res, next) => {
    try {
      const { postInput } =
        await postsValidation.createPost.input.validateAsync({
          postInput: req.body,
        });
      const imageKey = req.file.key;
      const { userId } = res.locals;

      await this.postsService.createPost(postInput, imageKey, userId);

      res.status(201).json({ message: '작성 완료' });
    } catch (err) {
      await this.postsService.deleteUploadedImage(req.file.key);
      next(err);
    }
  };

  getPosts = async (req, res, next) => {
    try {
      const { categoryId, page } =
        await postsValidation.getPosts.input.validateAsync({
          categoryId: req.query.categoryId,
          page: req.query.page,
        });
      const { userId } = res.locals;

      const result = await this.postsService.getPosts(categoryId, page, userId);

      await postsValidation.getPosts.output.validateAsync(result);

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  getPost = async (req, res, next) => {
    try {
      const { postId } = await postsValidation.getPost.input.validateAsync({
        postId: req.params.postId,
      });
      const { userId } = res.locals;

      const post = await this.postsService.getPost(postId, userId);

      await postsValidation.getPost.output.validateAsync(post);

      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const { postId, postInput } =
        await postsValidation.updatePost.input.validateAsync({
          postId: req.params.postId,
          postInput: req.body,
        });
      const { userId } = res.locals;

      await this.postsService.updatePost(postId, postInput, userId);

      res.status(200).json({ message: '수정 완료' });
    } catch (err) {
      next(err);
    }
  };

  deletePost = async (req, res, next) => {
    try {
      const { postId } = await postsValidation.deletePost.input.validateAsync({
        postId: req.params.postId,
      });
      const { userId } = res.locals;

      await this.postsService.deletePost(postId, userId);

      res.status(200).json({ message: '삭제 완료' });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = PostsController;
