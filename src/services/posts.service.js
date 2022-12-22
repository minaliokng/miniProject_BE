const PostsMySQLRepository = require('../repositories/posts.mySQL.repository');
const { ApiError } = require('../utils/apiError');
const PostsStorageRepository = require('../repositories/posts.storage.repository');

class PostsService {
  constructor() {
    this.postsMySQLRepository = new PostsMySQLRepository();
    this.postsStorageRepository = new PostsStorageRepository();
  }

  createPost = async (post, imageKey, userId) => {
    await this.postsMySQLRepository.createPost(post, imageKey, userId);
  };

  getPosts = async (categoryId, page, userId) => {
    const pagesNum = await this.postsMySQLRepository.getPagesNum(categoryId);

    if (page > pagesNum) throw new ApiError('존재하지 않는 페이지', 400);

    const posts = await this.postsMySQLRepository.getPosts(
      categoryId,
      page,
      userId,
    );

    return { pagesNum, posts };
  };

  getPost = async (postId, userId) => {
    const post = await this.postsMySQLRepository.getPost(postId, userId);

    if (!post.postId) throw new ApiError('존재하지 않는 게시글', 400);

    return post;
  };

  updatePost = async (postId, postInput, userId) => {
    const post = await this.postsMySQLRepository.checkForPost(postId);

    if (!post) throw new ApiError('존재하지 않는 게시글', 400);

    if (userId !== post.userId) throw new ApiError('사용자 정보 불일치', 403);

    await this.postsMySQLRepository.updatePost(postId, postInput);
  };

  deletePost = async (postId, userId) => {
    const post = await this.postsMySQLRepository.checkForPost(postId);

    if (!post) throw new ApiError('존재하지 않는 게시글', 400);

    if (userId !== post.userId) throw new ApiError('사용자 정보 불일치', 403);

    await this.postsMySQLRepository.deletePost(postId);

    await this.postsStorageRepository.deleteImage(post.imageKey);
  };

  deleteUploadedImage = async (imageKey) => {
    await this.postsStorageRepository.deleteImage(imageKey);
  };
}

module.exports = PostsService;
