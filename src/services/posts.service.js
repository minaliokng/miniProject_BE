const PostsRepository = require('../repositories/Posts.repository');
const { ApiError } = require('../utils/apiError');

class PostsService {
  constructor() {
    this.postsRepository = new PostsRepository();
  }

  createPost = async (post, imageKey, userId) => {
    await this.postsRepository.createPost(post, imageKey, userId);
  };

  getPosts = async (categoryId, page, userId) => {
    const pagesNum = await this.postsRepository.getPagesNum(categoryId);

    if (page > pagesNum) throw new ApiError('존재하지 않는 페이지', 404);

    const posts = await this.postsRepository.getPosts(categoryId, page, userId);

    return { pagesNum, posts };
  };

  getPost = async (postId, userId) => {
    const post = await this.postsRepository.getPost(postId, userId);

    if (!post.postId) throw new ApiError('존재하지 않는 게시글', 404);

    return post;
  };

  updatePost = async (postId, postInput, userId) => {
    const post = await this.postsRepository.checkForPost(postId);

    if (!post) throw new ApiError('존재하지 않는 게시글', 404);

    if (userId !== post.userId) throw new ApiError('사용자 정보 불일치', 403);

    await this.postsRepository.updatePost(postId, postInput);
  };

  deletePost = async (postId, userId) => {
    const post = await this.postsRepository.checkForPost(postId, {
      imageKey: true,
    });

    if (!post) throw new ApiError('존재하지 않는 게시글', 404);

    if (userId !== post.userId) throw new ApiError('사용자 정보 불일치', 403);

    await this.postsRepository.deletePost(postId);

    await this.postsRepository.deleteImage(post.imageKey);
  };
}

module.exports = PostsService;
