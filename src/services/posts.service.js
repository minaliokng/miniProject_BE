const PostsRepository = require('../repositories/Posts.repository');

class PostsService {
  constructor() {
    this.postsRepository = new PostsRepository();
  }
  createPost = async (post) => {
    await this.postsRepository.createPost(post);
  };

  getPosts = async () => {
    return await this.postsRepository.getPosts();
  };
}

module.exports = PostsService;
